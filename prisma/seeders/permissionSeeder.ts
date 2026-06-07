import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function permissionSeeder() {
    const permissionData = [
        // Manage Users (Superadmin only) 
        { name: "view:manage-users",   description: "View Manage Users page" },
        { name: "create:manage-users", description: "Create users" },
        { name: "update:manage-users", description: "Update users" },
        { name: "delete:manage-users", description: "Delete users" },

        // Manage Roles (Superadmin only)
        { name: "view:manage-roles",   description: "View Manage Roles page" },
        { name: "create:manage-roles", description: "Create roles" },
        { name: "update:manage-roles", description: "Update roles" },
        { name: "delete:manage-roles", description: "Delete roles" },

        // Dashboard (HR) 
        { name: "view:dashboard",      description: "View Dashboard page" },

        // Resumes (HR)
        { name: "view:resumes",        description: "View Resumes page" },
        { name: "create:resumes",      description: "Upload resumes" },
        { name: "update:resumes",      description: "Update resumes" },
        { name: "delete:resumes",      description: "Delete resumes" },

        // Candidates (HR)
        { name: "view:candidates",     description: "View Candidates page" },
        { name: "create:candidates",   description: "Create candidates" },
        { name: "update:candidates",   description: "Update candidates" },
        { name: "delete:candidates",   description: "Delete candidates" },

        // AI Assistant (HR) 
        { name: "view:ai-assistant",   description: "View AI Assistant page" },
        { name: "create:ai-assistant", description: "Use AI Assistant" },

        // Compare (HR)
        { name: "view:compare",        description: "View Compare page" },
        { name: "create:compare",      description: "Create comparisons" },

        // Profile (Applicant)
        { name: "view:profile",        description: "View own profile/resume" },
        { name: "update:profile",      description: "Update own profile/resume" },
    ];

    for (const p of permissionData) {
        await prisma.permission.upsert({
            where: { name: p.name },
            update: {},
            create: p
        });
    }

    console.log(`${permissionData.length} permissions seeded`);
}

permissionSeeder()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

/* run: npx tsx prisma/seeders/permissionSeeder.ts */