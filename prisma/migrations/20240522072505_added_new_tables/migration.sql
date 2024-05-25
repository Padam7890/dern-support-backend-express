/*
  Warnings:

  - You are about to drop the column `repairJobId` on the `dailyjob` table. All the data in the column will be lost.
  - You are about to drop the column `supportRequestId` on the `repairjob` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `dailyjob` DROP FOREIGN KEY `DailyJob_repairJobId_fkey`;

-- DropForeignKey
ALTER TABLE `repairjob` DROP FOREIGN KEY `RepairJob_supportRequestId_fkey`;

-- AlterTable
ALTER TABLE `dailyjob` DROP COLUMN `repairJobId`;

-- AlterTable
ALTER TABLE `repairjob` DROP COLUMN `supportRequestId`,
    ADD COLUMN `dailyJobId` INTEGER NULL;

-- AlterTable
ALTER TABLE `supportrequest` ADD COLUMN `repairJobId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Quotation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DECIMAL(65, 30) NULL,
    `status` ENUM('Pending', 'OK', 'Rejected') NOT NULL DEFAULT 'Pending',
    `sparePartId` INTEGER NULL,
    `supportRequestId` INTEGER NOT NULL,

    UNIQUE INDEX `Quotation_sparePartId_key`(`sparePartId`),
    UNIQUE INDEX `Quotation_supportRequestId_key`(`supportRequestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SupportRequest` ADD CONSTRAINT `SupportRequest_repairJobId_fkey` FOREIGN KEY (`repairJobId`) REFERENCES `RepairJob`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quotation` ADD CONSTRAINT `Quotation_sparePartId_fkey` FOREIGN KEY (`sparePartId`) REFERENCES `SparePart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quotation` ADD CONSTRAINT `Quotation_supportRequestId_fkey` FOREIGN KEY (`supportRequestId`) REFERENCES `SupportRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RepairJob` ADD CONSTRAINT `RepairJob_dailyJobId_fkey` FOREIGN KEY (`dailyJobId`) REFERENCES `DailyJob`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
