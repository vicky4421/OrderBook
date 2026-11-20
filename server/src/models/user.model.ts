import mongoose, { Schema, Model } from "mongoose";
import jwt, { SignOptions } from "jsonwebtoken"
import bcrypt from "bcrypt"

// user interface to define the shape of the user document so that we can use it in the controller and other places
export interface IUser {
    username: string
    name: string
    password: string
    refreshToken?: string
}

// user methods interface to define the shape of the user methods so that we can use it in the controller and other places
export interface IUserMethods {
    isPasswordCorrect(password: string): Promise<boolean>
    generateAccessToken(): string
    generateRefreshToken(): string
}

// user model type to define the shape of the user model so that we can use it in the controller and other places
type UserModel = Model<IUser, {}, IUserMethods>

// user model schema to define the shape of the user document in the database
const userSchema = new Schema<IUser, UserModel, IUserMethods>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

// pre-save hook to hash the password before saving the user
// This hook will only run if the password field is modified
// Not required to call next() because modern versions of Mongoose support async/await in pre hooks and will automatically handle the next() call for you. 
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)
})

// method to compare the password with the hashed password
userSchema.methods.isPasswordCorrect = function (password: string) {
    return bcrypt.compare(password, this.password)
}

// method to generate access token
userSchema.methods.generateAccessToken = function () {

    const secret = process.env.ACCESS_TOKEN_SECRET
    const expiry = process.env.ACCESS_TOKEN_EXPIRY

    if (!secret || !expiry) {
        throw new Error("Missing ACCESS_TOKEN_SECRET or ACCESS_TOKEN_EXPIRY in environment variables");
    }

    return jwt.sign(
        {
            _id: this._id
        },
        secret,
        { expiresIn: expiry as SignOptions["expiresIn"] }
    )
}

// method to generate refresh token
userSchema.methods.generateRefreshToken = function () {

    const secret = process.env.REFRESH_TOKEN_SECRET
    const expiry = process.env.REFRESH_TOKEN_EXPIRY

    if (!secret || !expiry) {
        throw new Error("Missing REFRESH_TOKEN_SECRET or REFRESH_TOKEN_EXPIRY in environment variables");
    }

    return jwt.sign(
        {
            _id: this._id
        },
        secret,
        { expiresIn: expiry as SignOptions["expiresIn"] }
    )
}

// create and export the user model
export const User = mongoose.model<IUser, UserModel>("User", userSchema)