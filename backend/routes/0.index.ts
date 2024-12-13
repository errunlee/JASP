import Router from "express";
import NotifRouter from "./notif.route";
import { sendResponse } from "../utils/GenericResponse";

const router = Router();

router.use("",NotifRouter);

router.get("/ping", (req,res)=> {
  sendResponse(res,{
      code :200,
      message : "pong"
  })
})


export default router;