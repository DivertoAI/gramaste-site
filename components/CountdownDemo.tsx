'use client';

import { useEffect, useState } from 'react';

const PROMISE_SECONDS = 15 * 60;

/** A looping demo of the 15-minute promise clock. It is decoration, not a real order. */
export default function CountdownDemo() {
  const [left, setLeft] = useState(PROMISE_SECONDS - 41);

  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s <= 60 ? PROMISE_SECONDS : s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');
  return <span className="pill" aria-hidden="true">⏱ {mm}:{ss} left</span>;
}
