# 🐧 Waddle

A tiny demo SaaS landing site for a made-up company: **Waddle — the operating system for penguins who hustle.**

Built with **Next.js (App Router)** and deployable to **Vercel** with zero config.

## What's inside

- **Landing page** (`/`) — hero, features, FAQ, and email signup CTAs.
- **Pricing page** (`/pricing`) — three plans (Chick / Colony / Emperor).
- **Email signup conversion** — a server action ([`app/actions.ts`](app/actions.ts)) that
  runs server-side and POSTs the submitted email to the affiliate tracking API:

  ```
  POST https://app.introw.io/api/v1/affiliate/track
  Content-Type: application/json

  { "email": "you@colony.com" }
  ```

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

This is a standard Next.js app — no extra configuration required.

```bash
npm i -g vercel
vercel
```

Or push the repo to GitHub and import it at [vercel.com/new](https://vercel.com/new).
The framework preset is auto-detected as **Next.js**.
