'use server'

import { db } from '@/libs/db/db'
import { chats } from '@/libs/db/schemas/chats'
import { createClient } from '@/libs/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Conversation } from '@/features/projects/queries/getProjects'

export async function createChat(projectId: string): Promise<Conversation> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const [chat] = await db
    .insert(chats)
    .values({ projectId, userId: user.id })
    .returning()

  revalidatePath('/conversations')

  return {
    id: chat.id,
    projectId: chat.projectId,
    conversationName: chat.title,
    lastUpdatedAt: chat.createdAt,
  }
}
