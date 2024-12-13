import { Response } from "express"

export const sendError = (res:Response,body : {
    code ?:number,
    message ?: string,
    description ?: string,
}= {
    message : "Something went wrong",
    description : "" 
})=> {
    res.status(body.code ?? 400).json({
        code : body.code,
        message : body.message,
        description : body.description
    })
}