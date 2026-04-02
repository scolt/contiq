import { db } from '@/libs/db/db';
import { projects } from '@/libs/db/schemas/projects';
import { sources } from '@/libs/db/schemas/sources';
import { chats } from '@/libs/db/schemas/chats';
import { createClient } from '@/libs/supabase/server';
import { count, desc, eq, max } from 'drizzle-orm';

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

export interface ProjectRow {
  id: string
  name: string
  iconName: string
  color: string
  createdAt: Date
  sourcesCount: number
  chatsCount: number
  lastSourceAdded: Date | null
  lastChatAt: Date | null
  lastActive: Date | null
}

export interface ProjectsPageData {
  projects: ProjectRow[]
  totalSources: number
  totalChats: number
  userEmail: string
}

export async function getProjectsPageData(): Promise<ProjectsPageData> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { projects: [], totalSources: 0, totalChats: 0, userEmail: '' };
  }

  const [projectsWithSources, chatStats] = await Promise.all([
    db
      .select({
        id: projects.id,
        name: projects.name,
        iconName: projects.iconName,
        color: projects.color,
        createdAt: projects.createdAt,
        sourcesCount: count(sources.id),
        lastSourceAdded: max(sources.createdAt),
      })
      .from(projects)
      .leftJoin(sources, eq(sources.projectId, projects.id))
      .where(eq(projects.userId, user.id))
      .groupBy(projects.id),

    db
      .select({
        projectId: chats.projectId,
        chatsCount: count(chats.id),
        lastChatAt: max(chats.createdAt),
      })
      .from(chats)
      .where(eq(chats.userId, user.id))
      .groupBy(chats.projectId),
  ]);

  const chatStatsByProject = new Map(chatStats.map((c) => [c.projectId, c]));

  const projectRows: ProjectRow[] = projectsWithSources.map((p) => {
    const chatData = chatStatsByProject.get(p.id);
    const lastSourceAdded = p.lastSourceAdded ?? null;
    const lastChatAt = chatData?.lastChatAt ?? null;
    let lastActive: Date | null = null;
    if (lastSourceAdded && lastChatAt) {
      lastActive = new Date(Math.max(lastSourceAdded.getTime(), lastChatAt.getTime()));
    } else {
      lastActive = lastSourceAdded ?? lastChatAt;
    }

    return {
      id: p.id,
      name: p.name,
      iconName: p.iconName,
      color: p.color,
      createdAt: p.createdAt,
      sourcesCount: p.sourcesCount,
      chatsCount: chatData?.chatsCount ?? 0,
      lastSourceAdded,
      lastChatAt,
      lastActive,
    };
  });

  projectRows.sort((a, b) => {
    if (!a.lastActive && !b.lastActive) return 0;
    if (!a.lastActive) return 1;
    if (!b.lastActive) return -1;
    return b.lastActive.getTime() - a.lastActive.getTime();
  });

  return {
    projects: projectRows,
    totalSources: projectRows.reduce((sum, p) => sum + p.sourcesCount, 0),
    totalChats: projectRows.reduce((sum, p) => sum + p.chatsCount, 0),
    userEmail: user.email ?? '',
  };
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

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
  ]);

  const chatsByProject = chatRows.reduce<Record<string, typeof chatRows>>((acc, c) => {
    if (!acc[c.projectId]) acc[c.projectId] = [];
    acc[c.projectId].push(c);
    return acc;
  }, {});

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
  }));
}
