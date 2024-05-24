/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `desciption` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `imageUrl`;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `desciption`,
    ADD COLUMN `description` TEXT NULL;

-- CreateTable
CREATE TABLE `ProductImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `imageUrl` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
