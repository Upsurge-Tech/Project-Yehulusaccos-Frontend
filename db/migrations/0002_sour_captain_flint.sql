-- CREATE TABLE `article` (
-- 	`id` int AUTO_INCREMENT NOT NULL,
-- 	`title` varchar(50) NOT NULL,
-- 	`thumbnail` text NOT NULL,
-- 	-- `created_at` timestamp NOT NULL DEFAULT (now()),
-- 	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP()),
-- 	CONSTRAINT `article_id` PRIMARY KEY(`id`)
-- );

-- some how, db says its not a valid syntax. Maybe version issues since its in 5... but the latest ones are 8...
CREATE TABLE `article` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`title` varchar(50) NOT NULL,
	`thumbnail` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

-- statement-breakpoint
CREATE TABLE `content` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`article_id` int NOT NULL,
	`type` enum('heading','paragraph','image','youtube') NOT NULL,
	`data` text NOT NULL,
	`alt` text,
	FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE cascade
);
-- statement-breakpoint
-- ALTER TABLE `content` ADD CONSTRAINT `content_article_id_article_id_fk` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE no action ON UPDATE no action;