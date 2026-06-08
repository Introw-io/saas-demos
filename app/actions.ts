"use server";

import { cookies } from "next/headers";

const TRACK_ENDPOINT = "https://api.introw.io/api/v1/affiliate/conversions";

// First-party cookie set by affiliate.js after it reads the `irw_id` param.
const CLICK_COOKIE = "_introw_aff";

export type SignupState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function signup(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email || !EMAIL_RE.test(email)) {
    return {
      status: "error",
      message: "Please enter a valid email so we can reserve your iceberg.",
    };
  }

  const apiKey = process.env.INTROW_API_KEY;
  if (!apiKey) {
    console.error("INTROW_API_KEY is not set — cannot record affiliate conversion");
    return {
      status: "error",
      message: "Our penguins dropped the fish. Please try again in a moment.",
    };
  }

  // Server-to-server attribution: send the signed click id captured from the
  // _introw_aff cookie. The endpoint requires a non-empty clickId string (a
  // missing one is a 422), so when the visitor didn't arrive via an affiliate
  // link we simply skip attribution and let the signup succeed.
  const clickId = (await cookies()).get(CLICK_COOKIE)?.value;
  if (!clickId) {
    return {
      status: "success",
      message:
        "You're in! Check your inbox — a penguin is waddling over with next steps.",
    };
  }

  try {
    const res = await fetch(TRACK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        clickId,
        email,
        properties: { plan: "free", source: "marketing-signup" },
      }),
      cache: "no-store",
    });

    // The endpoint is intentionally lenient:
    //   recorded (201) | duplicate (200) | ignored (200)
    // Only genuine transport/auth failures (non-2xx) should surface as an error.
    const payload = (await res.json().catch(() => ({}))) as {
      status?: "recorded" | "duplicate" | "ignored";
    };

    if (!res.ok) {
      console.error("introw conversion failed", res.status, payload.status);
      return {
        status: "error",
        message:
          "Our penguins dropped the fish. Please try again in a moment.",
      };
    }

    console.info("introw conversion", payload.status ?? "unknown");

    return {
      status: "success",
      message:
        "You're in! Check your inbox — a penguin is waddling over with next steps.",
    };
  } catch (err) {
    console.error("introw conversion error", err);
    return {
      status: "error",
      message: "Something slipped on the ice. Please try again.",
    };
  }
}
