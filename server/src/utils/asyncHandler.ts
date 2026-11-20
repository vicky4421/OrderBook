import { Request, Response, NextFunction, RequestHandler } from 'express'

// asyncHandler is a higher-order function that wraps an Express request handler to catch any errors and pass them to the next middleware (error handler). This helps in avoiding repetitive try-catch blocks in each route handler.
const asyncHandler = (requestHandler: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch(err => next(err))
    }
}