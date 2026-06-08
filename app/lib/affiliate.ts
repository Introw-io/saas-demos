import type { IntrowConversionStatus, IntrowTrackPayload } from "@/global";

/**
 * Client-side affiliate conversion via the affiliate.js snippet
 * (`window.introw.affiliate.track`). The snippet reads the click id from the
 * `_introw_aff` cookie itself, so we only pass the publishable key + payload.
 *
 * The campaign publishable key is safe to expose in the browser bundle; browser
 * conversions are additionally gated by the campaign's Origin allowlist.
 */
export async function trackConversionClientSide(
  input: Omit<IntrowTrackPayload, "publishableKey">
): Promise<IntrowConversionStatus | null> {
  if (typeof window === "undefined") return null;

  const affiliate = window.introw?.affiliate;
  if (!affiliate?.track) {
    console.warn("introw affiliate.js has not loaded yet — skipping client track");
    return null;
  }

  const publishableKey = process.env.NEXT_PUBLIC_INTROW_PUBLISHABLE_KEY;

  try {
    const result = await affiliate.track({
      publishableKey,
      email: input.email,
      properties: input.properties,
    });
    return result?.status ?? null;
  } catch (err) {
    // The browser path must never surface errors on the page.
    console.warn("introw client track failed", err);
    return null;
  }
}
