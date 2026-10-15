import type { Locale } from "@/lib/brand";

const LOCALE_TAGS: Record<Locale, string> = {
  pl: "pl-PL",
  uk: "uk-UA",
  ru: "ru-RU",
  en: "en-GB",
};

export function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(LOCALE_TAGS[locale], {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(LOCALE_TAGS[locale]).format(value);
}

export function formatRating(value: number, locale: Locale): string {
  return new Intl.NumberFormat(LOCALE_TAGS[locale], {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDateTime(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export function joinPath(...parts: (string | number)[]): string {
  return parts
    .map((p) => String(p).replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");
}
