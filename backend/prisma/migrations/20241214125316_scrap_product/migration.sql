/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ScrapProduct` table. All the data in the column will be lost.
  - You are about to drop the column `dealerId` on the `ScrapProduct` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `ScrapProduct` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `ScrapProduct` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `ScrapProduct` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ScrapProduct` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ScrapProduct` table. All the data in the column will be lost.
  - Added the required column `name` to the `ScrapProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ScrapProduct" DROP CONSTRAINT "ScrapProduct_dealerId_fkey";

-- AlterTable
ALTER TABLE "ScrapProduct" DROP COLUMN "createdAt",
DROP COLUMN "dealerId",
DROP COLUMN "details",
DROP COLUMN "image",
DROP COLUMN "isDeleted",
DROP COLUMN "type",
DROP COLUMN "updatedAt",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "ScrapProduct" ADD CONSTRAINT "ScrapProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
