import { Response } from "express"

export const sendError = (res:Response,{code=400,message="Something Went Wrong",description=""})=> {
    res.json({
        code,
        message,
        description
    })
}