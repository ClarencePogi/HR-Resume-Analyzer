'use server';

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const MAX_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"]

const profileSubmitSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }).max(50, { message: "Name must less than 50 character." }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: 'Invalid email address' }).trim(),
    role: z.string().min(1, { message: "Role is required" }),
    company_name: z.string().min(1, { message: "Company name is required" }),
    company_email: z.string().min(1, { message: "Company email is required" }).email({ message: 'Invalid company email address' }).trim(),
    avatar: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_SIZE, { message: "Max size is 2MB" })
    .refine((file) => ALLOWED_TYPES.includes(file.type), { message: "Only JPG, PNG or GIF allowed" })
    .nullable()
    .optional(),
    
}).superRefine(async ({ role }, ctx) => {
    const exists = await prisma.role.findUnique({
        where: { id: Number(role) },
    })

    if (!exists && role) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Role does not exist",
            path: ["role"],
        })
    }
})

export async function submit(prevState: any, formData: FormData) {
    const result = await profileSubmitSchema.safeParseAsync(Object.fromEntries(formData));

    if(!result.success) { return { errors: result.error.flatten().fieldErrors } }

    return result.success
}