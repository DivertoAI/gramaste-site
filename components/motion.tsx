'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True once the element has scrolled into view. Stays true, so animations play once. */
export function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen] as const;
}

/** Fades and lifts its children into place as they scroll into view. */
export function Reveal({ children, delay = 0, className = '', style }: { children: ReactNode; delay?: number; className?: string; style?: CSSProperties }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className={`reveal ${seen ? 'in' : ''} ${className}`} style={{ ['--d' as string]: `${delay}s`, ...style }}>
      {children}
    </div>
  );
}

const easeOut = (t: number): number => 1 - (1 - t) ** 3;

/** Counts up to a number when it scrolls into view. */
export function CountUp({ to, from = 0, decimals = 0, duration = 1200, prefix = '', suffix = '' }: { to: number; from?: number; decimals?: number; duration?: number; prefix?: string; suffix?: string }) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.4);
  const [value, setValue] = useState(to);
  useEffect(() => {
    if (!seen || prefersReducedMotion()) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(from + (to - from) * easeOut(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    setValue(from);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, from, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** A kitchen scale that settles on a weight, jitters a little, then re-weighs. */
export function ScaleReadout({ grams = 200 }: { grams?: number }) {
  const [shown, setShown] = useState(grams);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    const weigh = () => {
      const start = performance.now();
      const run = (now: number) => {
        const t = Math.min(1, (now - start) / 1500);
        const wobble = t < 1 ? Math.sin(t * 26) * (1 - t) * 9 : 0;
        setShown(Math.max(0, grams * easeOut(t) + wobble));
        if (t < 1) raf = requestAnimationFrame(run);
        else {
          setShown(grams);
          timer = setTimeout(() => {
            setShown(0);
            timer = setTimeout(weigh, 700);
          }, 6500);
        }
      };
      raf = requestAnimationFrame(run);
    };
    weigh();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [grams]);
  return <span className="scale-read" aria-label={`${grams} grams`}>{shown.toFixed(1)} g</span>;
}

/** A ticking clock, like the timestamp on a weigh ticket. Rendered after mount so server and browser agree. */
export function LiveClock() {
  const [now, setNow] = useState<string>('--:--:--');
  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString('en-GB'));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{now}</span>;
}

/** Tilts toward the pointer, so the card feels like an object. Off for touch and reduced motion. */
export function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse' || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateZ(0)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <div ref={ref} className={className} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </div>
  );
}
