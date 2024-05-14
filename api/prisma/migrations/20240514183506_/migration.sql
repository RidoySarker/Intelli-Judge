/*
  Warnings:

  - You are about to alter the column `marks` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `total_obtained_marks` on the `quiz_participators` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `is_approved` to the `coding_challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `coding_challenges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coding_challenges` ADD COLUMN `is_approved` TEXT NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `quiz` MODIFY `marks` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `quiz_participators` MODIFY `total_obtained_marks` DECIMAL NOT NULL;

-- AddForeignKey
ALTER TABLE `coding_challenges` ADD CONSTRAINT `coding_challenges_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
