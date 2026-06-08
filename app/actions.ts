"use server";

const TRACK_ENDPOINT = "https://app.introw.io/api/v1/affiliate/track";

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

  try {
    const res = await fetch(TRACK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
      cache: "no-store",
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("introw track failed", res.status, detail);
      return {
        status: "error",
        message:
          "Our penguins dropped the fish. Please try again in a moment.",
      };
    }

    return {
      status: "success",
      message: "You're in! Check your inbox — a penguin is waddling over with next steps.",
    };
  } catch (err) {
    console.error("introw track error", err);
    return {
      status: "error",
      message: "Something slipped on the ice. Please try again.",
    };
  }
}
