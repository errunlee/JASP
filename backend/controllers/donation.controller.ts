import { Request,Response } from "express";
import { sendError } from "../utils/GenericErrorResponse"
import { sendResponse } from "../utils/GenericResponse";
import donationService from "../services/donation.service";

export const createDonation = async (req: Request,res : Response)=> {
   try {
        const {name,donatorId,file,details,location} = req.body;
        const donation = await donationService.saveDonation({
            name,
            donatorId,
            image : file.path,
            details,
            location
        })
    }catch(err) {
        sendError(res,{
            message : err instanceof Error ? err.message: typeof err=="string"?err:""
        })
   }
}

export const updateDonation = async (req : Request, res : Response) => {
    try {
        const {id,name,file,details,location} = req.body;
        if(!id) {
            sendError(res,{
                code : 400,
                message : "Id for donation is not provided"
            })
            return
        }
        const obj : any = {}

        for(let key in req.body) {
            if(key=="id") continue;
            if(key=="file") {
                obj["image"] = req.body[key].path
            }
            obj[key] = req.body[key];
        }
        const donation = await donationService.updateDonation({
            ...obj
        })
    }catch(err) {
        sendError(res,{
            message : err instanceof Error ? err.message: typeof err=="string"?err:""
        })
   }
}


export const deleteDonation = async (req : Request, res : Response) => {
    try {
        const {id} = req.body;
        if(!id) {
            sendError(res,{
                code : 400,
                message : "Id for donation is not provided"
            })
            return
        }
        const donation = await donationService.deleteDonation({id})
    }catch(err) {
        sendError(res,{
            message : err instanceof Error ? err.message: typeof err=="string"?err:""
        })
   }
}


export const claimDonation = async (req : Request, res : Response) => {
    try {
        const {id,claimerId} = req.body;
        if(!id) {
            sendError(res,{
                code : 400,
                message : "Id for donation is not provided"
            })
            return;
        }

        if(!claimerId) {
            sendError(res,{
                code : 400,
                message : "Claimer Id not provided"
            })
            return;
        }
        const donation = await donationService.claimDonation({id,claimerId})
    }catch(err) {
        sendError(res,{
            message : err instanceof Error ? err.message: typeof err=="string"?err:""
        })
   }
}


export const getDonations = async (req : Request, res : Response) => {
    try {
        const { category } = req.body;

        const donatiosn = await donationService.findAllDonations({
            category
        })
    }catch(err) {
        sendError(res,{
            message : err instanceof Error ? err.message: typeof err=="string"?err:""
        })
   }
}

export default {
    createDonation,
    claimDonation,
    updateDonation,
    getDonations,
    deleteDonation
}