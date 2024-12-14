import { Request, Response } from "express";
import { sendError } from "../utils/GenericErrorResponse"
import donationService from "../services/donation.service";
import { sendResponse } from "../utils/GenericResponse";

export const createDonation = async (req: Request, res: Response) => {
    try {
        const { name, donatorId, details, location, category } = req.body;
        if (!req.file) {
            throw Error("Image is not provided");
        }
        const donation = await donationService.saveDonation({
            name,
            donatorId: parseInt(donatorId),
            image: req.file.path,
            details,
            location,
            category
        })
        sendResponse(res, {
            code: 201,
            message: "Resource Sucessfully Created"
        })
    } catch (err) {
        sendError(res, {
            message: err instanceof Error ? err.message : typeof err == "string" ? err : ""
        })
    }
}

export const updateDonation = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            sendError(res, {
                code: 400,
                message: "Id for donation is not provided"
            })
            return
        }
        const obj: any = {}

        for (let key in req.body) {
            if (key == "id") continue;
            if (key == "file") {
                obj["image"] = req.body[key].path
            }
            obj[key] = req.body[key];
        }
        const donation = await donationService.updateDonation({
            ...obj
        })
        sendResponse(res, {
            code: 200,
            message: "Resource Sucessfully Updated"
        })
    } catch (err) {
        sendError(res, {
            message: err instanceof Error ? err.message : typeof err == "string" ? err : ""
        })
    }
}


export const deleteDonation = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            sendError(res, {
                code: 400,
                message: "Id for donation is not provided"
            })
            return
        }
        const donation = await donationService.deleteDonation({ id })
        sendResponse(res, {
            code: 200,
            message: "Resource Sucessfully Deleted"
        })
    } catch (err) {
        sendError(res, {
            message: err instanceof Error ? err.message : typeof err == "string" ? err : ""
        })
    }
}


export const claimDonation = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { claimerId } = req.body;
        if (!id) {
            sendError(res, {
                code: 400,
                message: "Id for donation is not provided"
            })
            return;
        }

        if (!claimerId) {
            sendError(res, {
                code: 400,
                message: "Claimer Id not provided"
            })
            return;
        }
        const donation = await donationService.claimDonation({ id, claimerId })

        sendResponse(res, {
            code: 200,
            message: "Resource Sucessfully Claimed"
        })
    } catch (err) {
        sendError(res, {
            message: err instanceof Error ? err.message : typeof err == "string" ? err : ""
        })
    }
}


export const getDonations = async (req: Request, res: Response) => {
    try {
        const { category } = req.body;

        const donation = await donationService.findAllDonations({
            category
        })


        sendResponse(res, {
            code: 200,
            message: "Resource Sucessfully Claimed",
            data: donation
        })
    } catch (err) {
        sendError(res, {
            message: err instanceof Error ? err.message : typeof err == "string" ? err : ""
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