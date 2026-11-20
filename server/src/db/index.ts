import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {

    const db_uri = process.env.MONGO_DB_URI

    if (!db_uri) throw new Error("Missing db uri in env variables.")

    try {
        const conn = await mongoose.connect(`${db_uri}/${DB_NAME}`)
        console.log(`Database connected! DB HOST: ${conn.connection.host}`)
    } catch (error) {
        console.log("DB connection failed", error)
    }

}

export default connectDB