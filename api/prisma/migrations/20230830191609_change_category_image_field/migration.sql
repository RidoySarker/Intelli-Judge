/*
  Warnings:

  - You are about to drop the column `courseImage` on the `course_categories` table. All the data in the column will be lost.
  - You are about to alter the column `marks` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `total_obtained_marks` on the `quiz_participators` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `course_image` to the `course_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course_categories` DROP COLUMN `courseImage`,
    ADD COLUMN `course_image` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `quiz` MODIFY `marks` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `quiz_participators` MODIFY `total_obtained_marks` DECIMAL NOT NULL;
