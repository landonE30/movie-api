import e from "express";
import { CreateUser, DeleteUser, login, ShowAllUsers, ShowUser, UpdateUser } from "../Controllers/UserController.js";
import { Validate } from "../Middlewares/Validation.js";
import { CreateUserSchema } from "../Schema/Users/CreateUser.schema.js";
import { DeleteUserSchema } from "../Schema/Users/DeleteUser.Schema.js";
import { UpdatePassSchema } from "../Schema/Users/UpdatePass.Schema.js";
import { LoginSchema } from "../Schema/Users/Login.Schema.js";
import { GetUser } from "../Schema/Users/GetUser.Schema.js";
import { Admin } from "../Middlewares/admin.js";


const Route = e.Router()

Route.get('/' ,  ShowAllUsers)
Route.get('/:name', Validate(GetUser) , ShowUser)
Route.post('/create' , Validate(CreateUserSchema) , CreateUser)
Route.post('/login' , Validate(LoginSchema) , login )
Route.post('/update/:id', Admin , Validate(UpdatePassSchema) , UpdateUser)
Route.delete('/delete/:id', Admin , Validate(DeleteUserSchema) , DeleteUser)



export default Route