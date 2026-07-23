import app from "./app.js";
import dotenv from "dotenv";
dotenv.config()
import mongoose from "mongoose";

const databse_url = process.env.DATABASE_URL

const port = process.env.SERVER_PORT


const startserver = async () => {
    try {
        await mongoose.connect(databse_url);

    app.listen(port , () => {
        console.log(`server is runing on ${port}`);
    })
    }
    catch {
        console.error('error runing server');
    }
}

startserver()
