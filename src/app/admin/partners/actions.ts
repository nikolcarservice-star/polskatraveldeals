"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  PARTNERS,
  PARTNER_KEYS,
  type Partner,
  type PartnerKey,
  type PartnerStatus,
  type PartnersFile,
} from "@/lib/partners";
import type { Offer } from "@/lib/offers";
import type { FormState } from "@/lib/actions";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

async function readJson<T>(file: string): Promise<T | null> {
  try {
    return JSON.parse(await fs.readFile(path.join(CONTENT_DIR, file), "utf8")) as T;
  } catch {
    return null;
  }
}

async function writeJson(file: string, data: unknown): Promise<void> {
  await fs.writeFile(path.join(CONTENT_DIR, file), JSON.stringify(data, null, 2) + "\n", "utf8");
  revalidatePath("/", "layout");
}

function text(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function isPartnerKey(value: string): value is PartnerKey {
  return (PARTNER_KEYS as string[]).includes(value);
}

function isStatus(value: string): value is PartnerStatus {
  return value === "approved" || value === "pending" || value === "disabled";
}

/**
 * Saves one partner programme to `content/partners.json`.
 * Turns of the read-only hosting environments return `write-failed`, which the
 * panel surfaces verbatim — no silent success.
 */
export async function savePartner(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAdminAuthenticated())) return { status: "error", message: "unauthorized" };

  const key = text(formData, "key");
  if (!isPartnerKey(key)) return { status: "error", message: "invalid" };

  const file = (await readJson<PartnersFile>("partners.json")) ?? PARTNERS;
  const current = file[key];
  const status = text(formData, "status");
  if (!isStatus(status)) return { status: "error", message: "invalid" };

  const ctaPl = text(formData, "ctaPl");
  const ctaUk = text(formData, "ctaUk");
  const ctaRu = text(formData, "ctaRu");
  const ctaEn = text(formData, "ctaEn");

  const links = text(formData, "links")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [label = "", url = "", enabled = "1"] = line.split("|").map((part) => part.trim());
      return {
        id: `${key}-link-${index + 1}`,
        label,
        url,
        enabled: enabled !== "0",
      };
    })
    .filter((link) => Boolean(link.label && link.url));

  const next: Partner = {
    ...current,
    status,
    enabled: formData.get("enabled") === "on",
    affiliateId: text(formData, "affiliateId"),
    tokenParam: text(formData, "tokenParam"),
    homepage: text(formData, "homepage"),
    searchUrlTemplate: text(formData, "searchUrlTemplate"),
    allowedHosts: text(formData, "allowedHosts")
      .split(/[,\s]+/)
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean),
    tools: {
      search: formData.get("toolSearch") === "on",
      deepLinks: formData.get("toolDeepLinks") === "on",
      widget: formData.get("toolWidget") === "on",
      banners: formData.get("toolBanners") === "on",
      manualOffers: formData.get("toolManualOffers") === "on",
    },
    widgetCode: text(formData, "widgetCode"),
    cta: {
      ...current.cta,
      label: {
        ...current.cta.label,
        pl: ctaPl || current.cta.label.pl,
        uk: ctaUk || current.cta.label.uk,
        ru: ctaRu || current.cta.label.ru,
        en: ctaEn || current.cta.label.en,
      },
    },
    links,
    note: text(formData, "note"),
  };

  const registry: PartnersFile = { ...file, [key]: next };

  try {
    await writeJson("partners.json", registry);
    return { status: "success", message: "saved" };
  } catch {
    return { status: "error", message: "write-failed" };
  }
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

/**
 * Adds or updates a manual (TravelLead) offer. The destination URL must be
 * http(s) and its host must be on the partner allowlist, otherwise the offer
 * could never be published honestly.
 */
export async function saveManualOffer(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAdminAuthenticated())) return { status: "error", message: "unauthorized" };

  const offers = (await readJson<Offer[]>("offers.json")) ?? [];
  const partners = (await readJson<PartnersFile>("partners.json")) ?? PARTNERS;
  const travellead = partners.travellead;

  const url = text(formData, "url");
  if (!/^https?:\/\//i.test(url)) return { status: "error", message: "invalid" };

  const allowed = travellead.allowedHosts;
  let host = "";
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return { status: "error", message: "invalid" };
  }
  const hostOk =
    allowed.length > 0 &&
    allowed.some((entry) => host === entry || host.endsWith(`.${entry}`));
  if (!hostOk) return { status: "error", message: "hosts-first" };

  const titlePl = text(formData, "titlePl");
  const price = Number(text(formData, "price"));
  const source = text(formData, "source");
  if (!titlePl || !source || !Number.isFinite(price) || price <= 0) {
    return { status: "error", message: "invalid" };
  }

  const editingId = text(formData, "id");
  const baseId = editingId || slugify(titlePl) || `travellead-${Date.now()}`;
  const id = editingId
    ? baseId
    : offers.some((offer) => offer.id === baseId)
      ? `${baseId}-${Date.now().toString(36)}`
      : baseId;

  const rating = Number(text(formData, "rating")) || 0;
  const reviews = Number(text(formData, "reviews")) || 0;
  const nights = Number(text(formData, "nights")) || undefined;

  const offer: Offer = {
    id,
    kind: "tour",
    partner: "travellead",
    url,
    source,
    published: formData.get("published") === "on",
    title: {
      pl: titlePl,
      uk: text(formData, "titleUk") || titlePl,
      ru: text(formData, "titleRu") || titlePl,
      en: text(formData, "titleEn") || titlePl,
    },
    destination: text(formData, "destination") || undefined,
    image: text(formData, "image") || undefined,
    price,
    rating: Math.min(5, Math.max(0, rating)),
    reviews: Math.max(0, Math.round(reviews)),
    nights: nights && nights > 0 ? Math.round(nights) : undefined,
  };

  const index = offers.findIndex((item) => item.id === id);
  const next = index >= 0 ? offers.map((item) => (item.id === id ? offer : item)) : [...offers, offer];

  try {
    await writeJson("offers.json", next);
    return { status: "success", message: "saved" };
  } catch {
    return { status: "error", message: "write-failed" };
  }
}

export async function deleteManualOffer(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAdminAuthenticated())) return { status: "error", message: "unauthorized" };

  const id = text(formData, "id");
  if (!id) return { status: "error", message: "invalid" };

  const offers = (await readJson<Offer[]>("offers.json")) ?? [];
  const next = offers.filter((offer) => offer.id !== id);
  if (next.length === offers.length) return { status: "error", message: "invalid" };

  try {
    await writeJson("offers.json", next);
    return { status: "success", message: "saved" };
  } catch {
    return { status: "error", message: "write-failed" };
  }
}

/** Flips the public visibility switch of any catalogue row (any programme). */export async function toggleOfferPublished(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAdminAuthenticated())) return { status: "error", message: "unauthorized" };

  const id = text(formData, "id");
  if (!id) return { status: "error", message: "invalid" };

  const offers = (await readJson<Offer[]>("offers.json")) ?? [];
  const next = offers.map((offer) =>
    offer.id === id ? { ...offer, published: !offer.published } : offer
  );
  if (!next.some((offer) => offer.id === id)) return { status: "error", message: "invalid" };

  try {
    await writeJson("offers.json", next);
    return { status: "success", message: "saved" };
  } catch {
    return { status: "error", message: "write-failed" };
  }
}

/** Plain form action wrapper (React `<form action>` cannot consume FormState). */
export async function deleteOfferAction(formData: FormData): Promise<void> {
  await deleteManualOffer(IDLE, formData);
}

const IDLE: FormState = { status: "idle" };
