'use client';

import { useEffect, useState } from 'react';
import { CountUp, Reveal, useInView } from './motion';

const CHIPS = ['Chicken breast 200g', 'Tandoori', 'Brown rice 150g', 'Broccoli'];
const LINES: [string, number][] = [
  ['Chicken breast 200g', 100],
  ['Cooking', 25],
  ['Tandoori', 15],
  ['Oil 5ml', 2],
  ['Brown rice 150g', 21],
  ['Broccoli 50g', 15],
  ['Delivery', 25],
];
const TOTAL = LINES.reduce((sum, [, price]) => sum + price, 0);

/** The plate builder and the receipt: the bar fills, the chips pop in, the lines print one by one. */
export default function BuilderReceipt() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const [printed, setPrinted] = useState(0);

  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPrinted(LINES.length + 2);
      return;
    }
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setPrinted(n);
      if (n >= LINES.length + 2) clearInterval(id);
    }, 260);
    return () => clearInterval(id);
  }, [seen]);

  return (
    <div className="pair" ref={ref}>
      <Reveal className="tile dark ink" style={{ padding: 26, gap: 14 }}>
        <span className="k" style={{ letterSpacing: '.12em' }}>THE BUILDER</span>
        <div className="big-num">
          <span className="n" style={{ fontSize: 96 }}><CountUp to={55} /></span>
          <span className="u">g PROTEIN · <CountUp to={542} /> kcal</span>
        </div>
        <div className="macro" aria-label="Protein, carbs and fat balance">
          <i style={{ flexGrow: seen ? 55 : 0, background: 'var(--accent)' }} />
          <i style={{ flexGrow: seen ? 44 : 0, background: 'var(--teal)' }} />
          <i style={{ flexGrow: seen ? 18 : 0, background: 'var(--coral)' }} />
        </div>
        <div className="chips">
          {CHIPS.map((c, i) => (
            <span key={c} className="chip" style={{ opacity: seen ? 1 : 0, transform: seen ? 'none' : 'scale(.85)', transition: `all .5s cubic-bezier(.2,.9,.3,1.3) ${0.5 + i * 0.12}s` }}>{c}</span>
          ))}
        </div>
        <span style={{ fontSize: 14, color: 'var(--muted)' }}>Eight proteins, eight flavours, oil by the ml. The price and macros move with every tap.</span>
      </Reveal>

      <Reveal delay={0.12} className="receipt" style={{ gap: 7 }}>
        <span style={{ fontSize: 12, letterSpacing: '.12em', color: 'var(--faint)' }}>THE HONEST RECEIPT</span>
        {LINES.map(([name, price], i) => (
          <div className="row" key={name} style={{ opacity: printed > i ? 1 : 0, transform: printed > i ? 'none' : 'translateY(6px)', transition: 'all .35s ease' }}>
            <span>{name}</span><span>₹{price}</span>
          </div>
        ))}
        <div className="row zero" style={{ opacity: printed > LINES.length ? 1 : 0, transition: 'opacity .4s ease' }}>
          <s>Packing · platform · surge · small-order</s><b>₹0</b>
        </div>
        <div className="total" style={{ opacity: printed > LINES.length + 1 ? 1 : 0, transition: 'opacity .4s ease' }}>
          <span>TO PAY</span><span>₹{printed > LINES.length + 1 ? TOTAL : 0}</span>
        </div>
      </Reveal>
    </div>
  );
}
