"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signup, type SignupState } from "../actions";

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

  return (
    <div>
      <form className="signup" action={formAction}>
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
