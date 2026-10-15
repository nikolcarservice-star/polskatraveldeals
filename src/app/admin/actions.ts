"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, adminPassword, isAdminAuthenticated, sessionToken } from "@/lib/admin-auth";
import { getSettings, type SiteSettings } from "@/lib/settings";
import type { FormState } from "@/lib/actions";

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  if (!password) return { status: "error", message: "required" };
  if (password !== adminPassword()) return { status: "error", message: "invalid" };

  const store = await cookies();
  store.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return { status: "success" };
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin");
}

const FIELDS = [
  "projectName",
  "legalName",
  "slogan",
  "domain",
  "url",
  "contactEmail",
  "supportEmail",
  "legalEmail",
  "telegram",
  "telegramHandle",
] as const;

export async function saveSettings(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAdminAuthenticated())) return { status: "error", message: "unauthorized" };

  const current = getSettings();
  const next: SiteSettings = {
    ...current,
    seo: { ...current.seo },
    hero: { ...current.hero },
    newsletter: { ...current.newsletter },
  };

  for (const field of FIELDS) {
    const value = formData.get(field);
    if (typeof value === "string") next[field] = value.trim();
  }

  const seoTitle = formData.get("seoTitle");
  const seoDescription = formData.get("seoDescription");
  const seoKeywords = formData.get("seoKeywords");
  if (typeof seoTitle === "string") next.seo.title = seoTitle.trim();
  if (typeof seoDescription === "string") next.seo.description = seoDescription.trim();
  if (typeof seoKeywords === "string") next.seo.keywords = seoKeywords.trim();

  const heroEyebrow = formData.get("heroEyebrow");
  const heroLead = formData.get("heroLead");
  const heroImage = formData.get("heroImage");
  if (typeof heroEyebrow === "string") next.hero.eyebrow = heroEyebrow.trim();
  if (typeof heroLead === "string") next.hero.lead = heroLead.trim();
  if (typeof heroImage === "string") next.hero.image = heroImage.trim();

  next.newsletter.enabled = formData.get("newsletterEnabled") === "on";
  next.updatedAt = new Date().toISOString();

  try {
    const target = path.join(process.cwd(), "src", "content", "site-settings.json");
    await fs.writeFile(target, JSON.stringify(next, null, 2) + "\n", "utf8");
    revalidatePath("/", "layout");
    return { status: "success", message: "saved" };
  } catch {
    return { status: "error", message: "write-failed" };
  }
}
