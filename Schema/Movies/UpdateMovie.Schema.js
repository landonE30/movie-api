import z from "zod";
import { id } from "zod/locales";
import mongoose from "mongoose";

const idschema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val) ,
    {message : 'id is invalid'})

export const UpdateMovieSchema = z.object({

    params : z.object({
        id : idschema
    }),

    body : z.object({
        title : z.string().optional(),
        director : z.string().min(5).optional(),
        overview : z.string().min(10).optional(),
        genres : z.array().optional(),
        releaseyear : z.number().optional(),
    })
})