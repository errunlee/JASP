/*
  Warnings:

  - You are about to drop the column `At` on the `Request` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "At",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
