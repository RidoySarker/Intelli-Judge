/*
  Warnings:

  - You are about to alter the column `marks` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `total_obtained_marks` on the `quiz_participators` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Made the column `user_id` on table `coding_challenges` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `coding_challenges` DROP FOREIGN KEY `coding_challenges_user_id_fkey`;

-- AlterTable
ALTER TABLE `coding_challenges` MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `quiz` MODIFY `marks` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `quiz_participators` MODIFY `total_obtained_marks` DECIMAL NOT NULL;

-- AddForeignKey
ALTER TABLE `coding_challenges` ADD CONSTRAINT `coding_challenges_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
