"use client";

import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/models/user.model";
import { messageSchema } from "@/schemas/message.schema";
import { ApiResponse } from "@/types/apiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function SendMessages() {
    const [isSending, setIsSending] = useState(false);
    const params = useParams<{ username: string }>();
    const form = useForm({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            content: "",
        },
    });
    const { toast } = useToast();

    const onSubmit = async (data: z.infer<typeof messageSchema>) => {
        console.log(data);
        setIsSending(true);
        try {
            const response = await axios.post(`/api/send-message`, {
                username: params.username,
                content: data.content,
            });
            toast({
                title: "Success",
                description: response.data.message,
            });
            form.reset();
        } catch (error) {
            console.log("error sending message", error);
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            toast({
                title: "Error sending message",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsSending(false);
        }
    };

    const handleInputClear = () => {
        form.reset();
    };
    return (
        <div className="flex flex-col items-center px-4">
            <h1 className="text-4xl font-bold my-10 text-center">
                Send Anonymous Message to{" "}
                <span className="text-blue-400 uppercase">
                    {params.username}
                </span>
            </h1>
            <div className="w-full lg:w-[60%]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <textarea
                                            className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                            placeholder="write message here"
                                            {...field}
                                            rows={5}
                                            maxLength={300}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="mt-4 text-center lg:text-start space-x-2 flex items-center">
                            {isSending ? (
                                <Button disabled>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    disabled={isSending}
                                    className="px-6"
                                >
                                    Send
                                </Button>
                            )}
                            <Button
                                type="reset"
                                onClick={handleInputClear}
                                className="px-6"
                                variant="destructive"
                            >
                                Clear
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-center">
                    Create Your Own{" "}
                    <span className="font-extrabold text-blue-400">Link</span>{" "}
                    and start receiving{" "}
                    <span className="font-extrabold text-blue-400">
                        Messages
                    </span>
                </h1>
                <Link href={"/sign-in"}>
                    <Button
                        variant="outline"
                        className="text-lg px-10 py-5 mt-4 "
                    >
                        Create Link
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
