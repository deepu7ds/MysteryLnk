import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConfig } from "@/lib/dbConfig";
import { User } from "@/models/user.model";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: {
                    label: "username",
                    type: "text",
                    placeholder: "alan_turing",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<any> {
                await dbConfig();
                try {
                    const user = await User.findOne({
                        username: credentials.identifier,
                    });

                    if (!user) {
                        throw new Error("No user found with this username");
                    }
                    // if (!user.isVerified) {
                    //     throw new Error("Please verify your account first");
                    // }
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (!isPasswordCorrect) {
                        throw new Error("Incorrect password");
                    }
                    return user;
                } catch (error: any) {
                    throw new Error(error);
                }
            },
        }),
    ],
    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                // token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                // session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;
            }
            return session;
        },
    },
};
