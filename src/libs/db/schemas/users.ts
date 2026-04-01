import {integer, pgTable, text, timestamp, uuid} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  tokensBalance: integer('tokens_balance').notNull().default(10),
  tokensUsed: integer('tokens_used').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
