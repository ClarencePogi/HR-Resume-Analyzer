import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"; // ← this is correct
import { hash_password } from "@/lib/utils";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function seed() {
    await prisma.user.createMany({
        data: [
            { name: 'Superadmin', email: 'superadmin@example.com', password: await hash_password('password') },
            { name: 'Test HR', email: 'test@example.com', password: await hash_password('password') },
        ]
    });
}

seed().then(() => prisma.$disconnect());



 /* run this command "npx tsx prisma/seed.ts" to seed the user model */