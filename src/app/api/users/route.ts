import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: 'test@gmail.com' },
        });

        if (!user) {
            return NextResponse.json({ error: "No user found." }, { status: 404 });
        }

        return NextResponse.json({ user });

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to fetch users." },
            { status: 500 }
        );
    }
};