/*
  Warnings:

  - The values [Scheduled,InProgress,Completed] on the enum `SupportRequest_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `repairjob` ADD COLUMN `sparePartId` INTEGER NULL;

-- AlterTable
ALTER TABLE `supportrequest` MODIFY `status` ENUM('Submitted', 'Accepted', 'Rejected') NOT NULL DEFAULT 'Submitted';

-- CreateTable
CREATE TABLE `Quotation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DECIMAL(65, 30) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `supportRequestId` INTEGER NULL,

    UNIQUE INDEX `Quotation_supportRequestId_key`(`supportRequestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Quotation` ADD CONSTRAINT `Quotation_supportRequestId_fkey` FOREIGN KEY (`supportRequestId`) REFERENCES `SupportRequest`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RepairJob` ADD CONSTRAINT `RepairJob_sparePartId_fkey` FOREIGN KEY (`sparePartId`) REFERENCES `SparePart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
