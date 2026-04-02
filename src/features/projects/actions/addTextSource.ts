'use server';

import { db } from '@/libs/db/db';
import { sources } from '@/libs/db/schemas/sources';
import { createClient } from '@/libs/supabase/server';
import { publishProcessJob } from '@/libs/qstash/jobs';
import { revalidatePath } from 'next/cache';
import { checkAndSpendTokens, TOKEN_COSTS } from '@/libs/db/tokens';

export async function addTextSource(projectId: string, text: string, name?: string): Promise<{ error: string } | void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const MAX_TEXT_LENGTH = 10_000;
  if (text.length > MAX_TEXT_LENGTH) throw new Error('Text exceeds the 10,000 character limit');

  const tokenResult = await checkAndSpendTokens(user.id, TOKEN_COSTS.text, `Text processing: ${name || 'Untitled text'}`);
  if (!tokenResult.success) return { error: tokenResult.error };

  // processText reads text content from source.url (shared column convention)
  const [source] = await db
    .insert(sources)
    .values({
      projectId,
      userId: user.id,
      type: 'text',
      name: name?.trim() || 'Untitled text',
      url: text,
      status: 'pending',
    })
    .returning({ id: sources.id });

  await publishProcessJob(source.id);

  revalidatePath(`/projects/${projectId}`);
}
