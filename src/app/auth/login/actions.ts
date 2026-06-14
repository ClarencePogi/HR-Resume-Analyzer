"use server";
import { createSession, deleteSession } from "@/lib/sessionCookies"; 
import { redirect } from "next/navigation";
import { z } from "zod"
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).trim(),
    password: z.string().min(8, { message: "Password must be at leat 8 characters" }).trim()
});

export async function login(prevState: any, formData: FormData) {
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if(!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const { email, password } = result.data;
    const user = await prisma.user.findUnique({ where: { email } });

    if(!user) {
        return {
            errors: {
                email: ["Invalid email or password."]
            }
        }
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid) {
        return {
            errors: {
                email: ["Invalid email or password."]
            }
        }
    }

    await createSession(user.id.toString(), user.fullySetup);
    
    redirect('/hr/dashboard');
}

export async function logout() {
    await deleteSession();
    redirect('/auth/login');
}