import bcrypt from "bcryptjs";
import UserModel from '../Models/User.js'
import { ApiError } from "../ApiError.js";
import dotenv from "dotenv";
import { CreateToken } from "../Helper/CreateToken.js";
dotenv.config()

export const GetAllUsers = async(query) => {
    return await UserModel.find(query)
}

export const GetUser = async(username) => {

    const user =  await UserModel.findOne({username : username})
        .populate({path : 'review' , select : ['rating']})
        .populate({path : 'movie' , select : ['title','director']})
        .select('-password')

    
    if (!user) throw new ApiError(404 , 'user not found')

    return await user

}

export const MakeUser = async(email , username , password , role) => {

    const saltround = Number(process.env.SALT);

    const hashedpass = await bcrypt.hash(password , saltround);

    const newuser = await UserModel.create({
        email,
        username,
        password : hashedpass,
        role
    })

    await newuser.save();

    return await newuser;
}

export const Loginuser = async(username , password) => {

    const user = await UserModel.findOne({username})

    if (!user) throw new ApiError(401 , 'invalid credentials')

    const ismatch = await bcrypt.compare(password , user.password)

    if (!ismatch) throw new ApiError(401 , 'invalid credentials')

    
    const token = CreateToken(user)

    return token
    
    
}

export const ChangePass = async(id,oldpass , newpass ) => {
    
    const saltround = Number(process.env.SALT);

    const user = await UserModel.findOne({_id : id})

    if (!user) throw new ApiError(404 , 'user not found')

    if (await bcrypt.compare(oldpass , user.password)){

        if(!(await bcrypt.compare(newpass , user.password))) {

            const hashedpass = await bcrypt.hash(newpass , saltround);

            user.password =  hashedpass;

            user.save();

            return user;
        }
        else{
            throw new ApiError(401 , 'this password is already in use');
        }
        
    }else {
        throw new ApiError(401 , "password is incorrect")
    }
}

export const DestroyUser = async(id) => {

    const user = await UserModel.findOneAndDelete({_id : id})

    if (!user) throw new ApiError(404 , 'user not found')

    return user
}

