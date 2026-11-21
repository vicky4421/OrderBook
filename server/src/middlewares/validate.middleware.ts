import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod/v3";
import APIError from "../utils/APIError.js";

// Middleware to validate request body against a Zod schema
export const validateInput = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {

        // Validate the request body using the provided Zod schema
        const parsed = schema.safeParse(req.body)

        // If validation fails, create an APIError with the first error message and pass it to the next middleware
        if (!parsed.success) {
            const errorMsgs = parsed.error.issues.map(issue => issue.message)
            return next(new APIError(400, errorMsgs[0], errorMsgs))
        }

        req.body = parsed.data
        next()
    }
}
