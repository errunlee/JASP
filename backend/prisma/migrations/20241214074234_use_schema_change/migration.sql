/*
  Warnings:

  - You are about to drop the `_CheckpointToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `checkpointId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CheckpointToUser" DROP CONSTRAINT "_CheckpointToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CheckpointToUser" DROP CONSTRAINT "_CheckpointToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "checkpointId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CheckpointToUser";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_checkpointId_fkey" FOREIGN KEY ("checkpointId") REFERENCES "Checkpoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
