export const ROLES = ['eater', 'kitchen', 'partner'] as const;
export type Role = (typeof ROLES)[number];

export const AREAS = [
  'Koramangala',
  'BTM Layout',
  'HSR Layout',
  'Indiranagar',
  'Domlur',
  'Jayanagar',
  'Somewhere else',
] as const;

export interface WaitlistEntry {
  readonly name: string;
  readonly phone: string;
  readonly area: string;
  readonly role: Role;
}

export type Parsed = { ok: true; entry: WaitlistEntry } | { ok: false; error: string };

/** Indian mobile number: 10 digits starting 6-9, with an optional +91 or 0 in front. */
export function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/[\s()-]/g, '');
  const match = /^(?:\+91|91|0)?([6-9]\d{9})$/.exec(digits);
  return match?.[1] ? `+91${match[1]}` : null;
}

/** Checks the sign-up form. Never trusts the browser: the server runs this too. */
export function parseWaitlist(input: unknown): Parsed {
  if (typeof input !== 'object' || input === null) return { ok: false, error: 'Send the form as JSON.' };
  const body = input as Record<string, unknown>;
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (name.length < 2 || name.length > 60) return { ok: false, error: 'Please enter your name.' };
  const phone = typeof body.phone === 'string' ? normalisePhone(body.phone) : null;
  if (!phone) return { ok: false, error: 'Please enter a valid 10-digit Indian mobile number.' };
  const area = typeof body.area === 'string' ? body.area : '';
  if (!(AREAS as readonly string[]).includes(area)) return { ok: false, error: 'Please choose an area.' };
  const role = typeof body.role === 'string' ? body.role : '';
  if (!(ROLES as readonly string[]).includes(role)) return { ok: false, error: 'Please choose who you are.' };
  return { ok: true, entry: { name, phone, area, role: role as Role } };
}
