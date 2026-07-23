import { ChangePass, DestroyUser, GetAllUsers, GetUser, Loginuser, MakeUser } from "../Services/UserServices.js";

export const ShowAllUsers = async (req , res) => {

    const query = req.query

    if ('username' in query) {

        const username = query.username

        query.username = {'$regex' : username, '$options' : 'i'}

    }
    
    const allusers = await GetAllUsers(query)

    res.status(200).json({
        message : 'all users fetched succesfully',
        data : allusers
    });
};

export const ShowUser = async(req , res) => {

    const username = req.params.name

    const user = await GetUser(username)

    res.status(200).json({
        message : 'user fetched succesfully',
        data : user
    })
}

export const CreateUser = async(req , res) => {
    
    const {email , username , password , role} = req.body;

    const user = await MakeUser(email , username , password , role)

    res.status(200).json({
        message : 'user created succesfully',
        data : user
    })
}

export const login = async(req , res) => {

    const {username , password} = req.body;

    const token = await Loginuser(username , password , res)

    res.status(200).json({token})



}

export const UpdateUser = async(req , res) => {

    const id = req.params.id;

    const {oldpass} = req.body
    const {newpass} = req.body

    const user = await ChangePass(id , oldpass , newpass);

    res.status(200).json({
        message : 'password updated succesfully',
        data : user
    })




}

export const DeleteUser = async(req , res) => {
    
    let id = req.params.id

    const user = await DestroyUser(id)

    res.status(200).json({
        message : 'user deleted succesfully',
        data : user
    })


    
}