import { Response } from "express"
import { LogType,logger } from "./logger";

export const sendError = (res:Response,body : {
    code ?:number,
    message ?: string,
    description ?: string,
}= {
    message : "Something went wrong",
    description : "" 
},logMessage ?: string)=> {
    if(process.env.ENV=="DEV") {
        console.log(body.description);
    }
    if(logMessage) {
        logger(LogType.ERROR,logMessage)
    }

    res.status(body.code ?? 400).json({
        code : body.code,
        message : body.message,
        description : body.description
    })
}

export const logError  = (error : any)=> {
    logger(LogType.ERROR,error instanceof Error ? error.message : typeof error == "string"?error:"Undefined Error")
}