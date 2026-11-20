export const GOALS = ['Build muscle', 'Lose fat', 'Stay fit', 'Just eat healthier'] as const;
export const SPENDS = ['Under ₹3,000', '₹3,000 to ₹6,000', '₹6,000 to ₹10,000', '₹10,000 to ₹15,000', 'More than ₹15,000'] as const;
export const AREAS = ['Koramangala', 'BTM Layout', 'HSR Layout', 'Indiranagar', 'Domlur', 'Jayanagar', 'Somewhere else'] as const;

export interface WaitlistEntry {
  readonly goal: string;
  readonly spend: string;
  readonly phone: string;
  readonly name: string;
  readonly area: string;
}

export type Parsed = { ok: true; entry: WaitlistEntry } | { ok: false; error: string };

/** Indian mobile number: 10 digits starting 6-9, with an optional +91 or 0 in front. */
export function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/[\s()-]/g, '');
  const match = /^(?:\+91|91|0)?([6-9]\d{9})$/.exec(digits);
  return match?.[1] ? `+91${match[1]}` : null;
}

const oneOf = (list: readonly string[], value: unknown): value is string => typeof value === 'string' && list.includes(value);

/** Checks step 1 (goal, spend, phone) on its own, so the form can move to step 2. */
export function parseStepOne(input: unknown): { ok: true; goal: string; spend: string; phone: string } | { ok: false; error: string } {
  const body = typeof input === 'object' && input !== null ? (input as Record<string, unknown>) : {};
  if (!oneOf(GOALS, body.goal)) return { ok: false, error: 'Please choose your goal.' };
  if (!oneOf(SPENDS, body.spend)) return { ok: false, error: 'Please choose a monthly spend.' };
  const phone = typeof body.phone === 'string' ? normalisePhone(body.phone) : null;
  if (!phone) return { ok: false, error: 'Please enter a valid 10-digit Indian mobile number.' };
  return { ok: true, goal: body.goal, spend: body.spend, phone };
}

/** Checks the whole form. Never trusts the browser: the server runs this too. */
export function parseWaitlist(input: unknown): Parsed {
  if (typeof input !== 'object' || input === null) return { ok: false, error: 'Send the form as JSON.' };
  const one = parseStepOne(input);
  if (!one.ok) return one;
  const body = input as Record<string, unknown>;
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (name.length < 2 || name.length > 60) return { ok: false, error: 'Please enter your name.' };
  if (!oneOf(AREAS, body.area)) return { ok: false, error: 'Please choose an area.' };
  return { ok: true, entry: { goal: one.goal, spend: one.spend, phone: one.phone, name, area: body.area } };
}
