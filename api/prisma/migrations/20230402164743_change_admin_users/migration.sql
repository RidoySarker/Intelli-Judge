-- AlterTable
ALTER TABLE `admin_users` MODIFY `totp_secret` VARCHAR(16) NULL,
    MODIFY `last_login` VARCHAR(50) NULL;
