-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gameThumb` VARCHAR(191) NOT NULL,
    `gameName` VARCHAR(191) NOT NULL,
    `review` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Games` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cover_image` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `release_date` DATETIME(3) NOT NULL,
    `developer` VARCHAR(191) NOT NULL,
    `publisher` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
