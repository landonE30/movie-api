import { ApiError } from "../ApiError.js";

export const Admin = (req , res , next) => {

    const role = req.user.role;

    if (role != 'admin') throw new ApiError(401 , 'access denied')

    next()
}