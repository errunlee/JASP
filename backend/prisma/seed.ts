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
                latitude: 85.359929,
                longitude: 27.675253,
            },
            {
                name: "Madhyapur Thimi",
                latitude: 85.380945,
                longitude: 27.676560,
            },
            {
                name: "Gathaghar",
                latitude: 85.373718,
                longitude:27.675935,
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