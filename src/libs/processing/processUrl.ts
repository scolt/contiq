import { MarkdownTextSplitter } from '@langchain/textsplitters'
import type { Source } from '@/libs/db/schemas/sources'

type UrlChunk = { content: string; chunkIndex: number }

const splitter = new MarkdownTextSplitter({ chunkSize: 1000, chunkOverlap: 200 })

export async function processUrl(source: Source): Promise<UrlChunk[]> {
  const response = await fetch(`https://r.jina.ai/${source.url!}`)
  if (!response.ok) throw new Error(`Jina fetch failed: ${response.status} for ${source.url}`)

  const markdown = await response.text()
  const docs = await splitter.createDocuments([markdown])

  return docs.map((doc, i) => ({ content: doc.pageContent, chunkIndex: i }))
}
