/*
  Warnings:

  - Added the required column `course_category_id` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `courses` ADD COLUMN `course_category_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_course_category_id_fkey` FOREIGN KEY (`course_category_id`) REFERENCES `course_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
