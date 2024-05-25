/*
  Warnings:

  - You are about to alter the column `price` on the `sparepart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `quantity` on the `sparepart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `weight` on the `sparepart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `sparepart` MODIFY `price` DECIMAL(65, 30) NOT NULL,
    MODIFY `quantity` DECIMAL(65, 30) NOT NULL,
    MODIFY `weight` DECIMAL(65, 30) NOT NULL;
