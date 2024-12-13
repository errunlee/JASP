/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Request` table. All the data in the column will be lost.
  - Added the required column `At` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "updatedAt",
ADD COLUMN     "At" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "UserCampaign" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "requestId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCampaign_userId_requestId_key" ON "UserCampaign"("userId", "requestId");

-- AddForeignKey
ALTER TABLE "UserCampaign" ADD CONSTRAINT "UserCampaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCampaign" ADD CONSTRAINT "UserCampaign_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
