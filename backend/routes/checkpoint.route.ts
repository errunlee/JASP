import Router from "express";
import { getCheckpoints } from "../controllers/checkpoint.controller";

const router = Router();

router.get("/",getCheckpoints);


export default router;