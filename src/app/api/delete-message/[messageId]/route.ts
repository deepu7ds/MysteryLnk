import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { dbConfig } from "@/lib/dbConfig";
import { User as UserModel } from "@/models/user.model";
import { User } from "next-auth";

export async function DELETE(
    request: Request,
    { params }: { params: { messageId: string } }
) {
    const messageId = params.messageId;
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

    try {
        const updatedMessages = await UserModel.updateOne(
            { _id: user._id },
            { $pull: { messages: { _id: messageId } } }
        );

        if (updatedMessages.modifiedCount == 0) {
            return Response.json(
                {
                    success: false,
                    message: "message not found or already deleted",
                },
                {
                    status: 404,
                }
            );
        }

        return Response.json(
            {
                success: true,
                message: "message deleted successfully",
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log("Error deleting message: ", error);

        return Response.json(
            {
                success: false,
                message: "Error deleting message",
            },
            {
                status: 500,
            }
        );
    }
}
