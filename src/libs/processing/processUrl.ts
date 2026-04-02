import { MarkdownTextSplitter } from '@langchain/textsplitters';
import type { Source } from '@/libs/db/schemas/sources';

type UrlChunk = { content: string; chunkIndex: number }

const splitter = new MarkdownTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });

export async function processUrl(source: Source): Promise<UrlChunk[]> {
  const response = await fetch(`https://r.jina.ai/${source.url!}`);
  if (!response.ok) throw new Error(`Jina fetch failed: ${response.status} for ${source.url}`);

  const MAX_CHARS = 50_000;
  const rawMarkdown = await response.text();
  const markdown = rawMarkdown.length > MAX_CHARS ? rawMarkdown.slice(0, MAX_CHARS) : rawMarkdown;
  const docs = await splitter.createDocuments([markdown]);

  return docs.map((doc, i) => ({ content: doc.pageContent, chunkIndex: i }));
}
