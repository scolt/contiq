import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import type { Source } from '@/libs/db/schemas/sources';

type TextChunk = { content: string; chunkIndex: number }

const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });

export async function processText(source: Source): Promise<TextChunk[]> {
  if (!source.url) throw new Error(`No text content for source: ${source.id}`);

  const docs = await splitter.createDocuments([source.url]);

  return docs.map((doc, i) => ({ content: doc.pageContent, chunkIndex: i }));
}
