import Router from "express";
import { getCheckpoints,saveCheckpoint } from "../controllers/checkpoint.controller";

const router = Router();

router.get("/",getCheckpoints);
router.post("/",saveCheckpoint);



export default router;