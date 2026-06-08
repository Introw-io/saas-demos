"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { signup, type SignupState } from "../actions";
import { trackConversionClientSide } from "../lib/affiliate";

const initialState: SignupState = { status: "idle", message: "" };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Waddling…" : label}
    </button>
  );
}

export default function SignupForm({
  buttonLabel = "Claim your iceberg",
  placeholder = "you@colony.com",
}: {
  buttonLabel?: string;
  placeholder?: string;
}) {
  const [state, formAction] = useActionState(signup, initialState);

  // Remember the email submitted so the client-side conversion can include it.
  const lastEmailRef = useRef("");

  function handleAction(formData: FormData) {
    lastEmailRef.current = String(formData.get("email") ?? "");
    return formAction(formData);
  }

  // Client-side conversion (Option A). The server action already records the
  // server-to-server conversion (Option B); both anchor to the same _introw_aff
  // click id, so Introw deduplicates and this resolves as `duplicate`.
  useEffect(() => {
    if (state.status === "success") {
      void trackConversionClientSide({
        email: lastEmailRef.current || undefined,
        properties: { plan: "free", source: "marketing-signup" },
      });
    }
  }, [state.status]);

  return (
    <div>
      <form className="signup" action={handleAction}>
        <input
          type="email"
          name="email"
          placeholder={placeholder}
          aria-label="Email address"
          required
        />
        <SubmitButton label={buttonLabel} />
      </form>

      {state.status === "success" && (
        <div className="alert alert-success" role="status">
          {state.message}
        </div>
      )}
      {state.status === "error" && (
        <div className="alert alert-error" role="alert">
          {state.message}
        </div>
      )}

      {state.status === "idle" && (
        <p className="form-note">No credit card. No squawking salespeople. Cancel anytime.</p>
      )}
    </div>
  );
}
