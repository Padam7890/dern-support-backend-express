/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Quotation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Quotation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `quotation` ADD COLUMN `productId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Quotation_productId_key` ON `Quotation`(`productId`);
