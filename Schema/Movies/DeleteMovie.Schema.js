import z from "zod";
import mongoose from "mongoose";

const idschema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val) ,
    {message : 'id is invalid'})

export const DeleteMovieSchema = z.object({

    params : z.object({
        id : idschema
    })

})