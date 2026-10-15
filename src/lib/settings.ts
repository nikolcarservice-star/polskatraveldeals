import rawSettings from "@/content/site-settings.json";

export interface SiteSettings {
  projectName: string;
  legalName: string;
  slogan: string;
  domain: string;
  url: string;
  contactEmail: string;
  supportEmail: string;
  legalEmail: string;
  telegram: string;
  telegramHandle: string;
  seo: { title: string; description: string; keywords: string };
  hero: { eyebrow: string; lead: string; image: string };
  newsletter: { enabled: boolean; audience: string };
  updatedAt: string;
}

export const SITE_SETTINGS = rawSettings as SiteSettings;

export function getSettings(): SiteSettings {
  return SITE_SETTINGS;
}
