import { User } from "@/models/user.model";
import { dbConfig } from "@/lib/dbConfig";

export async function POST(request: Request) {
    await dbConfig();
    try {
        const { username, code } = await request.json();
        const decodedUsername = decodeURIComponent(username);

        const user = await User.findOne({ username: decodedUsername });
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "Username not found",
                },
                {
                    status: 500,
                }
            );
        }

        const isCodeValid = user.verifyCode === code;

        if (!isCodeValid) {
            return Response.json(
                {
                    success: false,
                    message: "Verify code not correct",
                },
                {
                    status: 400,
                }
            );
        }

        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
        if (!isCodeNotExpired) {
            return Response.json(
                {
                    success: false,
                    message: "Verification code is expired please signup again",
                },
                {
                    status: 400,
                }
            );
        }

        user.isVerified = true;
        user.save();

        return Response.json(
            {
                success: true,
                message: "user successfully verified",
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log("Error while verifying code ", error);
        return Response.json(
            {
                success: false,
                message: "Error while verifying code",
            },
            {
                status: 500,
            }
        );
    }
}
