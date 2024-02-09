/*
  Warnings:

  - You are about to alter the column `marks` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `total_obtained_marks` on the `quiz_participators` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `quiz` MODIFY `marks` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `quiz_participators` MODIFY `total_obtained_marks` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `referral_code` VARCHAR(250) NULL;
