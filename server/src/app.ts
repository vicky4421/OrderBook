import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// application instance
const app = express()

// cors middleware to allow cross-origin requests from the frontend
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// middleware to parse incoming requests with JSON payloads and URL-encoded data
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// middleware to parse cookies from incoming requests
app.use(cookieParser())

export { app }