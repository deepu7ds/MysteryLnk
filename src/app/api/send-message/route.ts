import { User } from "@/models/user.model";
import { Message } from "@/models/user.model";
import { dbConfig } from "@/lib/dbConfig";

export async function POST(request: Request) {
    await dbConfig();
    const { username, content } = await request.json();
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "user not found ",
                },
                {
                    status: 404,
                }
            );
        }

        if (!user.isAcceptingMessage) {
            return Response.json(
                {
                    success: false,
                    message: "user not accepting messages",
                },
                {
                    status: 403,
                }
            );
        }

        const newMessage = { content, createdAt: new Date() };
        user.messages.push(newMessage as Message);
        await user.save();
        return Response.json(
            {
                success: true,
                message: "message sent successfully",
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log("Error adding message: ", error);
        return Response.json(
            {
                success: false,
                message: "Error while adding message",
            },
            {
                status: 500,
            }
        );
    }
}
