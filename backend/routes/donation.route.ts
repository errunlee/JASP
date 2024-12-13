import Router from "express";
import { getCheckpoints,saveCheckpoint } from "../controllers/checkpoint.controller";
import { upload } from "../config/configs";

const router = Router();

router.get("/",upload.single("file"),getCheckpoints);



export default router;