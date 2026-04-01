'use server'

import { db } from '@/libs/db/db'
import { messages } from '@/libs/db/schemas/messages'
import { createClient } from '@/libs/supabase/server'
import { and, asc, eq } from 'drizzle-orm'
import type { ChatMessageData } from '@/features/chat/components/ChatWindow/components/ChatMessage/ChatMessage'

export async function getMessages(chatId: string): Promise<ChatMessageData[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const rows = await db
    .select()
    .from(messages)
    .where(and(eq(messages.chatId, chatId), eq(messages.userId, user.id)))
    .orderBy(asc(messages.createdAt))

  return rows.map((row) => ({
    id: row.id,
    role: row.role as 'user' | 'assistant',
    content: row.content,
    sources: row.sourcesUsed ?? undefined,
  }))
}
