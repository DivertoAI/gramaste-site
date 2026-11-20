import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="header">
      <div className="wrap">
        <a className="logo" href="#top" aria-label="Gramaste home">Gramaste</a>
        <nav className="nav" aria-label="Main">
          <a className="hide-sm" href="#how">How it works</a>
          <a className="hide-sm" href="#proof">The weigh ticket</a>
          <a className="hide-sm" href="#preeto">Preeto</a>
          <a className="hide-sm" href="#faq">FAQ</a>
          <a className="btn" href="#join" style={{ padding: '10px 20px', minHeight: 40 }}>Join the waitlist</a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
