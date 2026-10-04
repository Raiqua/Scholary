CREATE TABLE `goals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(160) NOT NULL,
	`mode` enum('save','earn') NOT NULL,
	`targetAmount` decimal(10,2) NOT NULL,
	`savedAmount` decimal(10,2) NOT NULL DEFAULT '0',
	`deadline` varchar(16),
	`imageUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `goals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hustles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(120) NOT NULL,
	`icon` varchar(8) NOT NULL,
	`color` varchar(16) NOT NULL,
	`hourlyGoal` decimal(10,2),
	`archived` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `hustles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `income_entries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`hustleId` int,
	`amount` decimal(10,2) NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'USD',
	`source` varchar(160) NOT NULL,
	`date` varchar(16) NOT NULL,
	`type` enum('income','expense') NOT NULL,
	`hours` decimal(6,2),
	`confidence` decimal(4,3),
	`origin` enum('screenshot','email','voice','manual') NOT NULL,
	`evidenceUrl` text,
	`verified` boolean NOT NULL DEFAULT false,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `income_entries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(120) NOT NULL,
	`ageRange` varchar(32),
	`state` varchar(2),
	`isDependent` boolean NOT NULL DEFAULT false,
	`isDemo` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `proof_links` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`dateRange` varchar(80) NOT NULL,
	`includedHustleIds` text NOT NULL,
	`signedToken` varchar(160) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`revoked` boolean NOT NULL DEFAULT false,
	CONSTRAINT `proof_links_id` PRIMARY KEY(`id`),
	CONSTRAINT `proof_links_signedToken_unique` UNIQUE(`signedToken`)
);
--> statement-breakpoint
CREATE TABLE `tax_jar_transfers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`date` varchar(16) NOT NULL,
	`note` varchar(240),
	CONSTRAINT `tax_jar_transfers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `goals` ADD CONSTRAINT `goals_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hustles` ADD CONSTRAINT `hustles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `income_entries` ADD CONSTRAINT `income_entries_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `income_entries` ADD CONSTRAINT `income_entries_hustleId_hustles_id_fk` FOREIGN KEY (`hustleId`) REFERENCES `hustles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `proof_links` ADD CONSTRAINT `proof_links_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tax_jar_transfers` ADD CONSTRAINT `tax_jar_transfers_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;