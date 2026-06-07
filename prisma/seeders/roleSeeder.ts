import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function roleSeeder() {
    // Create  Roles
    const superadminRole = await prisma.role.upsert({
        where: { name: "SUPERADMIN" },
        update: {},
        create: { name: "SUPERADMIN", description: "Full access to everything" }
    });

    const hrRole = await prisma.role.upsert({
        where: { name: "HR" },
        update: {},
        create: { name: "HR", description: "Access to HR tools" }
    });

    const applicantRole = await prisma.role.upsert({
        where: { name: "APPLICANT" },
        update: {},
        create: { name: "APPLICANT", description: "Access to own profile only" }
    });

    console.log("Roles seeded");

    // Fetch all permissions
    const permissions = await prisma.permission.findMany();

    if (permissions.length === 0) {
        console.error("No permissions found. Run permissionSeeder first:");
        console.error("npx tsx prisma/seeders/permissionSeeder.ts");
        process.exit(1);
    }

    // Define permissions per role
    const superadminPermissions = permissions.map(p => p.name); // all permissions

    const hrPermissions = [
        "view:dashboard",
        "view:resumes",      "create:resumes",      "update:resumes",      "delete:resumes",
        "view:candidates",   "create:candidates",   "update:candidates",   "delete:candidates",
        "view:ai-assistant", "create:ai-assistant",
        "view:compare",      "create:compare",
    ];

    const applicantPermissions = [
        "view:profile",
        "update:profile",
    ];

    // Assign Permissions to Roles
    const assignPermissions = async (roleId: number, names: string[]) => {
        for (const name of names) {
            const permission = permissions.find(p => p.name === name);
            if (!permission) continue;
            await prisma.rolePermission.upsert({
                where: { roleId_permissionId: { roleId, permissionId: permission.id } },
                update: {},
                create: { roleId, permissionId: permission.id }
            });
        }
    };

    await assignPermissions(superadminRole.id, superadminPermissions);
    await assignPermissions(hrRole.id, hrPermissions);
    await assignPermissions(applicantRole.id, applicantPermissions);

    console.log("Role permissions assigned");
    console.log("Role seeding complete!");
}

roleSeeder()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

/* run: npx tsx prisma/seeders/roleSeeder.ts */