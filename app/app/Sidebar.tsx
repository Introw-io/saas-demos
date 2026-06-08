"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { icon: "📊", label: "Dashboard", href: "/app" },
  { icon: "🤝", label: "Partner Portal", href: "/app/introw" },
  { icon: "🐟", label: "FishOps", href: "/app/fishops" },
  { icon: "🧊", label: "Huddles", href: "/app/huddles" },
  { icon: "🛷", label: "Slide Routes", href: "/app/slide-routes" },
  { icon: "🥚", label: "Egg Sync", href: "/app/egg-sync" },
  { icon: "📈", label: "Analytics", href: "/app/analytics" },
];

const secondary = [
  { icon: "🐧", label: "Colony", href: "/app/colony" },
  { icon: "⚙️", label: "Settings", href: "/app/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="app-sidebar">
      <Link href="/" className="brand">
        <span className="logo">🐧</span>
        <span>Waddle</span>
      </Link>

      <nav className="app-nav">
        <div className="nav-section">Workspace</div>
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={pathname === item.href ? "active" : ""}
          >
            {item.href === "/app/introw" ? <img className="introw-logo" src="https://assets.introw.io/introw-logo.webp" alt="Introw" /> : <span className="ico">{item.icon}</span>}
            <span>{item.label}</span>
          </Link>
        ))}

        <div className="nav-section">Manage</div>
        {secondary.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={pathname === item.href ? "active" : ""}
          >
            <span className="ico">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="avatar">🐧</div>
        <div className="meta">
          <strong>Pingu E.</strong>
          <span>Emperor plan</span>
        </div>
      </div>
    </aside>
  );
}
