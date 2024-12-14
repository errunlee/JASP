import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { sendError } from '../utils/GenericErrorResponse';
import { sendResponse } from '../utils/GenericResponse';

// Prisma Client
const prisma = new PrismaClient();

// Type for Notification Creation Input
interface NotificationCreateInput {
    title: string;
    message: string;
    users?: number[];
}

// Type for Notification Update Input
interface NotificationUpdateInput {
    title?: string;
    message?: string;
    users?: number[];
}

// Create a new notification
export const createNotification = async (req: Request, res: Response) => {
    try {
        const { title, message, users }: NotificationCreateInput = req.body;

        // Basic input validation
        if (!title || !message) {
            return sendError(res, {
                code: 400,
                message: 'Title and message are required',
            });
        }

        // Prepare create input
        const createInput: Prisma.NotificationCreateInput = {
            title,
            message,
            users: users && users.length
                ? { connect: users.map(id => ({ id })) }
                : undefined,
        };

        // Create notification
        const notification = await prisma.notification.create({
            data: createInput,
        });

        sendResponse(res, {
            code: 201,
            message: 'Notification created successfully',
            data: notification,
        });
    } catch (error) {
        console.error('Create Notification Error:', error);
        sendError(res, {
            code: 500,
            message: 'Failed to create notification',
            description: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Get all notifications with pagination
export const getAllNotifications = async (req: Request, res: Response) => {
    try {
        // Parse pagination parameters
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;

        // Optional filtering
        const where: Prisma.NotificationWhereInput = {
            isDeleted: false,
            ...(req.query.title
                ? { title: { contains: req.query.title as string } }
                : {}),
        };

        // Count total notifications
        const totalCount = await prisma.notification.count({ where });

        // Fetch notifications
        const notifications = await prisma.notification.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { sentDate: 'desc' },
        });

        sendResponse(res, {
            code: 200,
            message: 'Notifications retrieved successfully',
            data: {
                notifications,
                pagination: {
                    currentPage: page,
                    pageSize,
                    totalCount,
                    totalPages: Math.ceil(totalCount / pageSize),
                },
            },
        });
    } catch (error) {
        console.error('Get Notifications Error:', error);
        sendError(res, {
            code: 500,
            message: 'Failed to retrieve notifications',
            description: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Get notification by ID
export const getNotificationById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return sendError(res, {
                code: 400,
                message: 'Invalid notification ID',
            });
        }

        const notification = await prisma.notification.findUnique({
            where: {
                id,
                isDeleted: false,
            },
        });

        if (!notification) {
            return sendError(res, {
                code: 404,
                message: 'Notification not found',
            });
        }

        sendResponse(res, {
            code: 200,
            message: 'Notification retrieved successfully',
            data: notification,
        });
    } catch (error) {
        console.error('Get Notification Error:', error);
        sendError(res, {
            code: 500,
            message: 'Failed to retrieve notification',
            description: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Update a notification
export const updateNotification = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return sendError(res, {
                code: 400,
                message: 'Invalid notification ID',
            });
        }

        const { title, message, users }: NotificationUpdateInput = req.body;

        // Prepare update input
        const updateInput: Prisma.NotificationUpdateInput = {
            ...(title ? { title } : {}),
            ...(message ? { message } : {}),
            ...(users ? {
                users: {
                    set: users.map(userId => ({ id: userId })),
                },
            } : {}),
        };

        // Update notification
        const notification = await prisma.notification.update({
            where: {
                id,
                isDeleted: false,
            },
            data: updateInput,
        });

        sendResponse(res, {
            code: 200,
            message: 'Notification updated successfully',
            data: notification,
        });
    } catch (error) {
        console.error('Update Notification Error:', error);
        sendError(res, {
            code: 500,
            message: 'Failed to update notification',
            description: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Delete a notification (soft delete)
export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return sendError(res, {
                code: 400,
                message: 'Invalid notification ID',
            });
        }

        await prisma.notification.update({
            where: { id },
            data: { isDeleted: true },
        });

        sendResponse(res, {
            code: 200,
            message: 'Notification deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete Notification Error:', error);
        sendError(res, {
            code: 500,
            message: 'Failed to delete notification',
            description: error.message,
        });
    }
};
