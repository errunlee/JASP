import Router from "express";
import { sendGarbageTruckNotification } from "../controllers/notif.controller";

const router = Router();

router.post("/sendGarbageTruckNotification",sendGarbageTruckNotification);

export default router;