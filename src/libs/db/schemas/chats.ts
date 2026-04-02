import {index, pgTable, text, timestamp, uuid} from 'drizzle-orm/pg-core';
import {projects} from './projects';
import {users} from './users';

export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').notNull().references(() => projects.id, {onDelete: 'cascade'}),
  userId: uuid('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}),
  title: text('title').notNull().default('New Chat'), // auto-set from first message
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
  projectIdx: index('chats_project_id_idx').on(t.projectId),
  userIdx: index('chats_user_id_idx').on(t.userId),
}));

export type Chat = typeof chats.$inferSelect
export type NewChat = typeof chats.$inferInsert
