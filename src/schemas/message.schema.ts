import { z } from "zod";

export const messageSchema = z.object({
    content: z
        .string()
        .min(10, "Content must have atleast 10 letter")
        .max(300, "Content must have atmost 300 letter"),
});
