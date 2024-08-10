"use client";
import { User } from "next-auth";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MoonStar } from "lucide-react";
import { Sun } from "lucide-react";
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
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { data: session } = useSession();
    const user: User = session?.user as User;
    const router = useRouter();

    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isDarkMode) {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <nav className="p-4 md:p-6 w-full z-1000 bg-transparent">
            <div className="lg:container flex justify-between items-center">
                <h1 className="text-2xl font-bold flex">
                    <a href="/">MysteryLnk</a>
                </h1>
                <div className="flex gap-4">
                    <button onClick={toggleTheme} className="bg-transparent">
                        {isDarkMode ? <MoonStar /> : <Sun />}
                    </button>
                    {session ? (
                        <div className="flex space-x-6 items-center">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button>Logout</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you absolutely sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action will log you out of your
                                            account. You will need to log in
                                            again to access your dashboard.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => {
                                                signOut();
                                                router.replace("/");
                                            }}
                                        >
                                            Logout
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ) : (
                        <>
                            <Link href={"/sign-in"}>
                                <Button>Login</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
