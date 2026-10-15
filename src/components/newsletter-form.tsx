"use client";

import { useActionState } from "react";
import { subscribe, type FormState } from "@/lib/actions";
import type { Dictionary } from "@/i18n/dictionaries";

const IDLE: FormState = { status: "idle" };

export function NewsletterForm({
  dict,
  tone = "light",
}: {
  dict: Dictionary;
  tone?: "light" | "dark";
}) {
  const [state, action, pending] = useActionState(subscribe, IDLE);
  const dark = tone === "dark";

  const message =
    state.status === "success"
      ? dict.newsletter.success
      : state.status === "error"
        ? dict.newsletter.invalidEmail
        : "";

  return (
    <div>
      <form action={action} className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">{dict.newsletter.placeholder}</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder={dict.newsletter.placeholder}
            className={[
              "h-13 w-full rounded-full border px-5 py-3.5 text-sm outline-none transition",
              dark
                ? "border-white/20 bg-white/10 text-white placeholder:text-white/55 focus:border-gold-400"
                : "border-ink-900/12 bg-white text-ink-900 placeholder:text-ink-600/60 focus:border-navy-600",
            ].join(" ")}
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="h-13 shrink-0 rounded-full bg-gold-500 px-7 text-sm font-bold text-ink-950 transition hover:bg-gold-400 disabled:opacity-70"
        >
          {pending ? dict.common.loading : dict.newsletter.cta}
        </button>
      </form>

      <p
        role="status"
        aria-live="polite"
        className={[
          "mt-3 min-h-5 text-xs",
          state.status === "error" ? "text-flag-red" : dark ? "text-gold-300" : "text-sea-600",
        ].join(" ")}
      >
        {message}
      </p>

      <p className={`text-xs ${dark ? "text-white/55" : "text-ink-600/75"}`}>
        {dict.newsletter.note}
      </p>
    </div>
  );
}
