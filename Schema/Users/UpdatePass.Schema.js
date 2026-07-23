import mongoose from "mongoose";
import z from "zod";


const idschema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val) , {
    message: "Id is not valid"
})

export const UpdatePassSchema = z.object({
    params : z.object({
        id: idschema,
    }),
    body : z.object({
        oldpass : z.string().min(7),
        newpass : z.string().min(7)
    })
})