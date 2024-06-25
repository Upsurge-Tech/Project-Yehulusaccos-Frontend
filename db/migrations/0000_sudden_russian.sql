CREATE TABLE `admin` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(50) NOT NULL,
	`password` varchar(50) NOT NULL,
	CONSTRAINT `admin_id` PRIMARY KEY(`id`)
);
--- statement-breakpoint
CREATE TABLE `article_lang` (
	`lang_id` varchar(10) NOT NULL,
	`article_id` int NOT NULL
);
--- statement-breakpoint
CREATE TABLE `article` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`thumbnail` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `article_id` PRIMARY KEY(`id`)
);
--- statement-breakpoint
CREATE TABLE `content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lang_id` varchar(10) NOT NULL,
	`article_id` int NOT NULL,
	`type` enum('heading','paragraph','image','youtube') NOT NULL,
	`data` text NOT NULL,
	`alt` text,
	CONSTRAINT `content_id` PRIMARY KEY(`id`)
);
--- statement-breakpoint
CREATE TABLE `lang` (
	`id` varchar(10) NOT NULL,
	`label` varchar(50) NOT NULL,
	CONSTRAINT `lang_id` PRIMARY KEY(`id`)
);
--- statement-breakpoint
ALTER TABLE `article_lang` ADD CONSTRAINT `article_lang_lang_id_lang_id_fk` FOREIGN KEY (`lang_id`) REFERENCES `lang`(`id`) ON DELETE cascade ON UPDATE no action;--- statement-breakpoint
ALTER TABLE `article_lang` ADD CONSTRAINT `article_lang_article_id_article_id_fk` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE cascade ON UPDATE no action;--- statement-breakpoint
ALTER TABLE `content` ADD CONSTRAINT `content_lang_id_lang_id_fk` FOREIGN KEY (`lang_id`) REFERENCES `lang`(`id`) ON DELETE cascade ON UPDATE no action;--- statement-breakpoint
ALTER TABLE `content` ADD CONSTRAINT `content_article_id_article_id_fk` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE cascade ON UPDATE no action;