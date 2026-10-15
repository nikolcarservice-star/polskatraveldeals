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

export const SLOGAN = "Odkrywaj świat. Podróżuj taniej.";

export function absoluteUrl(path = ""): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BRAND.url}${clean}`;
}
