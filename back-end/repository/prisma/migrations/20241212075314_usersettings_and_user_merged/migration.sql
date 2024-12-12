/*
  Warnings:

  - You are about to drop the column `userSettingsId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userSettingsId_fkey";

-- DropIndex
DROP INDEX "User_userSettingsId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userSettingsId";

-- DropTable
DROP TABLE "UserSettings";
