'use server';

import { db } from '@/libs/db/db';
import { sources } from '@/libs/db/schemas/sources';
import { eq } from 'drizzle-orm';
import { createAdminClient } from '@/libs/supabase/admin';
import { createSignedUrl } from '@/libs/supabase/files';

export async function getSourceSignedUrl(sourceId: string): Promise<string> {
  const [source] = await db.select().from(sources).where(eq(sources.id, sourceId));
  if (!source?.storagePath) throw new Error('Source not found or not a file');

  return createSignedUrl(createAdminClient(), source.storagePath);
}
