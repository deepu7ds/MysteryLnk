import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "../globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";

const roboto = Kanit({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
    title: "MysteryLnk",
    description: "Send anonymous messages to anyone",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark overflow-x-hidden">
            <AuthProvider>
                <body
                    className={`${roboto.className} dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] overflow-x-hidden w-[100%]`}
                >
                    <Navbar />
                    {children}
                    <Toaster />
                </body>
            </AuthProvider>
        </html>
    );
}
