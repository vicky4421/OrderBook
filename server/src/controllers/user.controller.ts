import asyncHandler from '../utils/asyncHandler.js'
import APIError from '../utils/APIError.js'
import { User, IUser } from '../models/user.model.js'
import APIResponse from '../utils/APIResponse.js'
import jwt from 'jsonwebtoken'
import mongoose, { Types } from 'mongoose'
import { Request, Response } from 'express'

const generateAccessAndRefreshToken = async (userId: Types.ObjectId | string) => {
    try {
        const user = await User.findById(userId)

        if (!user) return new APIError(404, "User not found!")

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new APIError(500, "Something went wrong while generating access and refresh token")
    }
}

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