/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Admin` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `desciption` TEXT NULL;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `createdAt`;
