import Link from "next/link";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand">
          <span className="logo">🐧</span>
          <span>Waddle</span>
        </Link>
        <div className="nav-links">
          <Link href="/#features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/#signup" className="btn btn-ghost">
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}
