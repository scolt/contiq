'use server';

import { db } from '@/libs/db/db';
import { sources } from '@/libs/db/schemas/sources';
import { chunks } from '@/libs/db/schemas/chunks';
import { eq } from 'drizzle-orm';
import { publishProcessJob } from '@/libs/qstash/jobs';
import { revalidatePath } from 'next/cache';

export async function reindexSource(sourceId: string, projectId: string): Promise<void> {
  const [source] = await db.select().from(sources).where(eq(sources.id, sourceId));
  if (!source || source.type === 'file') throw new Error('Reindex not supported for file sources');

  await db.delete(chunks).where(eq(chunks.sourceId, sourceId));
  await db.update(sources)
    .set({ status: 'pending', chunksCount: 0, errorMsg: null })
    .where(eq(sources.id, sourceId));

  await publishProcessJob(sourceId);

  revalidatePath(`/projects/${projectId}`);
}
