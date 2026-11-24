/**
 * @author Vivek Sawant
 * @created 19/11/2026 11:06
 */

import express from 'express'
import "dotenv/config"
import connectDB from './db/index.js'
import { app } from "./app.js"

const PORT = process.env.PORT || 3000

// Connect to the database and start the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`)
        })
    })
    .catch(err => {
        console.log("DB connection failed", err)
    })