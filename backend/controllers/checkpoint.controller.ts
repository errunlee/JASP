import { Request, Response } from "express";
import { findCheckpointByGeoSpatialCoor,findAllCheckpoints } from "../services/checkpoint.service";
import { sendResponse } from "../utils/GenericResponse";
import { sendError } from "../utils/GenericErrorResponse";


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
