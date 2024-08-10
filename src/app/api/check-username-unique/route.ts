import { User } from "@/models/user.model";
import { dbConfig } from "@/lib/dbConfig";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUp.schema";

const usernameQuerySchema = z.object({
    username: usernameValidation,
});

export async function GET(request: Request) {
    await dbConfig();
    try {
        const { searchParams } = new URL(request.url);
        const queryParam = { username: searchParams.get("username") };
        const result = usernameQuerySchema.safeParse(queryParam);

        if (!result.success) {
            return Response.json(
                {
                    success: false,
                    message: "",
                },
                {
                    status: 400,
                }
            );
        }
        let { username } = result.data;
        username = username.toLowerCase();
        const existingVerifiedUser = await User.findOne({
            username,
            isVerified: true,
        });
        if (existingVerifiedUser) {
            return Response.json(
                {
                    success: false,
                    message: "Username already taken",
                },
                {
                    status: 400,
                }
            );
        }
        return Response.json(
            {
                success: true,
                message: "username is available",
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log("Error checking username", error);
        return Response.json(
            {
                message: "Error checking username",
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}
