'use server'

import { db } from '@/libs/db/db'
import { sources } from '@/libs/db/schemas/sources'
import { eq } from 'drizzle-orm'
import { createAdminClient } from '@/libs/supabase/admin'
import { deleteFile } from '@/libs/supabase/files'
import { revalidatePath } from 'next/cache'

export async function deleteSource(sourceId: string, projectId: string): Promise<void> {
  const [source] = await db.select().from(sources).where(eq(sources.id, sourceId))
  if (!source) return

  if (source.type === 'file' && source.storagePath) {
    await deleteFile(createAdminClient(), source.storagePath)
  }

  await db.delete(sources).where(eq(sources.id, sourceId))

  revalidatePath(`/projects/${projectId}`)
}
