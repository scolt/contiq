import { db } from '@/libs/db/db'
import { projects } from '@/libs/db/schemas/projects'
import { sources } from '@/libs/db/schemas/sources'
import { chats } from '@/libs/db/schemas/chats'
import { createClient } from '@/libs/supabase/server'
import { count, desc, eq } from 'drizzle-orm'

export type ProjectStatus = 'ready' | 'processing'

export interface Conversation {
  id: string
  projectId: string
  conversationName: string
  lastUpdatedAt: Date
}

export interface Project {
  id: string
  projectName: string
  resourceCount: number
  status: ProjectStatus
  iconName: string
  color: string
  conversations: Conversation[]
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const [rows, chatRows] = await Promise.all([
    db
      .select({
        id: projects.id,
        name: projects.name,
        iconName: projects.iconName,
        color: projects.color,
        resourceCount: count(sources.id),
      })
      .from(projects)
      .leftJoin(sources, eq(sources.projectId, projects.id))
      .where(eq(projects.userId, user.id))
      .groupBy(projects.id),

    db
      .select({
        id: chats.id,
        projectId: chats.projectId,
        title: chats.title,
        createdAt: chats.createdAt,
      })
      .from(chats)
      .where(eq(chats.userId, user.id))
      .orderBy(desc(chats.createdAt)),
  ])

  const chatsByProject = chatRows.reduce<Record<string, typeof chatRows>>((acc, c) => {
    if (!acc[c.projectId]) acc[c.projectId] = []
    acc[c.projectId].push(c)
    return acc
  }, {})

  return rows.map((p) => ({
    id: p.id,
    projectName: p.name,
    resourceCount: p.resourceCount,
    status: 'ready' as ProjectStatus,
    iconName: p.iconName,
    color: p.color,
    conversations: (chatsByProject[p.id] ?? []).map((c) => ({
      id: c.id,
      projectId: c.projectId,
      conversationName: c.title,
      lastUpdatedAt: c.createdAt,
    })),
  }))
}
