import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { extractText } from 'unpdf';
import { downloadFile } from '@/libs/supabase/files';
import { createAdminClient } from '@/libs/supabase/admin';
import type { Source } from '@/libs/db/schemas/sources';

type FileChunk = { content: string; pageNumber: number; chunkIndex: number }

const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });

export async function processFile(source: Source): Promise<FileChunk[]> {
  const fileBuffer = await downloadFile(createAdminClient(), source.storagePath!);
  const { text: pageTexts } = await extractText(new Uint8Array(fileBuffer), { mergePages: false });

  const rawChunks: FileChunk[] = [];
  let globalIndex = 0;

  for (let i = 0; i < pageTexts.length; i++) {
    const pageText = pageTexts[i].trim();
    if (!pageText) continue;
    const docs = await splitter.createDocuments([pageText]);
    for (const doc of docs) {
      rawChunks.push({ content: doc.pageContent, pageNumber: i + 1, chunkIndex: globalIndex++ });
    }
  }

  return rawChunks;
}
