import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash_password } from "@/lib/utils";

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

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        let { name, email, password } = body;
        const hashed_password = await hash_password(password);

        const user = await prisma.user.create({
            data: { name, email, password: hashed_password }
        })

        return NextResponse.json({ user }, { status: 201 }); 
    } catch(error: any) {
        // Handle duplicate email
        if (error.code === "P2002") {
            return NextResponse.json(
                { error: "Email already exists." },
                { status: 409 }
            );
        }

        console.error(error);
        return NextResponse.json(
            { error: "Failed to create user." },
            { status: 500 }
        );
    }
}