import { Response } from "express"

export const sendResponse = (res:Response,body : {
    code ?:number,
    message ?:string,
    data ?: any | any[] | null,
    description ?: string
}={code:200,message:"Request Success",data:[],description:""})=> {
    res.status(body.code ?? 200).json({
        code: body.code,
        message: body.message,
        data: body.data,
        description : body.description,
    })
}