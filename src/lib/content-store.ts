import { promises as fs } from "node:fs";
import path from "node:path";
import { OFFERS, type Offer } from "@/lib/offers";
import { PARTNERS, type PartnersFile } from "@/lib/partners";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

/**
 * Reads admin-editable content from disk first (so panel changes are visible
 * immediately in dev / self-hosted setups) and falls back to the copy bundled
 * at build time on read-only hosts such as Vercel serverless.
 */
async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(path.join(CONTENT_DIR, file), "utf8")) as T;
  } catch {
    return fallback;
  }
}

export function readPartnersFile(): Promise<PartnersFile> {
  return readJson<PartnersFile>("partners.json", PARTNERS);
}

export function readOffersFile(): Promise<Offer[]> {
  return readJson<Offer[]>("offers.json", OFFERS as unknown as Offer[]);
}
