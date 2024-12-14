import { Request, Response } from "express";
import { sendError } from "../utils/GenericErrorResponse";
import crowdFundingService from "../services/crowdfunding.service";
import { sendResponse } from "../utils/GenericResponse";

export const createCampagin = async (req: Request, res: Response) => {
    try {
        const { 
            title,
            requesterId,
            description,
            goal,
            date,
            duration,
            location,
            totalAmount
        } = req.body;
        
        // @ts-ignore
        const campaign = await crowdFundingService.createRequest({
            title,
            requesterId: parseInt(requesterId),
            description,
            goal,
            date,
            duration,
            location,
            totalAmount
        });
        sendResponse(res, {
            code: 201,
            message: "Resource Scuessfully Created"
        })
    } catch (err) {
        sendError(res, {
            message : err instanceof Error ? err.message: typeof err=="string"?err:""        })
    }
}