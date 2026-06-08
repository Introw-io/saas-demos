import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SignupForm from "../components/SignupForm";

export const metadata: Metadata = {
  title: "Pricing — Waddle",
  description:
    "Simple, fishy pricing for colonies of every size. Start free, scale to the whole rookery.",
};

const plans = [
  {
    name: "Chick",
    blurb: "For solo penguins and tiny nests just getting started.",
    price: "$0",
    cadence: "/mo forever",
    featured: false,
    cta: "Start free",
    features: [
      "Up to 5 penguins",
      "FishOps Dashboard (basic)",
      "1 huddle schedule",
      "Community support",
    ],
  },
  {
    name: "Colony",
    blurb: "For growing rookeries that need to stay warm and organized.",
    price: "$29",
    cadence: "/mo per 100 penguins",
    featured: true,
    cta: "Claim your iceberg",
    features: [
      "Unlimited penguins",
      "FishOps Dashboard (pro)",
      "Smart Huddle Scheduling",
      "Belly-Slide Routing",
      "Egg Sync + reminders",
      "Priority krill support",
    ],
  },
  {
    name: "Emperor",
    blurb: "For mega-colonies running on serious fish volume.",
    price: "Let's talk",
    cadence: "fish (custom)",
    featured: false,
    cta: "Talk to a penguin",
    features: [
      "Everything in Colony",
      "Dedicated Skua security",
      "Colony Analytics + exports",
      "Waddle Copilot (unlimited)",
      "99.99% no-thaw SLA",
      "Personal iceberg architect",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="hero" style={{ paddingBottom: 24 }}>
          <div className="container">
            <span className="eyebrow">🐟 Pay in dollars, we convert to fish</span>
            <h1>Simple pricing for colonies of every size</h1>
            <p className="sub">
              Start free, scale to the whole rookery. No hidden fees, no
              long-term ice contracts.
            </p>
          </div>
        </section>

        <section className="container" style={{ paddingBottom: 64 }}>
          <div className="price-grid">
            {plans.map((plan) => (
              <div
                className={`plan${plan.featured ? " featured" : ""}`}
                key={plan.name}
              >
                {plan.featured && <span className="tag">MOST POPULAR</span>}
                <h3>{plan.name}</h3>
                <p className="blurb">{plan.blurb}</p>
                <div className="price">
                  {plan.price} <span>{plan.cadence}</span>
                </div>
                <ul>
                  {plan.features.map((f) => (
                    <li key={f}>
                      <span className="check">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#get-started"
                  className={`btn ${plan.featured ? "btn-primary" : "btn-ghost"}`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="container">
          <div className="cta" id="get-started">
            <h2>Try Waddle free. Cancel any iceberg, anytime.</h2>
            <p>Drop your email and we'll get your colony set up in minutes.</p>
            <SignupForm buttonLabel="Get started" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
