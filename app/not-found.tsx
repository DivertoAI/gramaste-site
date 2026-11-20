import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="notfound">
      <h1>404</h1>
      <p>That page is not on the menu.</p>
      <Link className="btn" href="/">Back home</Link>
    </main>
  );
}
