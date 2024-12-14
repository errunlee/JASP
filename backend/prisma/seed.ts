import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash(
        "admin123",
        parseInt(process.env.BCRYPT_SALT_ROUNDS!)
    );
    const admin = await prisma.user.create({
        data: {
            username: "Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
        }
    })

    const checkpoints = await prisma.checkpoint.createMany({
        data: [
            {
                name: "Lokanthali",
                longitude: 27.675253,
                latitude: 85.359929
            },
            {
                name: "Madhyapur Thimi",
                longitude: 27.676560,
                latitude: 85.380945
            },
            {
                name: "Gathaghar",
                longitude:27.675935,
                latitude: 85.373718
            }
        ]
    })
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })