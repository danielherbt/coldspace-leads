CREATE TABLE `contacts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(50),
	`service` enum('hvac','refrigeration','maintenance','emergency','other') NOT NULL,
	`message` text NOT NULL,
	`language` enum('en','es') NOT NULL DEFAULT 'en',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
