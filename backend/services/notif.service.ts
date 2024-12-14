import nodemailer from 'nodemailer'
import admin from 'firebase-admin'
import { findUserById } from './user.service'
import { twilioClient } from '../config/configs'
import Queue from 'bull'
import { NotifMessage } from '../models/NotifMessage'
import { logger, LogType } from '../utils/logger'

const emailTransporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

async function sendEmail (to: string, subject: string, text: string) {
  return new Promise((resolve, reject) => {
    emailTransporter.verify((err, success) => {
      if (err) {
        logger(LogType.ERROR, `Transporter verification failed: ${err}`)
        return reject(err)
      } else {
        logger(LogType.INFO, `Transporter is ready to send E-mail`)
        emailTransporter.sendMail(
          {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
          },
          (err, info) => {
            if (err) {
              logger(LogType.ERROR, `Error sending email: ${err}`)
              return reject(err)
            } else {
              logger(LogType.INFO, `Email sent successfully: ${info.response}`)
              return resolve(info)
            }
          }
        )
      }
    })
  })
}

async function sendSMS (to: string, message: string) {
  await twilioClient.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE,
    to
  })
}

async function sendPushNotification (
  token: string,
  title: string,
  body: string
) {
  logger(LogType.INFO,`Sending Push Notification`);
  try {
    const response = await admin.messaging().send({
      token,
      notification: { title, body }
    })
    logger(LogType.INFO,`Push Notification Sent`);
    logger(LogType.INFO,`${response}`);

  }catch(err) {
    logger(LogType.ERROR,`Send Push Notification Failed`);
    logger(LogType.ERROR,`${err}`);

  }

  logger(LogType.INFO,`Token : ${token}, title : ${title}`);
}

async function notify (userId: number, message: NotifMessage) {
    const user = await findUserById(userId)
    //if (user.preferences.email)
    if (!user) {
      throw new Error(`User with userId ${userId} Not found`)
    }
    logger(LogType.INFO, `User with userId ${userId} found`)
    try {
      await sendEmail(user.email, message.title, message.body)
      logger(LogType.INFO, `Email Sent`);
    }catch(err){
      logger(LogType.ERROR, `Failed to Sent Email`);
    }


    //if (user.preferences.sms)
    if (user.phoneNumber != null) {
      await sendSMS(user.phoneNumber, message.body)
      logger(LogType.INFO, `Phonenumber Sent`)
    }
    if (!user.pushTokens || user.pushTokens.length == 0) {
      logger(LogType.INFO, `${user.username} doesn't have any Tokens`)
      return
    } else {
      for (let token of user.pushTokens) {
        await sendPushNotification(token, message.title, message.body)
      }
    }
}

const notificationQueue = new Queue('notifications', {
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
})

notificationQueue.process(10,async job => {
  const { userId, message }: { userId: number; message: NotifMessage } =
    job.data
  logger(LogType.INFO, `Processing Notification with Id : ${job.id}`)
  await notify(userId, message)
})

export function scheduleNotification (
  userId: number,
  message: NotifMessage,
  delay = 0
) {
  logger(LogType.INFO, 'Notification Scheduled')
  notificationQueue.add({ userId, message }, { delay })
}
