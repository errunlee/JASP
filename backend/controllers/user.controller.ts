import { Request, Response } from 'express';
import userService,{
    updateUserData,
} from "../services/user.service";

import { sendError } from '../utils/GenericErrorResponse';
import { sendResponse } from '../utils/GenericResponse';

export const updateUser = async (req: any, res: Response) => {
    try {
        req.body["id"] = typeof req.params.id=="number"?req.params.id:parseInt(req.params.id,10);
        if(req.files.profile) {
            req.body["profilePicture"] = req.files.profile[0].path.replace("\\","/"); 
        }

        if(req.files.orgImage) {
            req.body["orgImage"] = req.files.orgImage[0].path.replace("\\","/"); 
        }

        const user = await updateUserData({
            ...req.body
        });

        sendResponse(res, {
            code: 200,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        console.error('Update User Error:', error);
        sendError(res, {
            code: 500,
            message: 'Failed to update user',
            description: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};



export const saveProduct = async (req: Request, res: Response) => {
    try {
        const product = await userService.saveProduct({
            userId : parseInt(req.params.id,10),
            name : req.body.name,
            price : parseFloat(req.body.price)
        })

        sendResponse(res, {
            code: 200,
            message: 'Product Saved successfully',
            data: product
        });
    } catch (error) {
        console.error('Save Product Error:', error);
        sendError(res, {
            code: 500,
            message: 'Failed to update user',
            description: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

export const getAllProductsById = async (req: Request, res : Response) => {
    try {
        const products = await userService.findAllProductsByUserId(
            parseInt(req.params.id,10),
        )
        sendResponse(res, {
            code: 200,
            message: 'List of all Products',
            data: products
        });
    }catch (error) {
        console.error('Save Product Error:', error);
        sendError(res, {
            code: 500,
            message: 'Failed to update user',
            description: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

