import Sidebar from "../Sidebar";

export const dynamic = "force-dynamic";

async function getSessionUrl(): Promise<string | null> {
  const apiKey = process.env.INTROW_API_KEY;
  if (!apiKey) {
    console.error("INTROW_API_KEY is not set");
    return null;
  }

  const body = new URLSearchParams();
  body.append("email", "embed@introw.io");

  const headers = new Headers();
  headers.append("x-api-key", apiKey);

  const request = await fetch("https://app.introw.io/api/v1/auth/session", {
    body,
    headers,
    method: "POST",
  });

  const raw = await request.text();

  if (!request.ok) {
    console.error("introw session failed", request.status, raw);
    return null;
  }

  try {
    const result = JSON.parse(raw) as { url?: string };
    return result.url ?? null;
  } catch {
    console.error("introw session returned non-JSON body", raw);
    return null;
  }
}

export default async function IntrowPage() {
  const url = await getSessionUrl();

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="app-main">
        {url ? (
          <iframe src={url} className="h-full w-full" />
        ) : (
          <section className="coming-soon">
            <div>
              <div className="berg">🐧</div>
              <h1>
                Something <span className="grad">slipped on the ice</span>
              </h1>
              <p>
                We couldn&apos;t start your Introw session. 
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
