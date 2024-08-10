import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { dbConfig } from "@/lib/dbConfig";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    await dbConfig();

    try {
        let { username, email, password } = await request.json();
        username = username.toLowerCase();
        email = email.toLowerCase();

        const userWithUsername = await User.findOne({
            username,
            isVerified: true,
        });

        if (userWithUsername) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "User already exists with this username",
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        const verifyCode = Math.floor(10000 + Math.random() * 90000).toString();

        const userWithEmail = await User.findOne({ email });
        if (userWithEmail) {
            if (userWithEmail.isVerified) {
                return new Response(
                    JSON.stringify({
                        success: false,
                        message: "User already exists with this email",
                    }),
                    {
                        status: 400,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                userWithEmail.password = hashedPassword;
                userWithEmail.verifyCode = verifyCode;
                userWithEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await userWithEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: [],
            });

            await newUser.save();
        }

        const emailResponse = await sendVerificationEmail(
            username,
            email,
            verifyCode
        );

        if (!emailResponse.success) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: emailResponse.message,
                }),
                {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message:
                    "User registered successfully. Please verify your email",
            }),
            {
                status: 201,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.log("Error registering user: ", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error registering user",
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
