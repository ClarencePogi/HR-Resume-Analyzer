/*
  Warnings:

  - You are about to drop the `UserCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCompany" DROP CONSTRAINT "UserCompany_companyId_fkey";

-- DropForeignKey
ALTER TABLE "UserCompany" DROP CONSTRAINT "UserCompany_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyId" INTEGER;

-- DropTable
DROP TABLE "UserCompany";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
