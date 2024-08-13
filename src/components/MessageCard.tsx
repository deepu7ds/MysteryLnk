"use client";
import { Card, CardContent } from "@/components/ui/card";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Message } from "@/models/user.model";
import { useToast } from "./ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

type MessageCardProp = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
};
const MessageCard = ({ message, onMessageDelete }: MessageCardProp) => {
    const { toast } = useToast();

    const handleDeleteConfirm = async () => {
        const response = await axios.delete<ApiResponse>(
            `/api/delete-message/${message._id}`
        );
        toast({
            title: response.data.message,
        });
        onMessageDelete(message._id as string);
    };
    return (
        <>
            <Card className="relative pr-6">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Trash2 className="text-red-500 absolute top-4 right-4" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete this message from
                                the database.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteConfirm}>
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <CardContent>
                    <p className="text-md">{message.content}</p>
                    <span className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(message.createdAt), {
                            addSuffix: true,
                        })}
                    </span>
                </CardContent>
            </Card>
        </>
    );
};

export default MessageCard;
