/*
  Warnings:

  - Added the required column `last_login` to the `admin_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin_users` ADD COLUMN `last_login` VARCHAR(50) NOT NULL;
