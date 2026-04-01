CREATE TYPE "public"."message_role" AS ENUM('user', 'assistant');--> statement-breakpoint
CREATE TYPE "public"."source_status" AS ENUM('pending', 'processing', 'ready', 'error');--> statement-breakpoint
CREATE TYPE "public"."source_type" AS ENUM('file', 'url');--> statement-breakpoint
CREATE TYPE "public"."token_tx_type" AS ENUM('grant', 'usage');--> statement-breakpoint
CREATE TABLE "chats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text DEFAULT 'New chat' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chunks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_id" uuid NOT NULL,
	"project_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"content" text NOT NULL,
	"embedding" vector(1536) NOT NULL,
	"source_url" text,
	"page_number" integer,
	"chunk_index" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chat_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "message_role" NOT NULL,
	"content" text NOT NULL,
	"sources_used" jsonb,
	"tokens_spent" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"icon_name" text DEFAULT 'folder' NOT NULL,
	"color" text DEFAULT '#6ee7b7' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"type" "source_type" NOT NULL,
	"name" text NOT NULL,
	"url" text,
	"storage_path" text,
	"status" "source_status" DEFAULT 'pending' NOT NULL,
	"error_msg" text,
	"chunks_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "token_transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"amount" integer NOT NULL,
	"type" "token_tx_type" NOT NULL,
	"description" text NOT NULL,
	"message_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"tokens_balance" integer DEFAULT 10 NOT NULL,
	"tokens_used" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chunks" ADD CONSTRAINT "chunks_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sources" ADD CONSTRAINT "sources_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sources" ADD CONSTRAINT "sources_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "token_transactions" ADD CONSTRAINT "token_transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "chats_project_id_idx" ON "chats" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "chats_user_id_idx" ON "chats" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "chunks_source_id_idx" ON "chunks" USING btree ("source_id");--> statement-breakpoint
CREATE INDEX "chunks_project_id_idx" ON "chunks" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "chunks_user_id_idx" ON "chunks" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "messages_chat_id_idx" ON "messages" USING btree ("chat_id");--> statement-breakpoint
CREATE INDEX "messages_user_id_idx" ON "messages" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "projects_user_id_idx" ON "projects" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sources_project_id_idx" ON "sources" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "sources_user_id_idx" ON "sources" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sources_status_idx" ON "sources" USING btree ("status");--> statement-breakpoint
CREATE INDEX "token_tx_user_id_idx" ON "token_transactions" USING btree ("user_id");
