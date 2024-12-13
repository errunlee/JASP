import { findCheckpointByGeoSpatialCoor } from "../services/checkpoint.service";
import { scheduleNotification } from "../services/notif.service";
import { findUsersByCheckpoint } from "../services/user.service";
import { sendError } from "../utils/GenericErrorResponse"

export const sendGarbageTruckNotification = async (req,res)=> {
    try {
        const { longitude,latitude } = req.body;
        const checkpoint = await findCheckpointByGeoSpatialCoor(latitude,longitude);
        const users = await findUsersByCheckpoint(checkpoint?.id);

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
        }else {
            sendError(res, {
                message : err,
            })
        }

    }
    
}