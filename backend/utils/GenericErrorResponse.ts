import { Response } from "express"

export const sendError = (res:Response,body : {
    code ?:number,
    message ?: string,
    description ?: string,
}= {
    message : "Something went wrong",
    description : "" 
},logMessge ?: string)=> {
    if(process.env.ENV=="DEV") {
        console.log(body.description);
    }
    console.log(logMessge)

    res.status(body.code ?? 400).json({
        code : body.code,
        message : body.message,
        description : body.description
    })
}