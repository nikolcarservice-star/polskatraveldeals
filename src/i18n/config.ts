import { DEFAULT_LOCALE, LOCALES, LOCALE_META, type Locale } from "@/lib/brand";

export { DEFAULT_LOCALE, LOCALES, LOCALE_META };
export type { Locale };

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value);
}

/** Split "/uk/hotels" -> { locale: "uk", segments: ["hotels"] } */
export function parseLocaleFromPath(pathname: string): {
  locale: Locale;
  segments: string[];
} {
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];
  if (first && first !== DEFAULT_LOCALE && isLocale(first)) {
    return { locale: first, segments: parts.slice(1) };
  }
  return { locale: DEFAULT_LOCALE, segments: parts };
}
