import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { normalisePhone, parseWaitlist } from '../lib/waitlist.ts';

describe('waitlist form', () => {
  it('accepts common ways of writing an Indian mobile number', () => {
    assert.equal(normalisePhone('98450 12345'), '+919845012345');
    assert.equal(normalisePhone('+91 98450-12345'), '+919845012345');
    assert.equal(normalisePhone('09845012345'), '+919845012345');
  });

  it('rejects numbers that cannot be real', () => {
    assert.equal(normalisePhone('12345'), null);
    assert.equal(normalisePhone('5845012345'), null);
  });

  it('returns a clear message for the first problem', () => {
    const bad = parseWaitlist({ name: 'A', phone: '9845012345', area: 'HSR Layout', role: 'eater' });
    assert.deepEqual(bad, { ok: false, error: 'Please enter your name.' });
    const odd = parseWaitlist({ name: 'Asha', phone: '9845012345', area: 'Mars', role: 'eater' });
    assert.equal(odd.ok, false);
  });

  it('cleans a valid entry', () => {
    const ok = parseWaitlist({ name: '  Asha Rao ', phone: '98450 12345', area: 'Indiranagar', role: 'kitchen' });
    assert.deepEqual(ok, { ok: true, entry: { name: 'Asha Rao', phone: '+919845012345', area: 'Indiranagar', role: 'kitchen' } });
  });
});
