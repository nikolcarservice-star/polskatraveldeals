"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { BRAND } from "@/lib/brand";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/**
 * Delivery is intentionally provider-agnostic:
 *  1. `RESEND_API_KEY` (+ `EMAIL_TO`) sends the message for real;
 *  2. otherwise the payload is appended to `content/outbox`, which works in
 *     local development;
 *  3. on a read-only host (Vercel) the payload is written to the function log
 *     so nothing is silently discarded.
 */
async function deliver(subject: string, payload: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  const target = process.env.EMAIL_TO ?? BRAND.email;

  if (apiKey) {
    try {
      const body = Object.entries(payload)
        .map(([key, value]) => `<p><strong>${key}:</strong> ${String(value)}</p>`)
        .join("");
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM ?? `${BRAND.name} <onboarding@resend.dev>`,
          to: [target],
          reply_to: String(payload.email ?? target),
          subject,
          html: `<h2>${BRAND.name}</h2>${body}`,
        }),
      });
      return;
    } catch {
      /* fall through to the local outbox */
    }
  }

  const entry = JSON.stringify({ subject, at: new Date().toISOString(), payload }) + "\n";
  try {
    const dir = path.join(process.cwd(), "content", "outbox");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(path.join(dir, "messages.ndjson"), entry, "utf8");
  } catch {
    console.info(`[POLSKA TRAVEL DEALS] ${entry.trim()}`);
  }
}

export async function subscribe(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!isEmail(email)) {
    return { status: "error", message: "invalid-email" };
  }
  await deliver(`${BRAND.name} · newsletter opt-in`, { email, source: "newsletter" });
  return { status: "success", message: "subscribed" };
}

export async function contact(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const topic = String(formData.get("topic") ?? "general").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !isEmail(email) || !message) {
    return { status: "error", message: "invalid" };
  }

  await deliver(`${BRAND.name} · ${topic}`, { name, email, topic, message });
  return { status: "success", message: "sent" };
}
