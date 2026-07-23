import jwt from "jsonwebtoken";
import { ApiError } from "../ApiError.js";
import dotenv from 'dotenv'
dotenv.config()

export const Auth = (req, res , next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) throw new ApiError(401 , "token invalid")
    
    const token = authHeader.split(" ")[1]

    const verify = jwt.verify(token , process.env.SECRET)

    if(!verify) throw new ApiError(401 , "token is invalid")
    
    req.user = verify

    next()
}