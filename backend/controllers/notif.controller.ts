import { Request,Response } from "express";
import { findCheckpointByGeoSpatialCoor } from "../services/checkpoint.service";
import { scheduleNotification } from "../services/notif.service";
import { findUsersByCheckpoint } from "../services/user.service";
import { sendError } from "../utils/GenericErrorResponse"

export const sendGarbageTruckNotification = async (req: Request,res : Response)=> {
    try {
        const { longitude,latitude } = req.body;
        const checkpoint = await findCheckpointByGeoSpatialCoor(latitude,longitude);
        if(!checkpoint) {
            sendError(res, {
                code : 404,
                message : `Checkpoiont with Longitude : ${longitude} and Latitude : ${latitude} Not found`
            })
            return
        }

        const users = await findUsersByCheckpoint(checkpoint.id);

        for(let i=0;i<users.length;i++) {
            scheduleNotification(users[i].id,{
                title : "Garbage Truck Notfication",
                body:"Garbage Truck is here to pick you up!!!"
            });
        }
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