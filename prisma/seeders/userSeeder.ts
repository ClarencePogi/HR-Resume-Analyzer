import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash_password } from "@/lib/utils";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function seed() {
    // Fetch roles
    const superadminRole = await prisma.role.findUnique({ where: { name: "SUPERADMIN" } });
    const hrRole         = await prisma.role.findUnique({ where: { name: "HR" } });

    if (!superadminRole || !hrRole) {
        console.error("Roles not found. Run roleSeeder first:");
        console.error("npx tsx prisma/seeders/roleSeeder.ts");
        process.exit(1);
    }

    // Create Users 
    const superadmin = await prisma.user.upsert({
        where: { email: "superadmin@example.com" },
        update: {},
        create: {
            name: "Superadmin",
            email: "superadmin@example.com",
            password: await hash_password("password"),
            fullySetup: true
        }
    });

    const hrUser = await prisma.user.upsert({
        where: { email: "test@example.com" },
        update: {},
        create: {
            name: "Test HR",
            email: "test@example.com",
            password: await hash_password("password")
        }
    });

    console.log("Users seeded");

    // Assign Roles to Users
    await prisma.userRole.upsert({
        where: { userId_roleId: { userId: superadmin.id, roleId: superadminRole.id } },
        update: {},
        create: { userId: superadmin.id, roleId: superadminRole.id }
    });

    await prisma.userRole.upsert({
        where: { userId_roleId: { userId: hrUser.id, roleId: hrRole.id } },
        update: {},
        create: { userId: hrUser.id, roleId: hrRole.id }
    });

    console.log("User roles assigned");
    console.log("User seeding complete!");
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

/* run: npx tsx prisma/seeders/userSeeder.ts */