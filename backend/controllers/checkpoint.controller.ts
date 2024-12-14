import { Request, Response } from "express"
import checkpointService,{ findCheckpointByGeoSpatialCoor,findAllCheckpoints, findCheckpointById } from "../services/checkpoint.service";
import { sendResponse } from "../utils/GenericResponse";
import { sendError } from "../utils/GenericErrorResponse";
import {Checkpoint} from "@prisma/client";

export const getCheckpoints = async(req : Request,res : Response) => {
    try {
        const { longitude, latitude,id } = req.body;
        if(longitude && latitude) {
            const checkpoint = await findCheckpointByGeoSpatialCoor(latitude,longitude);
            sendResponse(res,{
                code :200,
                message : "Checkpoint",
                data : checkpoint
            })
        }else if(id){
            const checkpoint = await findCheckpointById(parseInt(id,10));
            sendResponse(res,{
                code :200,
                message : "Checkpoint",
                data : checkpoint
            })
        }
        else {
            const checkpoints = await findAllCheckpoints();
            sendResponse(res,{
                code :200,
                message : "Checkpoints",
                data : checkpoints
            })
        }
        
    }catch(err) {
        sendError(res,{
            code : 500,
            message : err instanceof Error ? err.message: typeof err=="string"?err:""
        })
    }
}


export const saveCheckpoint = async(req : Request, res : Response) => {
    try {
        const { name,longitude, latitude } = req.body;
        if(longitude && latitude) {
            const checkpoint = await checkpointService.saveCheckpoint(name,latitude,longitude);
            sendResponse(res,{
                code :200,
                message : "Checkpoints",
                data : checkpoint
            })
        }else {
            sendError(res, {
                code : 400,
                message : "Longitude or Latitude is not provided"
            })
        }
    }catch(err) {
        sendError(res,{
            code : 500,
            message : err instanceof Error ? err.message: typeof err=="string"?err:""
        })
    }
}

// export const getAllCheckpoints = async (req:Request, res:Response) => {
//     try {
//         const checkpoints = await findAllCheckpoints();
//         sendResponse(res, {
//             code: 200,
//             message: "All Checkpoints",
//             data: checkpoints
//         })
//     } catch (error) {
//         sendError(res, {
//             code: 500,
//             message: error instanceof Error ? error.message : typeof error == "string" ? error : ""
//         })
//     }
// }