import z from "zod";

export const CreateUserSchema = z.object({
    body : z.object({
        email : z.email(),
        username : z.string().min(4),
        password: z.string().min(7),
        role : z.enum(["user" , "admin"]).default("user").optional()
    })
    
})