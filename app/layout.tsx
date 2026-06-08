import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Waddle | The OS for Penguins Who Hustle",
  description:
    "Waddle is the all-in-one platform that helps colonies of penguins manage fish inventory, optimize huddle schedules, and slide into productivity. Built on ice, powered by attitude.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/*
          Introw affiliate.js: captures the `irw_id` query param into the
          first-party `_introw_aff` cookie and exposes
          `window.introw.affiliate.track(...)`. `beforeInteractive` server-renders
          the tag into the initial HTML so `document.currentScript` resolves and the
          data-* config below is read. `data-api-host` is required — the script
          otherwise defaults to an internal host that is unreachable from browsers.
        */}
        <Script
          src="https://app.introw.io/affiliate.js"
          strategy="beforeInteractive"
          data-api-host="https://api.introw.io"
          data-publishable-key={process.env.NEXT_PUBLIC_INTROW_PUBLISHABLE_KEY}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
