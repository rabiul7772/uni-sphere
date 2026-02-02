ALTER TABLE "classes" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "classes" DROP COLUMN "room_number";--> statement-breakpoint
ALTER TABLE "classes" DROP COLUMN "days_of_week";--> statement-breakpoint
ALTER TABLE "classes" DROP COLUMN "start_time";--> statement-breakpoint
ALTER TABLE "classes" DROP COLUMN "end_time";--> statement-breakpoint
ALTER TABLE "classes" DROP COLUMN "semester";