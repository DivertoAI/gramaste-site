'use client';

import { useState } from 'react';
import { AREAS, ROLES } from '@/lib/waitlist';
import type { Role } from '@/lib/waitlist';

const ROLE_LABEL: Record<Role, string> = { eater: 'I want to eat', kitchen: 'I run a kitchen', partner: 'I ride a bike' };

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'ok' } | { kind: 'error'; message: string };

export default function WaitlistForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_WAITLIST_URL ?? '/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: data.get('name'), phone: data.get('phone'), area: data.get('area'), role: data.get('role') }),
      });
      if (res.ok) {
        form.reset();
        setStatus({ kind: 'ok' });
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setStatus({ kind: 'error', message: body.error ?? 'Something went wrong. Please try again.' });
    } catch {
      setStatus({ kind: 'error', message: 'Could not reach the server. Check your connection and try again.' });
    }
  }

  return (
    <form className="signup" onSubmit={submit} noValidate>
      <div className="field" role="radiogroup" aria-label="Who are you">
        <label>I am</label>
        <div className="seg">
          {ROLES.map((r, i) => (
            <label key={r}>
              <input type="radio" name="role" value={r} defaultChecked={i === 0} />
              <span>{ROLE_LABEL[r]}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" autoComplete="name" required maxLength={60} />
      </div>
      <div className="field">
        <label htmlFor="phone">Mobile number</label>
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98450 12345" required />
      </div>
      <div className="field">
        <label htmlFor="area">Area</label>
        <select id="area" name="area" defaultValue="Koramangala" required>
          {AREAS.map((a) => <option key={a}>{a}</option>)}
        </select>
      </div>
      <button className="btn" type="submit" disabled={status.kind === 'sending'}>
        {status.kind === 'sending' ? 'Sending…' : 'Join the waitlist'}
      </button>
      <p className={`msg ${status.kind === 'error' ? 'err' : status.kind === 'ok' ? 'ok' : ''}`} role="status" aria-live="polite">
        {status.kind === 'ok' && 'You are on the list. We will message you when we reach your area.'}
        {status.kind === 'error' && status.message}
      </p>
    </form>
  );
}
