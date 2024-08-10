"use client";

import { useToast } from "@/components/ui/use-toast";
import { verifySchema } from "@/schemas/verify.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import * as z from "zod";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";

const Verify = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();
    const params = useParams<{ username: string }>();
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`/api/verify-code`, {
                username: params.username,
                code: data.code,
            });

            toast({
                title: "Success",
                description: response.data.message,
            });

            router.replace("/sign-in");
        } catch (error) {
            console.log("error in code verificatoin", error);
            const axiosError = error as AxiosError<ApiError>;
            let errorMessage = axiosError.response?.data.message;
            toast({
                title: "Verification failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <>
            <div className="flex justify-center items-center h-[100svh] p-4">
                <div className="border-2 border-gray-200 p-10 rounded-md w-full max-w-md shadow-md flex flex-col justify-center items-center">
                    <div className=" mb-5 text-center">
                        <h1 className="text-3xl mb-1 font-bold">
                            Verify Your Account
                        </h1>

                        <p className="text-slate-400">
                            Enter the verification code sent on your email
                        </p>
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className=" space-y-6 "
                        >
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputOTP maxLength={5} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />{" "}
                            <div className="text-center">
                                {isSubmitting ? (
                                    <Button disabled>
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6"
                                    >
                                        Verify
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Verify;
