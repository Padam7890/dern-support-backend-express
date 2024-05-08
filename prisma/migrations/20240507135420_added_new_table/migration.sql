/*
  Warnings:

  - You are about to alter the column `status` on the `supportrequest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - A unique constraint covering the columns `[repairJobId]` on the table `DailyJob` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[supportRequestId]` on the table `RepairJob` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `repairJobId` to the `DailyJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dailyjob` ADD COLUMN `assignedToId` INTEGER NULL,
    ADD COLUMN `repairJobId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `knowledgebasearticle` MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `repairjob` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `productName` VARCHAR(191) NULL,
    ADD COLUMN `status` ENUM('Scheduled', 'InProgress', 'Completed') NOT NULL DEFAULT 'Scheduled';

-- AlterTable
ALTER TABLE `supportrequest` MODIFY `description` TEXT NOT NULL,
    MODIFY `status` ENUM('Submitted', 'Scheduled', 'InProgress', 'Completed') NOT NULL DEFAULT 'Submitted';

-- CreateIndex
CREATE UNIQUE INDEX `DailyJob_repairJobId_key` ON `DailyJob`(`repairJobId`);

-- CreateIndex
CREATE UNIQUE INDEX `RepairJob_supportRequestId_key` ON `RepairJob`(`supportRequestId`);

-- AddForeignKey
ALTER TABLE `DailyJob` ADD CONSTRAINT `DailyJob_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DailyJob` ADD CONSTRAINT `DailyJob_repairJobId_fkey` FOREIGN KEY (`repairJobId`) REFERENCES `RepairJob`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
