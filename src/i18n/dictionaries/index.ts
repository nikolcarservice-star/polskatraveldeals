import { pl, type Dictionary } from "./pl";
import { uk } from "./uk";
import { ru } from "./ru";
import { en } from "./en";
import { DEFAULT_LOCALE, type Locale } from "@/lib/brand";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { pl, uk, ru, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

/** Replace `{token}` placeholders inside translated strings. */
export function interpolate(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
}
