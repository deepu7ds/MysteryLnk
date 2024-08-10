import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { dbConfig } from "@/lib/dbConfig";
import { User as UserModel } from "@/models/user.model";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConfig();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "not authenticated",
            },
            {
                status: 401,
            }
        );
    }

    const userId = user._id;
    const { acceptMessages } = await request.json();
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, {
            isAcceptingMessage: acceptMessages,
        });
        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message:
                        "failed to update user status to accepting message",
                },
                {
                    status: 401,
                }
            );
        }
        return Response.json(
            {
                success: true,
                message: "successfully update accepting message status",
                updatedUser,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log("failed to update user status to accepting message");
        return Response.json(
            {
                success: false,
                message: "failed to update user status to accepting message",
            },
            {
                status: 500,
            }
        );
    }
}

export async function GET(request: Request) {
    await dbConfig();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "not authenticated",
            },
            {
                status: 401,
            }
        );
    }

    const userId = user._id;
    try {
        const foundUser = await UserModel.findById(userId);
        if (!foundUser) {
            return Response.json(
                {
                    success: false,
                    message: "user not found",
                },
                {
                    status: 404,
                }
            );
        }
        return Response.json(
            {
                success: true,
                isAcceptingMessage: foundUser.isAcceptingMessage,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log("failed to get user message accepting status");
        return Response.json(
            {
                success: false,
                message: "failed to get user message accepting status",
            },
            {
                status: 500,
            }
        );
    }
}
