import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SignupForm from "./components/SignupForm";

const features = [
  {
    icon: "🐟",
    title: "FishOps Dashboard",
    body: "Track every herring in real time. Low on krill? Waddle pings the whole colony before anyone gets hangry.",
  },
  {
    icon: "🧊",
    title: "Smart Huddle Scheduling",
    body: "AI rotates who stands in the freezing-cold outer ring so nobody's tail goes numb. Fairness, finally.",
  },
  {
    icon: "🛷",
    title: "Belly-Slide Routing",
    body: "Get from nest to sea 40% faster with optimized slide paths. Less waddling, more gliding.",
  },
  {
    icon: "🥚",
    title: "Egg Sync",
    body: "Never lose track of an egg again. Hand-off reminders, co-parenting calendars, and 99.9% uptime.",
  },
  {
    icon: "📈",
    title: "Colony Analytics",
    body: "Molt rates, dive depths, predator near-misses. Beautiful charts your flippers can actually read.",
  },
  {
    icon: "🐧",
    title: "Waddle Copilot",
    body: "Ask anything. \"Where are the leopard seals?\" \"Who ate my fish?\" Copilot has answers.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />

      <main>
        <section className="hero" id="signup">
          <div className="container">
            <span className="eyebrow">🧊 Now out of stealth (and out of the cold)</span>
            <h1>
              The operating system for{" "}
              <span className="grad">penguins who hustle</span>
            </h1>
            <p className="sub">
              Waddle helps your colony manage fish inventory, optimize huddle
              shifts, and slide into peak productivity — all from one frosty
              dashboard. No thumbs required.
            </p>
            <SignupForm />
          </div>
        </section>

        <section className="logos">
          <div className="container">
            <div className="label">Trusted by the chilliest colonies on Earth</div>
            <div className="row">
              <span>EmperorCo</span>
              <span>GentooLabs</span>
              <span>RockhopperX</span>
              <span>KingFisher</span>
              <span>Adélie&nbsp;AI</span>
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="container">
            <div className="section-head">
              <h2>Everything your colony needs to thrive</h2>
              <p>
                One platform to keep 10,000 penguins fed, warm, and weirdly
                competitive about sliding.
              </p>
            </div>
            <div className="grid">
              {features.map((f) => (
                <div className="card" key={f.title}>
                  <div className="icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container">
            <div className="section-head">
              <h2>Frequently squawked questions</h2>
              <p>The stuff every penguin asks before they commit.</p>
            </div>
            <div className="faq">
              <details>
                <summary>Do I need opposable thumbs to use Waddle?</summary>
                <p>
                  Nope. Waddle is 100% beak- and flipper-friendly. Our biggest
                  buttons are tested by actual Gentoos.
                </p>
              </details>
              <details>
                <summary>Does it work in -40°C?</summary>
                <p>
                  It works better. Waddle servers actually run cooler the colder
                  it gets. Antarctica is basically our data center.
                </p>
              </details>
              <details>
                <summary>Can leopard seals sign up?</summary>
                <p>
                  Absolutely not. We have a strict no-predators policy enforced
                  by our elite Skua security team.
                </p>
              </details>
              <details>
                <summary>What if I only have one fish?</summary>
                <p>
                  Then you really need our FishOps Dashboard. Start on the free
                  plan and grow your stockpile responsibly.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="cta">
            <h2>Ready to stop waddling in circles?</h2>
            <p>Join 12,000+ colonies already gliding ahead. Free to start.</p>
            <SignupForm buttonLabel="Start for free" />
            <div style={{ marginTop: 18 }}>
              <Link href="/pricing" className="btn btn-ghost">
                See pricing →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
