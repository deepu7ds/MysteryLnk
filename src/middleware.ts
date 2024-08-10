import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXT_AUTH_SECRET,
    });
    const url = request.nextUrl;

    if (
        (token && url.pathname.startsWith("/sign-in")) ||
        url.pathname.startsWith("/sign-up")
    ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (!token && url.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/sign-in", "/sign-up", "/dashboard"],
};
