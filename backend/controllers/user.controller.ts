import { Request, Response } from 'express';
import {
    updateUserData,
    findUsersByCheckpoint,
    findUserByUsername
} from "../services/user.service";

import { sendError } from '../utils/GenericErrorResponse';
import { sendResponse } from '../utils/GenericResponse';

export const updateUser = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const { id } = req.user;
        const { roles, fullName, address, phoneNumber, profilePicture } = req.body;

        const user = await updateUserData({
            id,
            roles,
            fullName,
            address,
            phoneNumber,
            profilePicture
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

