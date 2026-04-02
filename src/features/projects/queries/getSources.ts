import { db } from '@/libs/db/db';
import { sources } from '@/libs/db/schemas/sources';
import { createClient } from '@/libs/supabase/server';
import { eq, and } from 'drizzle-orm';
import type { ProjectSource } from '../components/ProjectSettings/ProjectSettings';

export async function getSources(projectId: string): Promise<ProjectSource[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const rows = await db
    .select()
    .from(sources)
    .where(and(eq(sources.projectId, projectId), eq(sources.userId, user.id)));

  return rows.map((s) => ({
    id: s.id,
    type: s.type,
    name: s.name,
    createdAt: s.createdAt,
    chunksCount: s.chunksCount,
    status: s.status,
    url: s.url ?? undefined,
  }));
}
