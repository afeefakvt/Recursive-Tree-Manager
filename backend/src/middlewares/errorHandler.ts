import { Request,Response,NextFunction } from "express";
import { HttpStatus } from "../constants/httpStatus";
import { HttpError } from "../utils/httpError";

export const errorHandler = (err:HttpError | Error, req:Request, res:Response, next:NextFunction)=>{
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR || 500
    let message = 'server error'

    if(err instanceof HttpError){
        statusCode = err.statusCode
        message = err.message
    }else if(err instanceof Error){
        message = err.message;
    }

    res.status(statusCode).json({success:false, statusCode,message})
}