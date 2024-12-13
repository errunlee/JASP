import { Request, Response } from "express";
import { findCheckpointByGeoSpatialCoor,findAllCheckpoints } from "../services/checkpoint.service";
import { sendResponse } from "../utils/GenericResponse";
import { sendError } from "../utils/GenericErrorResponse";
import {Checkpoint} from "@prisma/client";

export const getCheckpoints = async(req : Request,res : Response) => {
    try {
        const { longitude, latitude } = req.body;
        if(longitude && latitude) {
            const checkpoints = await findCheckpointByGeoSpatialCoor(latitude,longitude);
            sendResponse(res,{
                code :200,
                message : "Checkpoints",
                data : checkpoints
            })
        }else {
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
        const { longitude, latitude } = req.body;
        if(longitude && latitude) {
            const checkpoint = await saveCheckpoint(latitude,longitude);
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

