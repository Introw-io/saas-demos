import Link from "next/link";
import Sidebar from "../Sidebar";

const QUIPS: Record<string, string> = {
  fishops: "Our engineers are still counting the herring. All of them.",
  huddles: "We're warming this one up — it's still a bit too chilly to ship.",
  "slide-routes": "The penguins are belly-sliding the final bugs out as we speak.",
  "egg-sync": "Still incubating. We don't want to crack it open too early.",
  analytics: "Crunching numbers with very cold, very tiny flippers.",
  colony: "Gathering the whole rookery. This may take a few waddles.",
  settings: "Tuning the thermostat. Currently set to a crisp -40°C.",
};

function titleFromSlug(slug: string[]) {
  const last = slug[slug.length - 1] ?? "page";
  return last
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function ComingSoon({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const key = slug.join("-");
  const title = titleFromSlug(slug);
  const quip =
    QUIPS[key] ?? "This iceberg is still forming. Check back when it thaws.";

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="app-main">
        <section className="coming-soon">
          <div className="inner">
            <div className="berg">🐧</div>
            <span className="eyebrow">❄️ {title} · Coming soon</span>
            <h1>
              This iceberg is <span className="grad">still forming</span>
            </h1>
            <p>{quip}</p>
            <div className="actions">
              <Link href="/app" className="btn btn-primary">
                ← Back to dashboard
              </Link>
            </div>
            <div className="snow">❄ ❅ ❆ ❅ ❄</div>
          </div>
        </section>
      </main>
    </div>
  );
}
