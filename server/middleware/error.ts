import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"

    if (err.name === 'CasteError') {
        const message = "Resource not found"
        err = new ErrorHandler(message, 400);
    }

    if (err.statusCode === 11000) {
        const message = "Duplicate Key entered";
        err = new ErrorHandler(message, 400);
    }

    if (err.name === 'JsonWebTokenError') {
        const message = "Json web token is invalid";
        err = new ErrorHandler(message, 400);
    }

    if (err.name === 'TokenExpiredError') {
        const message = "Json web token is expired";
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message:err.message
    })
}