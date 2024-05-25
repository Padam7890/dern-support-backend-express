-- AlterTable
ALTER TABLE `quotation` ADD COLUMN `status` ENUM('Pending', 'Accepted', 'Rejected') NOT NULL DEFAULT 'Pending';
