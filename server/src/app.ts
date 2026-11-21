import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

// application instance
const app = express()

// cors middleware to allow cross-origin requests from the frontend
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// middleware to set various HTTP headers for security
app.use(helmet())

// middleware to parse incoming requests with JSON payloads and URL-encoded data
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// middleware to parse cookies from incoming requests
app.use(cookieParser())

export { app }