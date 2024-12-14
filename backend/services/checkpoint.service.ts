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

export const findCheckpointById = async (id :number) => {
    return await prisma.checkpoint.findFirst({
        where: {
            id
        }
    });
};

export const findAllCheckpoints = async () => {
    return await prisma.checkpoint.findMany();
};

const saveCheckpoint = async(name:string,latitude:number,longitude:number) => {
    return await prisma.checkpoint.create({
        data : {
            name,
            latitude,
            longitude 
        }
    })
}

export default {
    saveCheckpoint
}