import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'
import { db } from '@/libs/db/db'
import { chunks } from '@/libs/db/schemas/chunks'
import { sources } from '@/libs/db/schemas/sources'
import { and, eq, sql } from 'drizzle-orm'

export type SourceUsed = {
  chunkId: string
  sourceUrl: string | null
  sourceName: string
  pageNumber: number | null
}

export async function retrieveContextForChat(params: {
  message: string
  projectId: string
  userId: string
}): Promise<{ systemPrompt: string; sourcesUsed: SourceUsed[] }> {
  const { message, projectId, userId } = params

  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: message,
  })
  const vectorStr = `[${embedding.join(',')}]`

  const topChunks = await db
    .select({
      id: chunks.id,
      content: chunks.content,
      sourceId: chunks.sourceId,
      sourceUrl: chunks.sourceUrl,
      pageNumber: chunks.pageNumber,
      sourceName: sources.name,
    })
    .from(chunks)
    .innerJoin(sources, eq(sources.id, chunks.sourceId))
    .where(and(eq(chunks.projectId, projectId), eq(chunks.userId, userId)))
    .orderBy(sql`chunks.embedding <=> ${vectorStr}::vector`)
    .limit(8)

  const seen = new Set<string>()
  const sourcesUsed: SourceUsed[] = []
  for (const chunk of topChunks) {
    const key = `${chunk.sourceId}-${chunk.pageNumber ?? 0}`
    if (!seen.has(key)) {
      seen.add(key)
      sourcesUsed.push({
        chunkId: chunk.id,
        sourceUrl: chunk.sourceUrl,
        sourceName: chunk.sourceName,
        pageNumber: chunk.pageNumber,
      })
    }
  }

  const context = topChunks
    .map(
      (chunk, index) =>
        `[${index + 1}] (${chunk.sourceName}${chunk.pageNumber ? `, page ${chunk.pageNumber}` : ''})\n${chunk.content}`,
    )
    .join('\n\n---\n\n')

  const systemPrompt =
    topChunks.length > 0
      ? `You are a helpful AI assistant that answers questions based on the provided project documents.
Use the following document excerpts to answer the user's question. If the answer cannot be found in the provided context, say so honestly.
Answer in the same language as the user's question. Be thorough and detailed.

Context:
${context}`
      : `You are a helpful AI assistant. No relevant documents were found for this project yet.
Answer the user's question to the best of your ability.
Answer in the same language as the user's question.`

  return { systemPrompt, sourcesUsed }
}
