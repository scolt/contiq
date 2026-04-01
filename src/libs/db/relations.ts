import { relations } from 'drizzle-orm'
import { chats } from './schemas/chats'
import { chunks } from './schemas/chunks'
import { messages } from './schemas/messages'
import { projects } from './schemas/projects'
import { sources } from './schemas/sources'
import { tokenTransactions } from './schemas/tokenTransactions'
import { users } from './schemas/users'

export const usersRelations = relations(users, ({ many }) => ({
  projects:     many(projects),
  chats:        many(chats),
  messages:     many(messages),
  transactions: many(tokenTransactions),
}))

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user:    one(users, { fields: [projects.userId], references: [users.id] }),
  sources: many(sources),
  chats:   many(chats),
}))

export const sourcesRelations = relations(sources, ({ one, many }) => ({
  project: one(projects, { fields: [sources.projectId], references: [projects.id] }),
  user:    one(users,    { fields: [sources.userId],    references: [users.id] }),
  chunks:  many(chunks),
}))

export const chunksRelations = relations(chunks, ({ one }) => ({
  source: one(sources, { fields: [chunks.sourceId], references: [sources.id] }),
}))

export const chatsRelations = relations(chats, ({ one, many }) => ({
  project:  one(projects, { fields: [chats.projectId], references: [projects.id] }),
  user:     one(users,    { fields: [chats.userId],    references: [users.id] }),
  messages: many(messages),
}))

export const messagesRelations = relations(messages, ({ one }) => ({
  chat: one(chats, { fields: [messages.chatId], references: [chats.id] }),
  user: one(users, { fields: [messages.userId], references: [users.id] }),
}))

export const tokenTransactionsRelations = relations(tokenTransactions, ({ one }) => ({
  user:    one(users,    { fields: [tokenTransactions.userId],    references: [users.id] }),
  message: one(messages, { fields: [tokenTransactions.messageId], references: [messages.id] }),
}))
