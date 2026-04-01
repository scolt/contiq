import { NextRequest } from 'next/server'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createClient } from '@/libs/supabase/server'
import { db } from '@/libs/db/db'
import { messages } from '@/libs/db/schemas/messages'
import { chats } from '@/libs/db/schemas/chats'
import { and, eq } from 'drizzle-orm'
import { retrieveContextForChat } from '@/libs/llm/rag'

export const runtime = 'nodejs'

const SOURCES_SENTINEL = '\n\n__SOURCES__'

export async function POST(req: NextRequest): Promise<Response> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { chatId, projectId, message } = (await req.json()) as {
    chatId: string
    projectId: string
    message: string
  }

  const [chat] = await db
    .select({ id: chats.id })
    .from(chats)
    .where(and(eq(chats.id, chatId), eq(chats.userId, user.id)))

  if (!chat) {
    return new Response('Not found', { status: 404 })
  }

  await db.insert(messages).values({
    chatId,
    userId: user.id,
    role: 'user',
    content: message,
    tokensSpent: 0,
  })

  const { systemPrompt, sourcesUsed } = await retrieveContextForChat({
    message,
    projectId,
    userId: user.id,
  })

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message },
    ],
    onFinish: async ({ text }) => {
      try {
        await db.insert(messages).values({
          chatId,
          userId: user.id,
          role: 'assistant',
          content: text,
          sourcesUsed,
          tokensSpent: 1,
        })

        await db
          .update(chats)
          .set({ title: message.slice(0, 60) })
          .where(and(eq(chats.id, chatId), eq(chats.title, 'New Chat')))
      } catch (error) {
        console.error('Failed to save assistant message:', error)
      }
    },
  })

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      for await (const textPart of result.textStream) {
        controller.enqueue(encoder.encode(textPart))
      }
      controller.enqueue(encoder.encode(`${SOURCES_SENTINEL}${JSON.stringify(sourcesUsed)}`))
      controller.close()
    },
  })

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
