import {index, integer, jsonb, pgTable, text, timestamp, uuid} from 'drizzle-orm/pg-core';
import {messageRoleEnum} from './enums';
import {chats} from './chats';
import {users} from './users';

// sourcesUsed — array of objects used for answer generation
export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  chatId: uuid('chat_id').notNull().references(() => chats.id, {onDelete: 'cascade'}),
  userId: uuid('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}),
  role: messageRoleEnum('role').notNull(),
  content: text('content').notNull(),
  sourcesUsed: jsonb('sources_used').$type<{
    chunkId: string
    sourceId: string
    sourceType: 'file' | 'url' | 'text'
    sourceUrl: string | null
    sourceName: string
    pageNumber: number | null
  }[]>(),
  tokensSpent: integer('tokens_spent').notNull().default(0), // 1 for assistant, 0 for user
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
  chatIdx: index('messages_chat_id_idx').on(t.chatId),
  userIdx: index('messages_user_id_idx').on(t.userId),
}));

export type Message = typeof messages.$inferSelect
export type NewMessage = typeof messages.$inferInsert
