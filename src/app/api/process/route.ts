import { NextRequest, NextResponse } from 'next/server';
import { Receiver } from '@upstash/qstash';
import { processSource } from '@/libs/processing/processSource';

export const runtime = 'nodejs';

const receiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  const bodyText = await req.text();

  if (process.env.NODE_ENV !== 'development') {
    const isValid = await receiver.verify({
      signature: req.headers.get('upstash-signature') ?? '',
      body: bodyText,
    });
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  const { sourceId } = JSON.parse(bodyText) as { sourceId: string };

  try {
    await processSource(sourceId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
