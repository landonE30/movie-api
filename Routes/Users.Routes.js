import e from "express";
import { CreateUser, DeleteUser, login, ShowAllUsers, ShowUser, UpdateUser } from "../Controllers/UserController.js";
import { Validate } from "../Middlewares/Validation.js";
import { CreateUserSchema } from "../Schema/Users/CreateUser.schema.js";
import { DeleteUserSchema } from "../Schema/Users/DeleteUser.Schema.js";
import { UpdatePassSchema } from "../Schema/Users/UpdatePass.Schema.js";
import { LoginSchema } from "../Schema/Users/Login.Schema.js";
import { GetUser } from "../Schema/Users/GetUser.Schema.js";


const Route = e.Router()

Route.get('/' ,  ShowAllUsers)
Route.get('/show/:name', Validate(GetUser) , ShowUser)
Route.post('/create' , Validate(CreateUserSchema) , CreateUser)
Route.post('/login' , Validate(LoginSchema) , login )
Route.post('/update/:id', Validate(UpdatePassSchema) , UpdateUser)
Route.delete('/delete/:id', Validate(DeleteUserSchema) , DeleteUser)



export default Route