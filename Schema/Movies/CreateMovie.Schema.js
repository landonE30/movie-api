import z from "zod";

export const CreateMovieSchema = z.object({
    body : z.object({
        title : z.string(),
        slug : z.string().optional(),
        director : z.string().min(5),
        overview : z.string().min(10),
        genres : z.array(z.string()).nonempty(),
        releaseyear : z.number().min(4),
        reviewCount : z.number().optional().default(0),
        rating : z.number().max(5).optional().default(0)
    })
})