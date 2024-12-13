import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findCheckpointByGeoSpatialCoor = async (latitude : number,longitude :number) => {
    return await prisma.checkpoint.findUnique({
        where: {
            latitude,
            longitude
        }
    });
};
