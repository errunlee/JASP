import { Request,Response } from "express";
import { findCheckpointByGeoSpatialCoor } from "../services/checkpoint.service";
import { scheduleNotification } from "../services/notif.service";
import { findUsersByCheckpoint } from "../services/user.service";
import { sendError } from "../utils/GenericErrorResponse"
import { sendResponse } from "../utils/GenericResponse";
import { logger, LogType } from "../utils/logger";

export const sendGarbageTruckNotification = async (req: Request,res : Response)=> {
    try {
        const { checkpointId } = req.body;

        const users = await findUsersByCheckpoint(checkpointId);

        for(let i=0;i<users.length;i++) {
            logger(LogType.INFO,JSON.stringify(users[i]));
            scheduleNotification(users[i].id,{
                title : "Garbage Truck Notfication",
                body:"Garbage Truck is here to pick you up!!!"
            });
        }
        sendResponse(res,{
            message : "Notification Succesfully Scheduled"
        })
    }catch(err) {
        if(err instanceof Error) {
            sendError(res,{
                message: err.message
            })
        }else  if(typeof err == "string"){
            sendError(res, {
                message : err,
            })
        }

    }
    
}