import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "../globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

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
        <html lang="en">
            <AuthProvider>
                <body className={roboto.className}>
                    {children}
                    <Toaster />
                </body>
            </AuthProvider>
        </html>
    );
}
