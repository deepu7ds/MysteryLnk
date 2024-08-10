"use client";

import MessageCard from "@/components/MessageCard";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Message, User } from "@/models/user.model";
import { acceptMessageSchema } from "@/schemas/acceptMessage.schema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [isSwitchLoading, setIsSwitchLoading] = useState(false);

    const { toast } = useToast();

    const router = useRouter();
    const handleDeleteMessages = (messageId: string) => {
        setMessages(messages.filter((message) => message._id !== messageId));
    };

    const { data: session } = useSession();
    const user: User = session?.user as User;

    const form = useForm({
        resolver: zodResolver(acceptMessageSchema),
    });

    const { register, setValue, watch } = form;

    const acceptMessages = watch("acceptMessages");

    const fetchAcceptMessages = useCallback(async () => {
        setIsSwitchLoading(true);
        try {
            const response = await axios.get<ApiResponse>(
                "/api/accept-messages"
            );
            setValue("acceptMessages", response.data.isAcceptingMessage);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: "Error",
                description:
                    axiosError.response?.data.message ||
                    "Failed to fetch mesage settings",
                variant: "destructive",
            });
        } finally {
            setIsSwitchLoading(false);
        }
    }, [setValue, toast]);

    const fetchMessages = useCallback(
        async (refresh: boolean = false) => {
            setIsSwitchLoading(true);
            setIsMessagesLoading(true);
            try {
                const response = await axios.get("/api/get-messages");
                setMessages(response.data.messages || []);
                if (refresh) {
                    toast({
                        title: "Refreshed Messages",
                        description: "Showing latest messages",
                    });
                }
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                toast({
                    title: "Error",
                    description:
                        axiosError.response?.data.message ||
                        "Failed to fetch mesage settings",
                    variant: "destructive",
                });
            } finally {
                setIsSwitchLoading(false);
                setIsMessagesLoading(false);
            }
        },
        [setMessages, setIsMessagesLoading, toast]
    );

    useEffect(() => {
        if (!session || !session.user) return;

        fetchMessages();
        fetchAcceptMessages();
    }, [session, setValue, fetchAcceptMessages, fetchMessages]);

    const handleSwitchChange = async () => {
        try {
            const response = await axios.post<ApiResponse>(
                "/api/accept-messages",
                {
                    acceptMessages: !acceptMessages,
                }
            );
            setValue("acceptMessages", !acceptMessages);
            toast({
                title: "Success",
                description: response?.data.message || "",
            });
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: "Error",
                description:
                    axiosError.response?.data.message ||
                    "Failed to fetch mesage settings",
                variant: "destructive",
            });
        }
    };

    // const { username } = session?.user as User;
    const username = user?.username;
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const profileUrl = `${baseUrl}/u/${username}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(profileUrl);
        toast({
            title: "Copied",
        });
    };

    // if (!session) {
    //     router.replace("/sign-in");
    // }

    return (
        <>
            <div className="flex flex-col items-center gap-4 px-4 mb-10 container">
                <h1 className="text-3xl font-bold mt-5 mb-5 dark:text-blue-400">
                    User Dashboard
                </h1>
                <div className="w-full flex flex-col lg:flex-row gap-8 lg:w-[70%] p-4">
                    <div className="w-full flex flex-col gap-2 items-center text-center lg: flex-1 justify-center">
                        <h1>
                            Share This{" "}
                            <span className="font-bold text-blue-400">
                                Link
                            </span>{" "}
                            to receive Anonymous Messages
                        </h1>
                        <div className="flex w-fit items-center justify-center gap-4 bg-secondary rounded-lg py-1 pr-2 pl-4">
                            <p className="">{profileUrl}</p>
                            <Copy
                                className="lg:p-1 cursor-pointer"
                                onClick={copyToClipboard}
                            />
                        </div>
                    </div>
                    <Separator
                        orientation="vertical"
                        className="h-20 hidden lg:block"
                    />
                    <div className="flex flex-col justify-center items-center gap-2 lg: flex-1">
                        <p>
                            Change messages{" "}
                            <span className="font-bold text-blue-400">
                                acceptance
                            </span>{" "}
                            status
                        </p>
                        <div className="flex items-center gap-2">
                            <Switch
                                {...register("acceptMessages")}
                                checked={acceptMessages}
                                onCheckedChange={handleSwitchChange}
                                disabled={isSwitchLoading}
                            />
                            <span>Accept Messages</span>
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="flex flex-col gap-5 w-full lg:w-[70%] mt-4">
                    {messages.map((message, index) => (
                        <MessageCard
                            key={index}
                            message={message}
                            onMessageDelete={handleDeleteMessages}
                            isLoading={isMessagesLoading}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
