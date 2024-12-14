import twilio from 'twilio'
import admin from 'firebase-admin'
import multer, { StorageEngine, FileFilterCallback } from 'multer'
import {Request} from "express";
import path from 'path'
import { logger, LogType } from '../utils/logger';
export const twilioClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
)

admin.initializeApp({
  credential: admin.credential.cert(require('./firebase-service-account-conf.json')),
});

// multer configuration
const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads') // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    let name = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)

    logger(LogType.INFO,`Filename : ${name}`)
    cb(
      null,
      name
    )
  }
})

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const fileTypes = /jpeg|jpg|png|gif/
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimeType = fileTypes.test(file.mimetype)

  if (extName && mimeType) {
    cb(null, true)
  } else {
    cb(new Error('Only images are allowed!'))
  }
}

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter
})
