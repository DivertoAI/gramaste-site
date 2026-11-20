import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { parseWaitlist } from '@/lib/waitlist';

export const runtime = 'nodejs';

// At most 5 submissions per address per minute. In memory, so use a shared store when running several servers.
const hits = new Map<string, number[]>();

function limited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < 60_000);
  hits.set(key, [...recent, now]);
  return recent.length >= 5;
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  if (limited(ip)) return NextResponse.json({ error: 'Too many tries. Please wait a minute.' }, { status: 429 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Send the form as JSON.' }, { status: 400 });
  }
  const parsed = parseWaitlist(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  // Development store: one JSON line per sign-up. Replace with the Gramaste API or a database before launch.
  const dir = path.join(process.cwd(), 'data');
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, 'waitlist.ndjson'), `${JSON.stringify({ ...parsed.entry, at: new Date().toISOString() })}\n`);
  return NextResponse.json({ ok: true }, { status: 201 });
}
