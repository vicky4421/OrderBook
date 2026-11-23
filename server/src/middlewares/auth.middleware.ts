import APIError from "../utils/APIError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { Request, NextFunction } from "express";
import { DecodedTokenPaylod } from "../interfaces/decodedTokenPayload.interface.js";

// Middleware to verify the access JWT token and authenticate the user
export const verifyAcessJWT = asyncHandler(async (req: Request, _, next: NextFunction) => {
    try {

        const tokenSecret = process.env.ACCESS_TOKEN_SECRET

        if (!tokenSecret) throw new APIError(500, "Access token is not found in environment!")

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) throw new APIError(401, "Unauthorized request")

        const decodedToken = jwt.verify(token, tokenSecret) as DecodedTokenPaylod

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) throw new APIError(401, "Invalid token")

        req.user = user

        next()

    } catch (error) {
        throw new APIError(401, "Access token is invalid!")
    }
})

