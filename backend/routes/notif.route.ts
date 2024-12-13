import Router from "express";
import { sendGarbageTruckNotification } from "../controllers/notif.controller";

const router = Router();

router.use("/sendGarbageTruckNotification",sendGarbageTruckNotification);

export default router;