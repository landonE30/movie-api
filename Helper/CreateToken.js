import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const CreateToken = (user) => {
    const payload = {id : user._id , role : user.role}

    const token = jwt.sign(payload , process.env.SECRET , {expiresIn : "72h"})

    return token
}