ALTER TABLE `content` MODIFY COLUMN `lang_id` enum('en','am') NOT NULL;-- statement-breakpoint
ALTER TABLE `lang` MODIFY COLUMN `id` enum('en','am') NOT NULL;-- statement-breakpoint
ALTER TABLE `article_content` ADD `type` enum('heading','paragraph','image','youtube','title') NOT NULL;-- statement-breakpoint
ALTER TABLE `content` DROP COLUMN `type`;