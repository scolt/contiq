import {index, pgTable, text, timestamp, uuid} from 'drizzle-orm/pg-core';
import {users} from './users';

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}),
  name: text('name').notNull(),
  iconName: text('icon_name').notNull().default('folder'), // lucide icon name
  color: text('color').notNull().default('#6ee7b7'),    // hex color
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
  userIdx: index('projects_user_id_idx').on(t.userId),
}));

export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
