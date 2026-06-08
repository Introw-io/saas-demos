# 🐧 Waddle

A small, deployable demo site for a made-up SaaS company — **Waddle, the operating
system for penguins who hustle.** It pairs a fun, frosty marketing site with a
dummy in-app dashboard, and demonstrates two server-side integrations with
[Introw](https://introw.io):

1. **Affiliate tracking** — the marketing signup form POSTs the visitor's email to
   Introw's affiliate `track` endpoint via a Next.js Server Action.
2. **Embedded Partner Portal** — the in-app `Partner Portal` page creates an Introw
   auth session server-side and renders the returned URL in a full-screen iframe.

Built with **Next.js (App Router)**, **React 19**, and **TypeScript**, using plain
CSS (no UI framework). Deployable to **Vercel** with zero configuration.

---

## Introw integrations

### 1. Affiliate conversions (marketing signup)

Conversions are attributed to a signed, server-side click. The
[`affiliate.js`](app/layout.tsx) snippet (installed in the root layout `<head>`)
reads the `irw_id` query param from `/r/{code}` redirects, stores it in the
first-party `_introw_aff` cookie (90-day, last-click window), and strips it from
the URL. The signup form then records a conversion via **both** integration paths:

**Server-to-server (Option B, recommended)** — the form submits to a Server Action
([`app/actions.ts`](app/actions.ts)), which validates the email, reads the
`_introw_aff` cookie, and POSTs it with the secret API key:

```
POST https://api.introw.io/api/v1/affiliate/conversions
x-api-key: $INTROW_API_KEY          # scope: affiliate:write
Content-Type: application/json

{ "clickId": "<_introw_aff cookie>", "email": "you@colony.com",
  "properties": { "plan": "free", "source": "marketing-signup" } }
```

**Client-side (Option A)** — on success the form also calls
`window.introw.affiliate.track(...)` (see [`app/lib/affiliate.ts`](app/lib/affiliate.ts))
using the campaign publishable key. The snippet supplies the click id from the
cookie automatically.

Both paths anchor to the same click id, so Introw **deduplicates** — the second
call resolves as `duplicate`. The endpoint is intentionally lenient and never
surfaces errors on the page:

| `status`    | HTTP  | Meaning                                          |
| ----------- | ----- | ------------------------------------------------ |
| `recorded`  | `201` | New conversion attributed; form submission made  |
| `duplicate` | `200` | This click already converted                      |
| `ignored`   | `200` | Click token missing, invalid, or expired          |

> The `affiliate.js` tag is configured with `data-api-host="https://api.introw.io"`
> — without it the snippet defaults to an internal host unreachable from browsers.

### 2. Embedded Partner Portal

[`app/app/introw/page.tsx`](app/app/introw/page.tsx) creates an auth session and
embeds the result:

```
POST https://api.introw.io/api/v1/auth/session
x-api-key: $INTROW_API_KEY
Content-Type: application/json

{ "email": "embed@introw.io" }
```

The session email is supplied by `resolveUserContext()` in
[`userContext.ts`](app/app/introw/userContext.ts) (currently hard-coded, ready to be
swapped for a real auth/session lookup). The returned `url` is rendered in a
full-screen iframe; any failure shows an on-brand error state.

---

## Environment variables

| Variable                             | Required | Used by                       | Description                                                                 |
| ------------------------------------ | -------- | ----------------------------- | --------------------------------------------------------------------------- |
| `INTROW_API_KEY`                     | Yes\*    | signup action, `/app/introw`  | Secret API key (`affiliate:write`) for server-side conversions + sessions.  |
| `NEXT_PUBLIC_INTROW_PUBLISHABLE_KEY` | No       | `affiliate.js` (browser)      | Campaign publishable key (`pk_aff_...`) for the client-side conversion path. |

\* Required for the server-to-server conversion and the Partner Portal page.
Without it, the signup shows a friendly error and `/app/introw` shows a friendly
error instead of crashing. `NEXT_PUBLIC_INTROW_PUBLISHABLE_KEY` is optional — leave
it empty to disable the client-side path; the server-to-server path still works.

Set it locally by copying the example file and filling in your key:

```bash
cp .env.example .env.local
# then edit .env.local:
# INTROW_API_KEY=sk_live_your_real_key
```

`.env.local` is gitignored. The variable has no `NEXT_PUBLIC_` prefix, so it stays
server-only and is never exposed to the browser. Restart the dev server after editing
env files.

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local   # then add your INTROW_API_KEY

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command         | Description                            |
| --------------- | -------------------------------------- |
| `npm run dev`   | Start the development server           |
| `npm run build` | Create an optimized production build   |
| `npm run start` | Serve the production build             |
| `npm run lint`  | Run ESLint via `next lint`             |

> **Tip:** Don't run `npm run build` while `npm run dev` is running against the same
> `.next` folder — it can corrupt the dev cache (`Cannot find module './xxx.js'`). If
> that happens, stop dev, `rm -rf .next`, and restart.

---

## Deploying to Vercel

This is a standard Next.js app, so Vercel auto-detects the framework.

1. Push the repo to GitHub and import it at [vercel.com/new](https://vercel.com/new),
   **or** run `vercel` from the CLI.
2. Add the environment variable in **Project → Settings → Environment Variables**:
   - `INTROW_API_KEY` = your key (select Production / Preview / Development as needed)
   - or via CLI: `vercel env add INTROW_API_KEY`
3. Deploy. Redeploy after changing env vars so the new values are picked up.

---

## Notes

- This is a demo: the company, copy, plans, and dashboard data are all fictional.
- `INTROW_API_KEY` is a secret — keep it out of version control and the client bundle.
