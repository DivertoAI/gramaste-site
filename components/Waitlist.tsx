'use client';

import { useState } from 'react';
import { AREAS, GOALS, SPENDS, parseStepOne } from '@/lib/waitlist';
import { Reveal } from './motion';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'ok' } | { kind: 'error'; message: string };

const staticSite = process.env.NEXT_PUBLIC_STATIC === 'true' && !process.env.NEXT_PUBLIC_WAITLIST_URL;

/** Two steps: what you want, then who you are. The server checks everything again. */
export default function Waitlist() {
  const [step, setStep] = useState<1 | 2>(1);
  const [one, setOne] = useState({ goal: GOALS[0] as string, spend: SPENDS[1] as string, phone: '' });
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  function next(event: React.FormEvent) {
    event.preventDefault();
    const check = parseStepOne(one);
    if (!check.ok) return setStatus({ kind: 'error', message: check.error });
    setStatus({ kind: 'idle' });
    setStep(2);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_WAITLIST_URL ?? '/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...one, name: data.get('name'), area: data.get('area') }),
      });
      if (res.ok) return setStatus({ kind: 'ok' });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setStatus({ kind: 'error', message: body.error ?? 'Something went wrong. Please try again.' });
    } catch {
      setStatus({ kind: 'error', message: 'Could not reach the server. Check your connection and try again.' });
    }
  }

  return (
    <div id="waitlist" className="wl-band ink">
      <div className="wl">
        <Reveal className="copy">
          <span className="eyebrow on-dark">EARLY ACCESS · STEP {staticSite ? 0 : step} OF 2</span>
          <h2 className="h2">Be first to eat proof.</h2>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--muted)' }}>A launch-day offer, a say in the menu and prices, and no spam.</p>
        </Reveal>

        {staticSite ? (
          <Reveal className="soon" delay={0.1} style={{ flex: '1 1 420px' }}>
            <h3 className="display" style={{ fontSize: 32, lineHeight: 1 }}>Waitlist opens soon</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.5 }}>We are getting the first kitchens ready in Koramangala. Sign-ups open here shortly, so check back soon.</p>
          </Reveal>
        ) : status.kind === 'ok' ? (
          <div className="soon" role="status" style={{ flex: '1 1 420px' }}>
            <h3 className="display" style={{ fontSize: 32, lineHeight: 1 }}>You are on the list</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.5 }}>We will message you when we reach your area. Thank you for being early.</p>
          </div>
        ) : step === 1 ? (
          <form onSubmit={next} noValidate>
            <div className="dots" aria-hidden="true"><i className="on" /><i /></div>
            <div className="field">
              <label htmlFor="w-goal">My goal right now</label>
              <select id="w-goal" value={one.goal} onChange={(e) => setOne({ ...one, goal: e.target.value })}>
                {GOALS.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="w-spend">Monthly spend on food for my diet</label>
              <select id="w-spend" value={one.spend} onChange={(e) => setOne({ ...one, spend: e.target.value })}>
                {SPENDS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="w-phone">Phone</label>
              <input id="w-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" value={one.phone} onChange={(e) => setOne({ ...one, phone: e.target.value })} />
            </div>
            <button type="submit" className="btn big" style={{ minHeight: 52 }}>Next: join the waitlist</button>
            <p className={`msg ${status.kind === 'error' ? 'err' : ''}`} role="status" aria-live="polite">{status.kind === 'error' ? status.message : ''}</p>
          </form>
        ) : (
          <form onSubmit={submit} noValidate>
            <div className="dots" aria-hidden="true"><i className="on" /><i className="on" /></div>
            <div className="field">
              <label htmlFor="w-name">Your name</label>
              <input id="w-name" name="name" autoComplete="name" maxLength={60} required />
            </div>
            <div className="field">
              <label htmlFor="w-area">Where should we deliver first?</label>
              <select id="w-area" name="area" defaultValue="Koramangala">
                {AREAS.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <button type="submit" className="btn big" style={{ minHeight: 52 }} disabled={status.kind === 'sending'}>
              {status.kind === 'sending' ? 'Sending…' : 'Join the waitlist'}
            </button>
            <button type="button" className="btn ghost" onClick={() => setStep(1)}>Back</button>
            <p className={`msg ${status.kind === 'error' ? 'err' : ''}`} role="status" aria-live="polite">{status.kind === 'error' ? status.message : ''}</p>
          </form>
        )}
      </div>
    </div>
  );
}
