import twilio from "twilio";
import admin from "firebase-admin"

export const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

admin.initializeApp({
  credential: admin.credential.cert(require('../../config/firebase-service-account.json')),
});