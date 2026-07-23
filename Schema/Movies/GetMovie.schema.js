import z from "zod";

export const GetMovieSchema = z.object({
    params : z.object({
        slug : z.string()
    })
})