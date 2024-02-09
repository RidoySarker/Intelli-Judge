/*
  Warnings:

  - You are about to alter the column `marks` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `total_obtained_marks` on the `quiz_participators` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the `courseLearn` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `courseLearn` DROP FOREIGN KEY `courseLearn_course_id_fkey`;

-- AlterTable
ALTER TABLE `quiz` MODIFY `marks` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `quiz_participators` MODIFY `total_obtained_marks` DECIMAL NOT NULL;

-- DropTable
DROP TABLE `courseLearn`;

-- CreateTable
CREATE TABLE `course_learn` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `course_learn` ADD CONSTRAINT `course_learn_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
