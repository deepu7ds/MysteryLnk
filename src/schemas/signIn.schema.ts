import { z } from "zod";

export const signInSchema = z.object({
    identifier: z
        .string()
        .min(1, "Username is required")
        .regex(/^\S*$/, "Spaces not allowed"),
    password: z.string().min(1, "Password is required"),
});
