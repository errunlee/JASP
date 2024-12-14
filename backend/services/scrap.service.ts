// import { PrismaClient, type ScrapProduct } from '@prisma/client';
// import { PaginationParams } from '../interfaces/pagination-params.interface';

// const prisma = new PrismaClient();

// export const getAllScrapProducts = async ({
//     page,
//     limit
// }: PaginationParams): Promise<ScrapProduct[]> => {
//     const offset = (page - 1) * limit;
//     const scrapProducts = await prisma.scrapProduct.findMany({
//         skip: offset,
//         take: limit
//     });
//     return scrapProducts;
// }

// export const getScrapProductById = async (scrapProductId: number): Promise<ScrapProduct | null> => {
//     const scrapProduct = await prisma.scrapProduct.findUnique({
//         where: { id: scrapProductId }
//     });
//     return scrapProduct;
// }

// export const createScrapProduct = async (scrapProductData: any): Promise<ScrapProduct> => {
//     const newScrapProduct = await prisma.scrapProduct.create({
//         data: {
//             type: scrapProductData.type,
//             price: scrapProductData.price,
//             details: scrapProductData.details,
//             dealerId: scrapProductData.dealerId,
//             image: scrapProductData.image // to fix
//         }
//     });
//     return newScrapProduct;
// }

// export const updateScrapProduct = async (
//     scrapProductId: number,
//     scrapProductData: any
// ): Promise<ScrapProduct | null> => {
//     const updatedScrapProduct = await prisma.scrapProduct.update({
//         where: { id: scrapProductId },
//         data: {
//             type: scrapProductData.type,
//             price: scrapProductData.price,
//             details: scrapProductData.details,
//             dealerId: scrapProductData.dealerId,
//             image: scrapProductData.image // to fix
//         }
//     });
//     return updatedScrapProduct;
// }

// export const deleteScrapProduct = async (scrapProductId: number): Promise<ScrapProduct | null> => {
//     const deletedScrapProduct = await prisma.scrapProduct.delete({
//         where: { id: scrapProductId }
//     });
//     return deletedScrapProduct;
// }

// export const getScrapProductsByDealerId = async (dealerId: number): Promise<ScrapProduct[]> => {
//     const scrapProducts = await prisma.scrapProduct.findMany({
//         where: { 
             
//         }
//     });
//     return scrapProducts;
// }