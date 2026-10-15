import type { Metadata } from "next";
import { DocumentShell } from "@/components/shell";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieBar } from "@/components/cookie-bar";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { DEFAULT_LOCALE, LOCALES, LOCALE_META, type Locale } from "@/lib/brand";
import { buildMetadata } from "@/lib/seo";

/**
 * Only the four supported locales are pre-rendered; anything else under the
 * root segment (`/de`, `/fr`, typos…) must fall through to a 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
    path: "/",
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const dict = getDictionary(lang);

  return (
    <DocumentShell lang={LOCALE_META[lang].htmlLang}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {dict.nav.skipToContent}
      </a>
      <SiteHeader locale={lang} dict={dict} />
      <main id="main">{children}</main>
      <SiteFooter locale={lang} dict={dict} />
      <CookieBar locale={lang} dict={dict} />
    </DocumentShell>
  );
}
