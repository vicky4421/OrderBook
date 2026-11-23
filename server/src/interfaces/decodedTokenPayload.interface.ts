import { JwtPayload } from "jsonwebtoken"

export interface DecodedTokenPaylod extends JwtPayload {
    _id: string
}