/*
  Warnings:

  - You are about to drop the column `dailyJobId` on the `repairjob` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `sparepart` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to alter the column `quantity` on the `sparepart` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to alter the column `weight` on the `sparepart` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to drop the column `repairJobId` on the `supportrequest` table. All the data in the column will be lost.
  - You are about to drop the `quotation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[repairJobId]` on the table `DailyJob` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[supportRequestId]` on the table `RepairJob` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `repairJobId` to the `DailyJob` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supportRequestId` to the `RepairJob` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `quotation` DROP FOREIGN KEY `Quotation_sparePartId_fkey`;

-- DropForeignKey
ALTER TABLE `quotation` DROP FOREIGN KEY `Quotation_supportRequestId_fkey`;

-- DropForeignKey
ALTER TABLE `repairjob` DROP FOREIGN KEY `RepairJob_dailyJobId_fkey`;

-- DropForeignKey
ALTER TABLE `supportrequest` DROP FOREIGN KEY `SupportRequest_repairJobId_fkey`;

-- AlterTable
ALTER TABLE `dailyjob` ADD COLUMN `repairJobId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `repairjob` DROP COLUMN `dailyJobId`,
    ADD COLUMN `supportRequestId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `sparepart` MODIFY `price` INTEGER NOT NULL,
    MODIFY `quantity` INTEGER NOT NULL,
    MODIFY `weight` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `supportrequest` DROP COLUMN `repairJobId`;

-- DropTable
DROP TABLE `quotation`;

-- CreateIndex
CREATE UNIQUE INDEX `DailyJob_repairJobId_key` ON `DailyJob`(`repairJobId`);

-- CreateIndex
CREATE UNIQUE INDEX `RepairJob_supportRequestId_key` ON `RepairJob`(`supportRequestId`);

-- AddForeignKey
ALTER TABLE `RepairJob` ADD CONSTRAINT `RepairJob_supportRequestId_fkey` FOREIGN KEY (`supportRequestId`) REFERENCES `SupportRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DailyJob` ADD CONSTRAINT `DailyJob_repairJobId_fkey` FOREIGN KEY (`repairJobId`) REFERENCES `RepairJob`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
