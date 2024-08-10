import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verfiyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: "deepanshu.9dd@gmail.com",
            to: email,
            subject: "Verification Email",
            react: VerificationEmail({ username, otp: verfiyCode }),
        });

        return {
            success: true,
            message: "Verification email sent successfully",
        };
    } catch (error) {
        console.log("Error sending verification email", error);
        return { success: false, message: "Failed to send verification email" };
    }
}
