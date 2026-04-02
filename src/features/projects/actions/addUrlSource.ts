'use server';

import { db } from '@/libs/db/db';
import { sources } from '@/libs/db/schemas/sources';
import { createClient } from '@/libs/supabase/server';
import { publishProcessJob } from '@/libs/qstash/jobs';
import { revalidatePath } from 'next/cache';
import { checkAndSpendTokens, TOKEN_COSTS } from '@/libs/db/tokens';

export async function addUrlSource(projectId: string, url: string, name?: string): Promise<{ error: string } | void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const tokenResult = await checkAndSpendTokens(user.id, TOKEN_COSTS.url, `URL processing: ${name || url}`);
  if (!tokenResult.success) return { error: tokenResult.error };

  let domain = url;
  try { domain = new URL(url).hostname; } catch { /* keep raw */ }

  const [source] = await db
    .insert(sources)
    .values({
      projectId,
      userId: user.id,
      type: 'url',
      name: name?.trim() || domain,
      url,
      status: 'pending',
    })
    .returning({ id: sources.id });

  await publishProcessJob(source.id);

  revalidatePath(`/projects/${projectId}`);
}
