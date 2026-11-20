import Image from 'next/image';
import { CountUp, LiveClock, ScaleReadout, Tilt } from './motion';
import ThemeToggle from './ThemeToggle';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const photo = (name: string): string => `${base}/menu/${name}`;

const MARQUEE = ['WEIGHED RAW', 'COLD-PRESSED OIL BY THE ML', 'NO MSG', 'FRESH EVERY MORNING', 'NO PACKING OR SURGE FEE'];

/** Header and hero: the first screen, with a scale that settles and a clock that ticks. */
export function Top() {
  return (
    <>
      <div className="hero-band">
        <div className="wrap">
          <div className="bar">
            <b className="logo">Gramaste</b>
            <nav className="nav" aria-label="Main">
              <a href="#proof">Proof</a>
              <a href="#planner">AI planner</a>
              <a href="#plans">Plans</a>
              <a href="#faq">FAQ</a>
            </nav>
            <ThemeToggle />
            <a className="btn" href="#waitlist">Join the waitlist</a>
          </div>

          <div className="hero">
            <div className="hero-copy hero-rise">
              <span className="eyebrow on-dark">LAUNCHING FIRST IN KORAMANGALA, BENGALURU</span>
              <h1>
                Protein you<br />
                <span className="y">can prove.</span>
              </h1>
              <p className="sub">
                Build your meal to the gram, or let our AI plan your week. Every protein is weighed raw, every rupee itemised, and you can leave any time.
              </p>
              <div className="cta">
                <a className="btn big" href="#waitlist">Get early access</a>
                <a className="btn big ghost" href="#planner">See the AI planner</a>
              </div>
              <span style={{ fontSize: 14, color: 'var(--muted)' }}>App coming soon on Google Play and the App Store. नमस्ते · ನಮಸ್ಕಾರ</span>
            </div>

            <div className="hero-card-wrap">
              <Tilt className="scale-card float" >
                <div className="scale-photo">
                  <Image src={photo('tandoori.jpg')} alt="Tandoori chicken with cucumber, lime and herbs" fill sizes="420px" priority style={{ objectFit: 'cover' }} />
                  <ScaleReadout grams={200} />
                </div>
                <div className="card-meta"><span>RAW CHICKEN BREAST</span><LiveClock /></div>
                <div className="big-num">
                  <span className="n" style={{ fontSize: 84 }}><CountUp to={45} /></span>
                  <span className="u">g PROTEIN · 10.1 g / 100 kcal</span>
                </div>
              </Tilt>
            </div>
          </div>
        </div>
      </div>

      <div className="marquee-band" aria-hidden="true">
        <div className="marquee">
          {[...MARQUEE, ...MARQUEE].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>
    </>
  );
}
