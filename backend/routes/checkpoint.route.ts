import Router from "express";
import { getCheckpoints,saveCheckpoint } from "../controllers/checkpoint.controller";
import { isAdmin } from "../middlewares/role.middleware";

const router = Router();

router.get("/", isAdmin(), getCheckpoints);
router.post("/", isAdmin(), saveCheckpoint);
// router.get("/dep", getAllCheckpoints);



export default router;