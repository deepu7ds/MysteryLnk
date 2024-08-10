import { User } from "@/models/user.model";
import { Message } from "@/models/user.model";
import { dbConfig } from "@/lib/dbConfig";

export async function POST(request: Request) {
    await dbConfig();
    const { username, content } = await request.json();
    try {
        const user = await User.findOne({ username });
        if (!user) {
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

        if (!user.isAcceptingMessage) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "user not accepting messages",
                }),
                {
                    status: 403,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        const newMessage = { content, createdAt: new Date() };
        user.messages.push(newMessage as Message);
        await user.save();
        return new Response(
            JSON.stringify({
                success: true,
                message: "message sent successfully",
            }),
            {
                status: 201,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.log("Error adding message: ", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error while adding message",
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
