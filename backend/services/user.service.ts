import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (data: { username: string; email: string; password: string; roles? : UserRole[]})  => {
    const { username, email, password, roles } = data;

    const userRoles = roles || [UserRole.REGULAR_USER];

    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password,
            roles: userRoles,
        }
    });
};

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email,
        }
    });
};


export const findUserByUsername = async (username: string) => {
    return await prisma.user.findUnique({
        where: {
            username,
        }
    });
};

export const findUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: {
            id,
        }
    });
};

export const findUsersByCheckpoint = async (checkpoint : number) => {
    return await prisma.user.findMany({
        where: {
            checkpoints: {
                some: {
                    id: checkpoint
                }
            }
        }
    });
};