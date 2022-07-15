/*
  Warnings:

  - You are about to alter the column `number` on the `cards` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(16)`.

*/
-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "number" SET DATA TYPE VARCHAR(16);
