'use server';

import { db } from '@/libs/db/db';
import { chats } from '@/libs/db/schemas/chats';
import { createClient } from '@/libs/supabase/server';
import { revalidatePath } from 'next/cache';
import { and, eq } from 'drizzle-orm';

export async function deleteChat(chatId: string): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  await db
    .delete(chats)
    .where(and(eq(chats.id, chatId), eq(chats.userId, user.id)));

  revalidatePath('/projects');
}
