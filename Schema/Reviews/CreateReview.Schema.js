import z from "zod";

export const CreateReviewSchema = z.object({

    params : z.object({
        slug : z.string()
    }),

    body : z.object({
        rating : z.number().min(1).max(5).optional(),
        review : z.string().optional()
    })
})
