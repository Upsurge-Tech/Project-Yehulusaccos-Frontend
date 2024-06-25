CREATE TABLE `article_content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`article_id` int NOT NULL,
	CONSTRAINT `article_content_id` PRIMARY KEY(`id`)
);
-- statement-breakpoint
ALTER TABLE `content` DROP FOREIGN KEY `content_article_id_article_id_fk`;
-- statement-breakpoint
ALTER TABLE `content` MODIFY COLUMN `type` enum('heading','paragraph','image','youtube','title') NOT NULL;--> statement-breakpoint
ALTER TABLE `content` ADD `content_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `article_content` ADD CONSTRAINT `article_content_article_id_article_id_fk` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `content` ADD CONSTRAINT `content_content_id_article_content_id_fk` FOREIGN KEY (`content_id`) REFERENCES `article_content`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `content` DROP COLUMN `article_id`;