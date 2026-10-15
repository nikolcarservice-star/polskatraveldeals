import type { Locale } from "@/lib/brand";
import { legalPl } from "./pl";
import { legalUk } from "./uk";
import { legalRu } from "./ru";
import { legalEn } from "./en";
import { LEGAL_SECTION_KEY, LEGAL_SLUGS, type LegalDoc, type LegalSlug } from "./types";

export { LEGAL_SECTION_KEY, LEGAL_SLUGS };
export type { LegalDoc, LegalSlug };

const DOCS: Record<Locale, Record<LegalSlug, LegalDoc>> = {
  pl: legalPl,
  uk: legalUk,
  ru: legalRu,
  en: legalEn,
};

export function getLegalDoc(slug: LegalSlug, locale: Locale): LegalDoc {
  const docs = DOCS[locale] ?? DOCS.pl;
  return docs[slug] ?? DOCS.pl[slug];
}

export function isLegalSlug(value: string): value is LegalSlug {
  return (LEGAL_SLUGS as string[]).includes(value);
}
