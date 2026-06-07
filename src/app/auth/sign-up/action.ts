"use server";
import { createSession } from "@/lib/sessionCookies"; 
import { redirect } from "next/navigation";
import { z } from "zod"
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const signupSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: 'Invalid email address' }).trim(),
    password: z.string().min(8, { message: "Password must be at leat 8 characters" }).trim(),
    confirm: z.string().min(8, { message: "Password must be at leat 8 characters" }).trim(),
    terms: z.string(),
}).refine((data) => data.terms === 'on', {
    message: "You must accept the Terms of Service and Privacy Policy",
    path: ["terms"],   // error will show on the confirm field
});

export async function signup(prevState: any, formData: FormData) {
    const result = signupSchema.safeParse(Object.fromEntries(formData));

    if(!result.success) { return { errors: result.error.flatten().fieldErrors } }

    const { name, email, password, confirm } = result.data;

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if(!response.ok) {
        if (response.status === 409) {
            return { errors: { email: ["This email already exists."] } };
        }
        return { errors: { general: ["Something went wrong."] } };
    }

    await createSession(data.user.id.toString());

    redirect('/hr/dashboard');
}