import {index, integer, pgTable, text, timestamp, uuid} from 'drizzle-orm/pg-core'
import {tokenTxTypeEnum} from './enums'
import {users} from './users'

export const tokenTransactions = pgTable('token_transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}),
  amount: integer('amount').notNull(),       // + topup, - deduction
  type: tokenTxTypeEnum('type').notNull(),
  description: text('description').notNull(),
  messageId: uuid('message_id'),               // → messages.id (nullable)
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
  userIdx: index('token_tx_user_id_idx').on(t.userId),
}))

export type TokenTransaction = typeof tokenTransactions.$inferSelect
export type NewTokenTransaction = typeof tokenTransactions.$inferInsert
