import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { errorHandler } from './middlewares/errorHandler.middleware.js'
import { rateLimit } from 'express-rate-limit'

// application instance
const app = express()

// cors middleware to allow cross-origin requests from the frontend
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    // store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)


// middleware to set various HTTP headers for security
app.use(helmet())

// middleware to parse incoming requests with JSON payloads and URL-encoded data
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// middleware to parse cookies from incoming requests
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users", userRouter)

app.use(errorHandler)

export { app }