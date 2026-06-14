import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const protectedRoutes = [
    "/admin/manage-users",
    "/admin/manage-roles",
    "/hr/dashboard",
    "/hr/resumes",
    "/hr/candidates",
    "/hr/ai-assistant",
    "/hr/compare",
    "/applicant/profile",
];

const publicRoutes = ["/auth/login"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isPublicRoute = publicRoutes.includes(path);
    const isSetupRoute = path.startsWith("/settings/profile");

    const cookie = req.cookies.get("session")?.value;
    const session = await decrypt(cookie);

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Redirect on profile page to setup other information
    if (session?.userId && !session?.is_setup && !isSetupRoute) {
        return NextResponse.redirect(new URL("/settings/profile", req.url));
    }

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL("/hr/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};