/*
  Warnings:

  - You are about to drop the column `isCorrect` on the `participator_progress` table. All the data in the column will be lost.
  - You are about to alter the column `marks` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `total_obtained_marks` on the `quiz_participators` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `is_correct` to the `participator_progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `participator_progress` DROP COLUMN `isCorrect`,
    ADD COLUMN `is_correct` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `quiz` MODIFY `marks` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `quiz_participators` MODIFY `total_obtained_marks` DECIMAL NOT NULL;
