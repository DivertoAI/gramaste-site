'use client';

import { useState } from 'react';
import { Reveal } from './motion';

const DAYS = [
  ['MON', 17], ['TUE', 18], ['WED', 19], ['THU', 20], ['FRI', 21], ['SAT', 22], ['SUN', 23],
] as const;

type Meal = { slot: string; name: string; protein: number; price: number };

/** Three sample days that rotate, so changing the day visibly changes the plan. */
const MEALS: readonly (readonly Meal[])[] = [
  [
    { slot: 'LUNCH · 1:00 PM', name: 'Tandoori chicken, brown rice', protein: 55, price: 178 },
    { slot: 'SNACK · 5:00 PM', name: 'Egg bhurji on multigrain toast', protein: 24, price: 70 },
    { slot: 'DINNER · 8:30 PM', name: 'Chicken thigh hariyali, millet', protein: 46, price: 190 },
  ],
  [
    { slot: 'LUNCH · 1:00 PM', name: 'Seer fish fry, millet', protein: 49, price: 253 },
    { slot: 'SNACK · 5:00 PM', name: 'Soya chunks chaat', protein: 22, price: 60 },
    { slot: 'DINNER · 8:30 PM', name: 'Paneer tikka, jeera rice', protein: 38, price: 185 },
  ],
  [
    { slot: 'LUNCH · 1:00 PM', name: 'Mutton pepper fry, ragi roti', protein: 50, price: 265 },
    { slot: 'SNACK · 5:00 PM', name: 'Masala egg wrap', protein: 26, price: 90 },
    { slot: 'DINNER · 8:30 PM', name: 'Chicken breast, quinoa bowl', protein: 52, price: 195 },
  ],
];

const PERIODS = ['Weekly', 'Monthly', 'Quarterly', 'Yearly'] as const;

export default function Planner() {
  const [selected, setSelected] = useState<ReadonlySet<number>>(new Set([0, 1, 2, 3, 4]));
  const [focus, setFocus] = useState(0);
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>('Monthly');
  const [note, setNote] = useState('');

  function toggle(i: number) {
    setFocus(i);
    setNote('');
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function add(count: number) {
    setNote(count === 0 ? 'Pick at least one day first.' : `Added ${count} day${count === 1 ? '' : 's'} to your basket. In the app you can edit any meal until 8 PM the night before.`);
  }

  const meals = MEALS[focus % MEALS.length] ?? [];
  return (
    <div id="planner" className="planner-band ink">
      <div className="planner">
        <Reveal className="copy">
          <span className="eyebrow on-dark">03 / NEW TO MEAL PLANNING?</span>
          <h2 className="h2">Let Preeto plan your week. You stay in charge.</h2>
          <p>
            Meet Preeto, your AI nutrition coach. Tell her your goal, diet and schedule and she lays out every meal, date by date, for a week, a month, a quarter or a year. Add the whole plan to your basket, or just the days you want. Change any meal later, up to 8 PM the night before.
          </p>
          <div className="chips" role="group" aria-label="Plan length">
            {PERIODS.map((p) => (
              <button key={p} type="button" className={`pill ${period === p ? 'on' : ''}`} aria-pressed={period === p} onClick={() => setPeriod(p)}>{p}</button>
            ))}
          </div>
          <span style={{ fontSize: 14, color: 'var(--muted)' }}>
            Preeto is an AI: suggestions, not medical advice. Leave any time: 70% of the unused amount comes back.
          </span>
        </Reveal>

        <Reveal delay={0.12} className="plan-card" style={{ flex: '1 1 380px' }}>
          <div className="days" role="group" aria-label="Choose days to add">
            {DAYS.map(([name, date], i) => (
              <button key={name} type="button" className={`day ${selected.has(i) ? 'sel' : 'off'}`} aria-pressed={selected.has(i)} onClick={() => toggle(i)}>
                {name}<b>{date}</b>
              </button>
            ))}
          </div>
          {meals.map((m) => (
            <div className="meal" key={`${focus}-${m.slot}`}>
              <div><small>{m.slot}</small><b>{m.name}</b></div>
              <span className="m">{m.protein} g · ₹{m.price}</span>
            </div>
          ))}
          <div className="add-row">
            <button type="button" className="btn" onClick={() => add(selected.size)}>Add {selected.size} selected day{selected.size === 1 ? '' : 's'}</button>
            <button type="button" className="btn ghost2" onClick={() => add(7)}>Add all 7</button>
          </div>
          <p className="toast" role="status" aria-live="polite">{note}</p>
        </Reveal>
      </div>
    </div>
  );
}
