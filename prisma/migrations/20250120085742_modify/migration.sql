/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Category` table. All the data in the column will be lost.
  - Made the column `description` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emergency` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_userId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "emergency" SET NOT NULL;
