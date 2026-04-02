ALTER TABLE "sources" ALTER COLUMN "type" TYPE text;--> statement-breakpoint
DROP TYPE "public"."source_type";--> statement-breakpoint
CREATE TYPE "public"."source_type" AS ENUM('file', 'url', 'text');--> statement-breakpoint
ALTER TABLE "sources" ALTER COLUMN "type" TYPE "public"."source_type" USING "type"::"public"."source_type";

