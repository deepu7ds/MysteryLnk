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
        return new Response(
            JSON.stringify({
                success: false,
                message: "user not found",
            }),
            {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
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
            return new Response(
                JSON.stringify({
                    success: false,
                    message:
                        "failed to update user status to accepting message",
                }),
                {
                    status: 401,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }
        return new Response(
            JSON.stringify({
                success: true,
                message: "successfully update accepting message status",
                updatedUser,
            }),
            {
                status: 201,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.log("failed to update user status to accepting message");
        return new Response(
            JSON.stringify({
                success: false,
                message: "failed to update user status to accepting message",
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}

export async function GET(request: Request) {
    await dbConfig();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "not authenticated",
            }),
            {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    const userId = user._id;
    try {
        const foundUser = await UserModel.findById(userId);
        if (!foundUser) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "user not found",
                }),
                {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }
        return new Response(
            JSON.stringify({
                success: true,
                isAcceptingMessage: foundUser.isAcceptingMessage,
            }),
            {
                status: 201,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.log("failed to get user message accepting status");
        return new Response(
            JSON.stringify({
                success: false,
                message: "failed to get user message accepting status",
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
