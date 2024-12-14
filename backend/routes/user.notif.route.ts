import {
    createNotification, getAllNotifications, getNotificationById,
    updateNotification, deleteNotification
} from "../controllers/user.notif.controller";
import express from 'express';

const router = express.Router();

// Notification Routes
router.post('/', createNotification);
router.get('/', getAllNotifications);
router.get('/:id', getNotificationById);
router.patch('/:id', updateNotification);
router.delete('/:id', deleteNotification);

export default router;
