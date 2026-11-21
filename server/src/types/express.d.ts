import { HydratedDocument } from "mongoose";
import { IUser, IUserMethods } from "../models/user.model.ts";

// Extend the Express Request interface to include a user property of type HydratedDocument<IUser, IUserMethods>
declare global {

    // namespace Express is used to extend the existing Express types
    namespace Express {

        // interface Request is used to extend the existing Request interface in Express
        interface Request {

            // user property is added to the Request interface to store the authenticated user
            user?: HydratedDocument<IUser, IUserMethods
        }
    }
}