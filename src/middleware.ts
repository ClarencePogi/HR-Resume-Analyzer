import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const protectedRoutes = ["/hr/dashboard"];
const publicRoutes = ["/auth/login"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.includes(path);
    const isPuiblicRoute = publicRoutes.includes(path);

    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie);

    if(isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    if(isPuiblicRoute && session?.userId) {
        return NextResponse.redirect(new URL('/hr/dashboard', req.url));
    }

    return NextResponse.next();
}