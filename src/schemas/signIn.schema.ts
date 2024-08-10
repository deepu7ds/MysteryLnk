import { z } from "zod";

export const signInSchema = z.object({
    identifier: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});
