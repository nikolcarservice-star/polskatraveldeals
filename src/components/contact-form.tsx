"use client";

import { useActionState, useState } from "react";
import { contact, type FormState } from "@/lib/actions";
import type { Dictionary } from "@/i18n/dictionaries";

const IDLE: FormState = { status: "idle" };

const TOPICS = ["general", "partnership", "press", "privacy"] as const;

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [state, action, pending] = useActionState(contact, IDLE);
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("general");

  const status =
    state.status === "success"
      ? { text: dict.contact.sent, tone: "text-sea-600" }
      : state.status === "error"
        ? { text: dict.contact.sendError, tone: "text-flag-red" }
        : { text: "", tone: "" };

  const field =
    "h-12 w-full rounded-xl border border-ink-900/12 bg-white px-4 text-sm text-ink-900 outline-none transition placeholder:text-ink-600/55 focus:border-navy-600";

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-600">
            {dict.contact.name}
          </span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-600">
            {dict.contact.email}
          </span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-bold uppercase tracking-wider text-ink-600">
          {dict.contact.topic}
        </span>
        <select
          name="topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value as (typeof TOPICS)[number])}
          className={field}
        >
          {TOPICS.map((value) => (
            <option key={value} value={value}>
              {dict.contact.topics[value]}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-bold uppercase tracking-wider text-ink-600">
          {dict.contact.message}
        </span>
        <textarea
          name="message"
          required
          rows={6}
          className={`${field} h-auto resize-y py-3`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="h-12 rounded-full bg-navy-800 px-7 text-sm font-bold text-white transition hover:bg-navy-700 disabled:opacity-70"
        >
          {pending ? dict.contact.sending : dict.contact.send}
        </button>
        <p role="status" aria-live="polite" className={`text-sm font-medium ${status.tone}`}>
          {status.text}
        </p>
      </div>
    </form>
  );
}
