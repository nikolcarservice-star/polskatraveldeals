export type LegalSlug =
  | "regulamin"
  | "polityka-prywatnosci"
  | "polityka-cookies"
  | "ujawnienie-afiliacyjne"
  | "nota-prawna";

export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface LegalDoc {
  slug: LegalSlug;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export const LEGAL_SLUGS: LegalSlug[] = [
  "regulamin",
  "polityka-prywatnosci",
  "polityka-cookies",
  "ujawnienie-afiliacyjne",
  "nota-prawna",
];

/** Maps a URL slug to the matching key inside the `legal.sections` dictionary. */
export const LEGAL_SECTION_KEY: Record<
  LegalSlug,
  "terms" | "privacy" | "cookies" | "affiliate" | "imprint"
> = {
  regulamin: "terms",
  "polityka-prywatnosci": "privacy",
  "polityka-cookies": "cookies",
  "ujawnienie-afiliacyjne": "affiliate",
  "nota-prawna": "imprint",
};
