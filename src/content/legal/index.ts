import { legalPl } from "./pl";
import { LEGAL_SECTION_KEY, LEGAL_SLUGS, type LegalDoc, type LegalSlug } from "./types";

export { LEGAL_SECTION_KEY, LEGAL_SLUGS };
export type { LegalDoc, LegalSlug };

export function getLegalDoc(slug: LegalSlug): LegalDoc {
  return legalPl[slug];
}

export function isLegalSlug(value: string): value is LegalSlug {
  return (LEGAL_SLUGS as string[]).includes(value);
}
