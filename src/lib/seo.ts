import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { getSettings } from "@/lib/settings";

interface SeoInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  index?: boolean;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  index = true,
}: SeoInput): Metadata {
  const settings = getSettings();
  const dictTitle = settings.seo.title;
  const finalTitle = title ? `${title} | ${BRAND.name}` : dictTitle;
  const finalDescription = description ?? settings.seo.description;
  const ogImage = image ?? settings.hero.image;

  return {
    metadataBase: new URL(BRAND.url),
    title: finalTitle,
    description: finalDescription,
    keywords: settings.seo.keywords.split(",").map((k) => k.trim()),
    applicationName: BRAND.name,
    authors: [{ name: BRAND.legalName }],
    creator: BRAND.legalName,
    publisher: BRAND.legalName,
    category: "travel",
    alternates: {
      canonical: BRAND.url + path,
    },
    openGraph: {
      type,
      locale: "pl_PL",
      url: BRAND.url + path,
      siteName: BRAND.name,
      title: finalTitle,
      description: finalDescription,
      images: [{ url: ogImage, width: 1920, height: 1080, alt: BRAND.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [ogImage],
    },
    robots: index
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
      : { index: false, follow: false },
    icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
  };
}

export function pageTitle(title: string | undefined, fallback: string) {
  if (!title) return `${fallback} | ${BRAND.name}`;
  return `${title} | ${BRAND.name}`;
}
