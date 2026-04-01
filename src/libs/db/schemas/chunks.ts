import {index, integer, pgTable, text, timestamp, uuid} from 'drizzle-orm/pg-core'
import {vector} from './enums'
import {sources} from './sources'

// userId and projectId are denormalized — vector search avoids JOINs
export const chunks = pgTable('chunks', {
  id: uuid('id').primaryKey().defaultRandom(),
  sourceId: uuid('source_id').notNull().references(() => sources.id, {onDelete: 'cascade'}),
  projectId: uuid('project_id').notNull(),  // denormalized
  userId: uuid('user_id').notNull(),      // denormalized
  content: text('content').notNull(),
  embedding: vector('embedding', {dimensions: 1536} as any).notNull(),
  sourceUrl: text('source_url'),            // specific page / file path
  pageNumber: integer('page_number'),        // for PDF
  chunkIndex: integer('chunk_index').notNull(), // order within document
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
  // HNSW index is created via a separate SQL migration
  sourceIdx: index('chunks_source_id_idx').on(t.sourceId),
  projectIdx: index('chunks_project_id_idx').on(t.projectId),
  userIdx: index('chunks_user_id_idx').on(t.userId),
}))

export type Chunk = typeof chunks.$inferSelect
export type NewChunk = typeof chunks.$inferInsert
