import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
    try {
        const roles = await prisma.role.findMany();

        return NextResponse.json({ roles }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to get roles." },
            { status: 500 }
        );
    }
}