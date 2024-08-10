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
import { ApiResponse } from "@/types/apiResponse";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

type MessageCardProp = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
    isLoading: boolean;
};
const MessageCard = ({
    message,
    onMessageDelete,
    isLoading,
}: MessageCardProp) => {
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
            {!isLoading ? (
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
                                    This will permanently delete this message
                                    from the database.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeleteConfirm}
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <CardContent>
                        <p>{message.content}</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[50px] w-full rounded-xl" />
                </div>
            )}
        </>
    );
};

export default MessageCard;
