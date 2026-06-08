import type { Metadata } from "next";
import Sidebar from "./Sidebar";

export const metadata: Metadata = {
  title: "Dashboard — Waddle",
  description: "Your colony at a glance.",
};

const stats = [
  { label: "🐟 Fish in stock", value: "8,420", delta: "+12% this week", up: true },
  { label: "🐧 Active penguins", value: "1,204", delta: "+38 today", up: true },
  { label: "🧊 Huddle warmth", value: "94%", delta: "+2% vs avg", up: true },
  { label: "🦭 Predator alerts", value: "3", delta: "-5 this week", up: false },
];

const colonies = [
  { name: "North Iceberg", penguins: 312, fish: "2,140", status: "Thriving", cls: "ok" },
  { name: "Glacier Bay", penguins: 287, fish: "1,860", status: "Stable", cls: "cold" },
  { name: "Frost Ridge", penguins: 198, fish: "640", status: "Low fish", cls: "warn" },
  { name: "Penguin Plaza", penguins: 407, fish: "3,780", status: "Thriving", cls: "ok" },
];

const activity = [
  { icon: "🐟", text: "Restocked 1,200 herring at North Iceberg", when: "12 min ago" },
  { icon: "🛷", text: "New slide route optimized — 41% faster to sea", when: "1 hour ago" },
  { icon: "🥚", text: "Egg #4471 handed off to co-parent", when: "3 hours ago" },
  { icon: "🦭", text: "Skua security cleared a leopard seal sighting", when: "Today, 8:02 AM" },
];

export default function AppPage() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="app-main">
        <header className="app-topbar">
          <div>
            <h1>Good morning, Pingu 🐧</h1>
            <p className="sub">Here&apos;s how your colony is doing today.</p>
          </div>
          <button className="btn btn-primary">+ New huddle</button>
        </header>

        <div className="app-content">
          <div className="stat-grid">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <div className="label">{s.label}</div>
                <div className="value">{s.value}</div>
                <div className={`delta ${s.up ? "up" : "down"}`}>{s.delta}</div>
              </div>
            ))}
          </div>

          <div className="app-cols">
            <div className="panel">
              <h3>Colonies</h3>
              <table className="app-table">
                <thead>
                  <tr>
                    <th>Colony</th>
                    <th>Penguins</th>
                    <th>Fish</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {colonies.map((c) => (
                    <tr key={c.name}>
                      <td>
                        <strong>{c.name}</strong>
                      </td>
                      <td>{c.penguins}</td>
                      <td>{c.fish}</td>
                      <td>
                        <span className={`pill ${c.cls}`}>{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="panel">
              <h3>Recent activity</h3>
              <ul className="activity">
                {activity.map((a, i) => (
                  <li key={i}>
                    <span className="ico">{a.icon}</span>
                    <div>
                      <div>{a.text}</div>
                      <div className="when">{a.when}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
