import { Client } from '@upstash/qstash';
import { processSource } from '@/libs/processing/processSource';

export async function publishProcessJob(sourceId: string): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    // QStash can't reach localhost — call the processing logic directly.
    await processSource(sourceId);
    return;
  }

  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/process`;
  const qstash = new Client({ token: process.env.QSTASH_TOKEN! });
  await qstash.publishJSON({ url, body: { sourceId } });
}
