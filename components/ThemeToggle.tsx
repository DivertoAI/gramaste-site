'use client';

import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

/** Switches between the dark and light themes and remembers the choice. Dark is the default. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
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
    <button type="button" className="themebtn" onClick={flip} aria-label="Switch between light and dark theme">
      {theme === 'dark' ? '☾ dark' : '☀ light'}
    </button>
  );
}
