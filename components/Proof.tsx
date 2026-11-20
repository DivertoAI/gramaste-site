'use client';

import { useEffect, useState } from 'react';
import { CountUp, Reveal, useInView } from './motion';

/** Raw against cooked: the weight drops in the pan, the protein does not. */
export default function Proof() {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const [cooked, setCooked] = useState(200);

  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCooked(150);
      return;
    }
    const t = setTimeout(() => {
      const start = performance.now();
      let raf = 0;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1600);
        setCooked(200 - 50 * p);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, 700);
    return () => clearTimeout(t);
  }, [seen]);

  return (
    <div id="proof" className="section">
      <Reveal className="head">
        <span className="eyebrow">01 / WHY THE NUMBER IS REAL</span>
        <h2 className="h2">Same protein. Different scale.</h2>
        <p className="lede">
          Chicken loses about a quarter of its weight cooking. Count the cooked grams against raw data and you undercount protein by 25 to 30 percent. We weigh raw, and we show you the proof.
        </p>
      </Reveal>
      <div className="grid-auto" ref={ref}>
        <Reveal delay={0.05} className="tile dark ink">
          <span className="k">BEFORE THE PAN</span>
          <span className="v y"><CountUp to={200} suffix=" g" /></span>
          <span style={{ fontSize: 17 }}>45 g protein</span>
        </Reveal>
        <Reveal delay={0.15} className="tile dark ink">
          <span className="k">AFTER THE PAN</span>
          <span className="v">{Math.round(cooked)} g</span>
          <div className="proof-drop" aria-hidden="true"><i style={{ width: `${(cooked / 200) * 100}%` }} /></div>
          <span style={{ fontSize: 17 }}>Still 45 g protein. Only water left.</span>
        </Reveal>
        <Reveal delay={0.25} className="tile cream">
          <span className="k" style={{ color: 'var(--faint)' }}>OUR RULE</span>
          <span className="rule">We weigh it raw, so the number is real.</span>
          <span style={{ fontSize: 15, color: 'var(--sub)' }}>Every order carries a weigh ticket: the grams and the time your portion was weighed on the scale.</span>
        </Reveal>
      </div>
    </div>
  );
}
