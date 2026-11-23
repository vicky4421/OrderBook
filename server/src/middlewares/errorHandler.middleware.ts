import { Request, Response, NextFunction } from "express";
import APIError from "../utils/APIError.js";
import { success } from "zod";

// Middleware function to handle errors in the application
export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    // If the error is an instance of APIError, return a structured JSON response with the error details
    if (err instanceof APIError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            data: null,
            message: err.message,
            success: false,
            errors: err.errors,
            // Include the stack trace in the response if the application is running in development mode
            ...(process.env.NODE_ENV === "development" && { stack: err.stack })
        })
    }

    const message = err instanceof Error ? err.message : "Internal server error!"

    return res
        .status(500)
        .json({
            statusCode: 500,
            data: null,
            message,
            success: false,
            error: [],
            ...(process.env.NODE_ENV === "development" && err instanceof Error && { stack: err.stack })
        })
}