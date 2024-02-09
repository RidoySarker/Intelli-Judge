/*
  Warnings:

  - You are about to drop the `CourseProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParticipatorProgess` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuizParticipator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuizQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubscribedCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CourseProgress` DROP FOREIGN KEY `CourseProgress_course_content_id_fkey`;

-- DropForeignKey
ALTER TABLE `CourseProgress` DROP FOREIGN KEY `CourseProgress_subscribed_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `ParticipatorProgess` DROP FOREIGN KEY `ParticipatorProgess_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `ParticipatorProgess` DROP FOREIGN KEY `ParticipatorProgess_quiz_id_fkey`;

-- DropForeignKey
ALTER TABLE `ParticipatorProgess` DROP FOREIGN KEY `ParticipatorProgess_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `QuizParticipator` DROP FOREIGN KEY `QuizParticipator_quiz_id_fkey`;

-- DropForeignKey
ALTER TABLE `QuizParticipator` DROP FOREIGN KEY `QuizParticipator_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `QuizQuestion` DROP FOREIGN KEY `QuizQuestion_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `QuizQuestion` DROP FOREIGN KEY `QuizQuestion_quiz_id_fkey`;

-- DropForeignKey
ALTER TABLE `SubscribedCourse` DROP FOREIGN KEY `SubscribedCourse_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `SubscribedCourse` DROP FOREIGN KEY `SubscribedCourse_user_id_fkey`;

-- DropTable
DROP TABLE `CourseProgress`;

-- DropTable
DROP TABLE `ParticipatorProgess`;

-- DropTable
DROP TABLE `Quiz`;

-- DropTable
DROP TABLE `QuizParticipator`;

-- DropTable
DROP TABLE `QuizQuestion`;

-- DropTable
DROP TABLE `SubscribedCourse`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `refered_by` INTEGER NOT NULL,
    `remaining_points` INTEGER NOT NULL,
    `totp_secret` VARCHAR(16) NULL,
    `last_login` VARCHAR(50) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscribed_courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,
    `subscribed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_progress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subscribed_course_id` INTEGER NOT NULL,
    `course_content_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quiz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quiz_title` TEXT NOT NULL,
    `marks` DECIMAL NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quiz_questions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quiz_id` INTEGER NOT NULL,
    `question_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quiz_participators` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quiz_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `total_obtained_marks` DECIMAL NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `participator_progress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quiz_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `question_id` INTEGER NOT NULL,
    `isCorrect` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `subscribed_courses` ADD CONSTRAINT `subscribed_courses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscribed_courses` ADD CONSTRAINT `subscribed_courses_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_progress` ADD CONSTRAINT `course_progress_subscribed_course_id_fkey` FOREIGN KEY (`subscribed_course_id`) REFERENCES `subscribed_courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_progress` ADD CONSTRAINT `course_progress_course_content_id_fkey` FOREIGN KEY (`course_content_id`) REFERENCES `course_contents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quiz_questions` ADD CONSTRAINT `quiz_questions_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quiz_questions` ADD CONSTRAINT `quiz_questions_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `course_questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quiz_participators` ADD CONSTRAINT `quiz_participators_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quiz_participators` ADD CONSTRAINT `quiz_participators_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participator_progress` ADD CONSTRAINT `participator_progress_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participator_progress` ADD CONSTRAINT `participator_progress_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participator_progress` ADD CONSTRAINT `participator_progress_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `course_questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
