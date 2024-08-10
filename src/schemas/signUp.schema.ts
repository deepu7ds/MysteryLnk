import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(4, "Username must have atleast 4 letter")
    .max(10, "Username must have atmost 10 letter")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "invalid email address" }),
    password: z
        .string()
        .min(6, "Password must have atleast 6 letter")
        .max(10, "Password must have atmost 10 letter")
        .regex(/(?=.*[0-9])/, "Password must include at least one number")
        .regex(/(?=.*[a-zA-Z])/, "Password must include at least one alphabet")
        .regex(
            /(?=.*[!@#$%^&*])/,
            "Password must include at least one special character"
        ),
});
