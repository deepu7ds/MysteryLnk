"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDebounceValue, useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUp.schema";
import { ApiError } from "next/dist/server/api-utils";
import { ApiResponse } from "@/types/ApiResponse";
import { Loader2 } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import Link from "next/link";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameMessage, setUsernameMessage] = useState("");
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const debounced = useDebounceCallback(setUsername, 300);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const checkingUsernameUnique = async () => {
            setUsernameMessage("");
            if (username) {
                setIsCheckingUsername(true);
                try {
                    const response = await axios.get(
                        `/api/check-username-unique?username=${username}`
                    );
                    setUsernameMessage(response.data.message);
                } catch (error) {
                    const axiosError = error as AxiosError<ApiError>;
                    setUsernameMessage(
                        axiosError.response?.data.message ??
                            "error checking username"
                    );
                } finally {
                    setIsCheckingUsername(false);
                }
            }
        };
        checkingUsernameUnique();
    }, [username]);

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true);

        try {
            const response = await axios.post<ApiResponse>(
                "/api/sign-up",
                data
            );
            toast({
                title: "Success",

                description: response.data.message,
            });
            form.reset();
            router.replace(`verify/${username}`);
        } catch (error) {
            console.log("error in signup", error);
            const axiosError = error as AxiosError<ApiError>;
            let errorMessage = axiosError.response?.data.message;
            toast({
                title: "SignUp failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center h-[100svh] px-4">
                <div className="border-2 border-gray-200 px-4 py-10 lg:p-10 rounded-md w-full max-w-md shadow-md ">
                    <div className=" mb-5 text-center">
                        <h1 className="text-3xl mb-1 font-bold">
                            Create Account
                        </h1>

                        <p className="text-slate-400">
                            Fill out the form below to continue
                        </p>
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    placeholder="username"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        debounced(
                                                            e.target.value.toLowerCase()
                                                        );
                                                    }}
                                                />
                                                {isCheckingUsername && (
                                                    <Loader2 className="animate-spin absolute top-2 right-2 text" />
                                                )}
                                                {usernameMessage ===
                                                "username is available" ? (
                                                    <CircleCheck className="absolute top-2 right-2 text-green-400" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </FormControl>
                                        <p
                                            className={`text-sm ${usernameMessage === "username is available" ? "text-green-500 " : "text-red-500"}`}
                                        >
                                            {usernameMessage}
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="email"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="password"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setPassword(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                {password &&
                                                    (showPassword ? (
                                                        <Eye
                                                            className="absolute top-2 right-2 p-1 text-gray-500"
                                                            onClick={
                                                                togglePasswordVisibility
                                                            }
                                                        />
                                                    ) : (
                                                        <EyeOff
                                                            className="absolute top-2 right-2 p-1 text-gray-500"
                                                            onClick={
                                                                togglePasswordVisibility
                                                            }
                                                        />
                                                    ))}
                                            </div>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                        Sign Up
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                    <footer className="mt-4 text-center">
                        <p>
                            Already have an account?{" "}
                            <Link
                                className="text-blue-500"
                                href={"/sign-in"}
                                replace
                            >
                                Sign Up
                            </Link>
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Signup;
