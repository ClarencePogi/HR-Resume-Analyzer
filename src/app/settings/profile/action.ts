'use server';

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { CurrentUser } from "@/lib/CurrentUser";
import { createSession } from "@/lib/sessionCookies";

const MAX_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"]

const profileSubmitSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }).max(50, { message: "Name must less than 50 character." }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: 'Invalid email address' }).trim(),
    role: z.string().min(1, { message: "Role is required" }),
    company_name: z.string().min(1, { message: "Company name is required" }),
    company_email: z.string().min(1, { message: "Company email is required" }).email({ message: 'Invalid company email address' }).trim(),
    // avatar: z
    // .instanceof(File)
    // .refine((file) => file.size <= MAX_SIZE, { message: "Max size is 2MB" })
    // .refine((file) => ALLOWED_TYPES.includes(file.type), { message: "Only JPG, PNG or GIF allowed" })
    // .nullable()
    // .optional(),
    
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
}).superRefine(async ({ email }, ctx) => {
    const currentUser = await new CurrentUser().init();
    const user = currentUser.getUser();

    const exist = await prisma.user.findUnique({
        where: { email: email }
    });

    if(exist && exist.id !== user?.id) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email is already in use by another account",
            path: ["email"],
        })
    }
})

export async function submit(prevState: any, formData: FormData) {
    const currentUser = await new CurrentUser().init();
    const user = currentUser.getUser();
    if (!user) {
        return { error: "Unauthorized" }
    }

    const result = await profileSubmitSchema.safeParseAsync(Object.fromEntries(formData));

    if(!result.success) { return { errors: result.error.flatten().fieldErrors } }

    const { name, email, role, company_name, company_email } = result.data;

    let company = await prisma.company.findUnique({
        where: { email: company_email }
    })

    if(!company) {
        const created_company = await prisma.company.create({
            data: {
                name: company_name,
                email: company_email
            }
        });

        company = created_company;
    }

    // Reset user role
    prisma.userRole.deleteMany({
        where: { userId: user.id }
    });

    const updated_user = await prisma.user.update({
        where: { id: user.id },
        data: {
            name: name,
            email: email,
            fullySetup: true,
            companyId: company.id,
            userRoles: {
                deleteMany: {}, // clears all existing UserRole rows for this user
                create: {
                    roleId: Number(role)
                }
            }
        }
    })

    await createSession(user.id.toString(), updated_user.fullySetup);
    
    return result.success
}