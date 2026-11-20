'use client';

import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

/** Switches between the dark and light themes and remembers the choice. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = document.documentElement.dataset.theme;
    if (saved === 'light' || saved === 'dark') setTheme(saved);
    else setTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }, []);

  function flip() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('gramaste-theme', next);
    } catch {
      // Private mode: the choice just will not be remembered.
    }
  }

  return (
    <button type="button" className="themebtn" onClick={flip} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}
