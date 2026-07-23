import z from "zod";

export const GetUser = z.object({
    params : z.object({
        name : z.string().min(4)
    })
})