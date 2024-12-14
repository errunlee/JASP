import { Request,Response } from "express";
import { logError, sendError } from "../utils/GenericErrorResponse"
import donationService from "../services/donation.service";
import { sendResponse } from "../utils/GenericResponse";

export const idToNumber  = (id:number|string|String,to=1)=> {
    return typeof id == "number"?id:to==1?parseInt(id as string,10):parseFloat(id as string);
}


export const createDonation = async (req: Request,res : Response)=> {
   try {
        const {name,donatorId,details,location,category} = req.body;
        const file = req.file;

        const donation = await donationService.saveDonation({
            name,
            donatorId : idToNumber(donatorId),
            image : file!=undefined?file.path.replace("\\","/"):"",
            details,
            location,
            category
        })
        sendResponse(res, {
            code : 201,
            message : "Resource Sucessfully Created",
            data : donation
        })
    }catch(err) {
        logError(err);
        sendError(res,{
            message : err instanceof Error ? err.message: typeof err=="string"?err:""
        })
   }
}

export const updateDonation = async (req : Request, res : Response) => {
    try {
        const id = parseInt(req.params.id,10);
        if(!id) {
            sendError(res,{
                code : 400,
                message : "Id for donation is not provided"
            })
            return
        }
        const obj : any = {}
        const file = req.file;
        
        for(let key in req.body) {
            if(key=="id") continue;
            if(key=="donatorId") obj[key] = idToNumber(req.body[key])
            obj[key] = req.body[key];
        }

        obj.image = file?file.path.replace("\\","/"):"";

        const donation = await donationService.updateDonation({
            id,
            ...obj
        })
        sendResponse(res, {
            code : 200,
            message : "Resource Sucessfully Updated",
            data :donation
        })
    }catch(err) {
        logError(err);
        sendError(res,{
            message : err instanceof Error ? err.message: typeof err=="string"?err:""
        })
   }
}


export const deleteDonation = async (req : Request, res : Response) => {
    try {
        const id = parseInt(req.params.id,10);
        if(!id) {
            sendError(res,{
                code : 400,
                message : "Id for donation is not provided"
            })
            return
        }
        const donation = await donationService.deleteDonation({id})
        sendResponse(res, {
            code : 200,
            message : "Resource Sucessfully Deleted"
        })
    }catch(err) {
        sendError(res,{
            message : err instanceof Error ? err.message: typeof err=="string"?err:""
        })
   }
}


export const claimDonation = async (req : Request, res : Response) => {
    try {
        const id = parseInt(req.params.id,10);
        const {claimerId} = req.body;
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

        sendResponse(res, {
            code : 200,
            message : "Resource Sucessfully Claimed"
        })
    }catch(err) {
        sendError(res,{
            message : err instanceof Error ? err.message: typeof err=="string"?err:""
        })
   }
}


export const getDonations = async (req : Request, res : Response) => {
    try {
        const { category } = req.body;

        const donations = await donationService.findAllDonations({
            category
        })

        
        sendResponse(res, {
            code : 200,
            message : "Resource Sucessfully Claimed",
            data : donations
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