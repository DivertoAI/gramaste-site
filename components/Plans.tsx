import { Reveal } from './motion';

const PLANS = [
  { name: 'Weekly', tag: '7 DAYS', off: '10% off', note: 'Free delivery. Pause up to 7 days.' },
  { name: 'Monthly', tag: '28 DAYS · BEST TO START', off: '15% off', note: 'Free delivery. Pause up to 14 days.', hot: true },
  { name: 'Quarterly', tag: '84 DAYS', off: 'Soon', note: 'Discount to be announced.' },
  { name: 'Yearly', tag: '365 DAYS', off: 'Soon', note: 'Discount to be announced.' },
] as const;

export default function Plans() {
  return (
    <div id="plans" className="section" style={{ padding: '88px 24px' }}>
      <Reveal className="head">
        <span className="eyebrow">04 / PLANS THAT LET YOU LEAVE</span>
        <h2 className="h2">Join in a tap. Leave in a tap.</h2>
      </Reveal>
      <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <div className={`plan ${'hot' in p ? 'hot ink' : ''}`}>
              <b>{p.name}</b>
              <span className="tag">{p.tag}</span>
              <span className="off">{p.off}</span>
              <span className="s">{p.note}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="leave">
        <b>Leave any time</b>
        <span>
          Skip, pause or cancel from the app. Cancel and 70% of what is unused comes back to your original payment. Example: monthly ₹4,760, cancelled on day 8, refunds 20 meals × ₹170 × 70% = ₹2,380.
        </span>
      </Reveal>
    </div>
  );
}
