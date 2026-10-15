/**
 * POLSKA TRAVEL DEALS — single source of truth for brand identity.
 * Every surface (site, admin, SEO, e-mail templates, legal pages)
 * must read the brand from here.
 */

export const BRAND = {
  name: "POLSKA TRAVEL DEALS",
  legalName: "Polska Travel Deals",
  shortName: "PTD",
  domain: "polskatraveldeals.vercel.app",
  url: "https://polskatraveldeals.vercel.app",
  telegram: "https://t.me/polska_travel_deals",
  telegramHandle: "@polska_travel_deals",
  email: "kontakt@polskatraveldeals.vercel.app",
  supportEmail: "pomoc@polskatraveldeals.vercel.app",
  legalEmail: "rodo@polskatraveldeals.vercel.app",
  language: "pl",
  foundedYear: 2026,
} as const;

export const SLOGANS = {
  pl: "Odkrywaj świat. Podróżuj taniej.",
  uk: "Відкривай світ. Подорожуй дешевше.",
  ru: "Открывай мир. Путешествуй дешевле.",
  en: "Discover the world. Travel for less.",
} as const;

export const LOCALE_META = {
  pl: { code: "pl", htmlLang: "pl", name: "Polski", flag: "🇵🇱", hreflang: "pl" },
  uk: { code: "uk", htmlLang: "uk", name: "Українська", flag: "🇺🇦", hreflang: "uk" },
  ru: { code: "ru", htmlLang: "ru", name: "Русский", flag: "🇷🇺", hreflang: "ru" },
  en: { code: "en", htmlLang: "en", name: "English", flag: "🇬🇧", hreflang: "en" },
} as const;

export type Locale = keyof typeof LOCALE_META;
export const LOCALES = Object.keys(LOCALE_META) as Locale[];
export const DEFAULT_LOCALE: Locale = "pl";

/** Prefix used in the URL — the default locale lives at the root. */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

export function absoluteUrl(path = ""): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BRAND.url}${clean}`;
}

export function localizedPath(locale: Locale, path = ""): string {
  const clean = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${localePrefix(locale)}${clean}` || "/";
}
