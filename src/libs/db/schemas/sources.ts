import {index, integer, pgTable, text, timestamp, uuid} from 'drizzle-orm/pg-core'
import {sourceStatusEnum, sourceTypeEnum} from './enums'
import {projects} from './projects'
import {users} from './users'

export const sources = pgTable('sources', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').notNull().references(() => projects.id, {onDelete: 'cascade'}),
  userId: uuid('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}),
  type: sourceTypeEnum('type').notNull(),
  name: text('name').notNull(),         // file name or domain
  url: text('url'),                    // for type=url
  storagePath: text('storage_path'),           // for type=file
  status: sourceStatusEnum('status').notNull().default('pending'),
  errorMsg: text('error_msg'),
  chunksCount: integer('chunks_count').notNull().default(0), // updated after indexing
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
  projectIdx: index('sources_project_id_idx').on(t.projectId),
  userIdx: index('sources_user_id_idx').on(t.userId),
  statusIdx: index('sources_status_idx').on(t.status),
}))

export type Source = typeof sources.$inferSelect
export type NewSource = typeof sources.$inferInsert
