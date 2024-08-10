import { User } from "@/models/user.model";
import { dbConfig } from "@/lib/dbConfig";

export async function POST(request: Request) {
    await dbConfig();
    // try {
    //     const { username, code } = await request.json();
    //     const decodedUsername = decodeURIComponent(username);

    //     const user = await User.findOne({ username: decodedUsername });
    //     if (!user) {
    //         return new Response(
    //             JSON.stringify({
    //                 success: false,
    //                 message: "Username not found",
    //             }),
    //             {
    //                 status: 500,
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );
    //     }

    //     const isCodeValid = user.verifyCode === code;

    //     if (!isCodeValid) {
    //         return new Response(
    //             JSON.stringify({
    //                 success: false,
    //                 message: "Verify code not correct",
    //             }),
    //             {
    //                 status: 400,
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );
    //     }

    //     const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    //     if (!isCodeNotExpired) {
    //         return new Response(
    //             JSON.stringify({
    //                 success: false,
    //                 message: "Verification code is expired please signup again",
    //             }),
    //             {
    //                 status: 400,
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );
    //     }

    //     user.isVerified = true;
    //     await user.save();

    //     return new Response(
    //         JSON.stringify({
    //             success: true,
    //             message: "user successfully verified",
    //         }),
    //         {
    //             status: 201,
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         }
    //     );
    // } catch (error) {
    //     console.log("Error while verifying code ", error);
    //     return new Response(
    //         JSON.stringify({
    //             success: false,
    //             message: "Error while verifying code",
    //         }),
    //         {
    //             status: 500,
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         }
    //     );
    // }
}
