import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findCheckpointByGeoSpatialCoor = async (latitude : number,longitude :number) => {
    return await prisma.checkpoint.findFirst({
        where: {
            latitude,
            longitude
        }
    });
};

export const findAllCheckpoints = async () => {
    return await prisma.checkpoint.findMany();
};
