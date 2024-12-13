import nodemailer from "nodemailer";
import admin from "firebase-admin";
import { findUserById } from "./user.service";
import { twilioClient } from '../config/configs';
import Queue from "bull";
import { NotifMessage } from "../models/NotifMessage";


const emailTransporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to :string, subject : string, text : string) {
  await emailTransporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
}

async function sendSMS(to : string, message :string) {
  await twilioClient.messages.create({ body: message, from: process.env.TWILIO_PHONE, to });
}

async function sendPushNotification(token :string , title :string, body :string) {
  await admin.messaging().send({
    token,
    notification: { title, body },
  });
}


async function notify(userId : number, message : NotifMessage) {
  const user = await findUserById(userId);
  //if (user.preferences.email) 
    await sendEmail(user.email, message.title, message.body);
  //if (user.preferences.sms) 
    await sendSMS(user.phone, message.body);
  //if (user.preferences.push) 
    await sendPushNotification(user.pushToken, message.title, message.body);
}

const notificationQueue = new Queue('notifications',{
    redis : {
        host : process.env.REDIS_HOST,
        port : process.env.REDIS_PORT
    }
})

notificationQueue.process(async (job) => {
    const { userId, message } : {userId : number, message : NotifMessage} = job.data;
    await notify(userId, message);
});

export function scheduleNotification(userId :number, message : NotifMessage, delay = 0) {
    notificationQueue.add({ userId, message }, { delay });
}