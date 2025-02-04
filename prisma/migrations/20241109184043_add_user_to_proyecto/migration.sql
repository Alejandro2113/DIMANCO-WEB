/*
  Warnings:

  - Added the required column `userId` to the `Proyecto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proyecto" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
