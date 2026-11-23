import asyncHandler from '../utils/asyncHandler.js'
import APIError from '../utils/APIError.js'
import { User, IUser } from '../models/user.model.js'
import APIResponse from '../utils/APIResponse.js'
import jwt, { JwtPayload } from 'jsonwebtoken'
import mongoose, { Types } from 'mongoose'
import { Request, Response } from 'express'
import { COOKIE_OPTIONS } from '../constants.js'
import { DecodedTokenPaylod } from '../interfaces/decodedTokenPayload.interface.js'

// Helper function to generate access and refresh tokens for a user
const _generateAccessAndRefreshToken = async (userId: Types.ObjectId | string) => {
    try {
        const user = await User.findById(userId)

        if (!user) throw new APIError(404, "User not found!")

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new APIError(500, "Something went wrong while generating access and refresh token")
    }
}

// Controller function to handle user registration
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, name, password }: IUser = req.body

    if (
        [username, name, password].some(field => field?.trim() === "")
    ) {
        throw new APIError(400, "All fields are required")
    }

    const existingUser = await User.findOne({ username })

    if (existingUser) {
        throw new APIError(409, "User with username already exists!")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        name,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new APIError(500, "Something went wrong while generating user!")
    }

    return res
        .status(201)
        .json(
            new APIResponse(200, createdUser, "User registered successfully!")
        )

})

const loginUser = asyncHandler(async (req: Request, res: Response) => {

    const { username, password }: IUser = req.body

    if (!username && !password) {
        throw new APIError(400, "Username and password are required!")
    }

    const user = await User.findOne({ username })

    if (!user) {
        throw new APIError(404, "User does not exists!")
    }

    const isValidPassword = await user.isPasswordCorrect(password)

    if (!isValidPassword) {
        throw new APIError(401, "Invalid credentials!")
    }

    const { accessToken, refreshToken } = await _generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    return res
        .status(200)
        .cookie("accessToken", accessToken, COOKIE_OPTIONS)
        .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
        .json(
            new APIResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in successfully!"
            )
        )

})

// Controller function to handle user logout
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    await User.findByIdAndUpdate(
        req.body.user._id,
        {
            $unset: { refreshToken: 1 }
        },
        {
            new: true
        }
    )

    return res
        .status(200)
        .clearCookie("accessToken", COOKIE_OPTIONS)
        .clearCookie("refreshToken", COOKIE_OPTIONS)
        .json(
            new APIResponse(200, {}, "User logged out successfully!")
        )
})

// Controller function to handle access token refresh
const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const incomingRequestToken = req.cookies.refreshToken || req.body.refreshToken

    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

    if (!refreshTokenSecret) {
        throw new APIError(500, "Refresh token is not set in environment")
    }

    if (!incomingRequestToken) {
        throw new APIError(401, "Unauthorized request!")
    }

    try {

        const decodedToken = jwt.verify(
            incomingRequestToken,
            refreshTokenSecret
        ) as DecodedTokenPaylod


        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new APIError(401, "Invalid refresh token")
        }

        if (incomingRequestToken !== user?.refreshToken) {
            throw new APIError(401, "Refresh token is expired or used!")
        }

        const { accessToken, refreshToken } = await _generateAccessAndRefreshToken(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, COOKIE_OPTIONS)
            .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            .json(
                new APIResponse(
                    200,
                    {
                        accessToken,
                        refreshToken: refreshToken
                    },
                    "Access token refreshed!"
                )
            )

    } catch (error) {
        const message = error instanceof Error ? error.message : "Invalid refresh token"
        throw new APIError(401, message)
    }
})

// Controller function to handle password change
const changePassword = asyncHandler((req: Request, res: Response) => {
    const { oldPass, newPass } = req.body

    if (!oldPass && !newPass) {
        throw new APIError(400, "Both fields are needed!")
    }


})

// Controller function to get the current logged-in user
const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                req.user,
                "User fetched successfully!"
            )
        )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changePassword,
    getCurrentUser
}