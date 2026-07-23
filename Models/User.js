import mongoose from "mongoose";
const { Schema } = mongoose;

const User = new Schema({
    email : {type : String , unique : true , trim : true , required : true},
    username : {type : String , unique : true , trim : true , required : true},
    password : {type : String , trim : true , required : true},
    role : {type : String , enum : ["user" ,"admin"] , default : "user"},
    
}, { timestamps: true });

export default mongoose.model('User' , User)