import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { DEFAULT_LOCALE, type Locale } from "@/lib/brand";
import { offersByKind } from "@/lib/offers";
import { buildMetadata } from "@/lib/seo";
import { CategoryView } from "@/components/category-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  return buildMetadata({
    locale: lang,
    title: dict.nav.excursions,
    description: dict.categories.items.excursions.desc,
    path: "/excursions",
  });
}

export default async function ExcursionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const dict = getDictionary(lang);

  return (
    <CategoryView
      locale={lang}
      dict={dict}
      kind="excursion"
      title={dict.nav.excursions}
      lead={dict.categories.items.excursions.desc}
      offers={offersByKind("excursion")}
    />
  );
}
