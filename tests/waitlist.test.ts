import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { normalisePhone, parseStepOne, parseWaitlist } from '../lib/waitlist.ts';

const full = { goal: 'Build muscle', spend: '₹3,000 to ₹6,000', phone: '98450 12345', name: ' Asha Rao ', area: 'Indiranagar' };

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

  it('step one checks goal, spend and phone before moving on', () => {
    assert.equal(parseStepOne({ ...full, goal: 'Fly' }).ok, false);
    assert.equal(parseStepOne({ ...full, spend: 'lots' }).ok, false);
    assert.deepEqual(parseStepOne({ ...full, phone: '1' }), { ok: false, error: 'Please enter a valid 10-digit Indian mobile number.' });
    assert.deepEqual(parseStepOne(full), { ok: true, goal: 'Build muscle', spend: '₹3,000 to ₹6,000', phone: '+919845012345' });
  });

  it('the full form needs a name and a known area, and cleans what it keeps', () => {
    assert.deepEqual(parseWaitlist({ ...full, name: 'A' }), { ok: false, error: 'Please enter your name.' });
    assert.equal(parseWaitlist({ ...full, area: 'Mars' }).ok, false);
    assert.deepEqual(parseWaitlist(full), {
      ok: true,
      entry: { goal: 'Build muscle', spend: '₹3,000 to ₹6,000', phone: '+919845012345', name: 'Asha Rao', area: 'Indiranagar' },
    });
  });
});
