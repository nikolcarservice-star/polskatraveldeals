import type { MetadataRoute } from "next";
import { BRAND, LOCALES, localizedPath } from "@/lib/brand";
import { DESTINATIONS } from "@/lib/data";
import { LEGAL_SLUGS } from "@/content/legal";

const ROUTES = [
  "/",
  "/tours",
  "/flights",
  "/hotels",
  "/excursions",
  "/destinations",
  "/about",
  "/contact",
  "/newsletter",
  "/sitemap",
  ...LEGAL_SLUGS.map((slug) => `/legal/${slug}`),
  ...DESTINATIONS.map((destination) => `/destinations/${destination.slug}`),
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: BRAND.url + localizedPath(locale, route),
      lastModified,
      changeFrequency: (route === "/" ? "daily" : "weekly") as
        | "daily"
        | "weekly",
      priority: route === "/" ? 1 : route.startsWith("/destinations/") ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((lang) => [lang, BRAND.url + localizedPath(lang, route)])
        ),
      },
    }))
  );
}
