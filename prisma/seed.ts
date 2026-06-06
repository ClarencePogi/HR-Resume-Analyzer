import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"; // ← this is correct

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });
async function seed() {
    await prisma.user.createMany({
        data: [
            { name: 'rimuru', email: 'rimuru@gmail.com' },
            { name: 'test', email: 'test@gmail.com' },
        ]
    });
}

seed().then(() => prisma.$disconnect());



 /* run this command "npx tsx prisma/seed.ts" to seed the user model */