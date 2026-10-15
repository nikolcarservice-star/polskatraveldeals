import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { BRAND, DEFAULT_LOCALE, type Locale } from "@/lib/brand";
import { getSettings } from "@/lib/settings";
import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/icon";

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
    title: dict.contact.title,
    description: dict.contact.lead,
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const dict = getDictionary(lang);
  const settings = getSettings();

  const faqKeys = ["booking", "cost", "data"] as const;

  return (
    <>
      <section className="bg-navy-900 pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="container-page flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
            {dict.nav.contact}
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-white text-balance-heavy sm:text-5xl">
            {dict.contact.title}
          </h1>
          <p className="max-w-2xl leading-relaxed text-ivory-200/75">{dict.contact.lead}</p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-14 md:grid-cols-[1.3fr_1fr] md:py-20">
        <div className="surface-card p-6 sm:p-8">
          <h2 className="mb-6 font-display text-2xl font-semibold text-ink-950">
            {dict.contact.formTitle}
          </h2>
          <ContactForm dict={dict} />
        </div>

        <div className="flex flex-col gap-5">
          <div className="surface-card flex gap-4 p-6">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
              <Icon name="device" size={20} />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-ink-950">
                {dict.contact.infoTitle}
              </h3>
              <a
                href={`mailto:${settings.contactEmail || BRAND.email}`}
                className="mt-1 block text-sm font-semibold text-navy-700 transition hover:text-gold-600"
              >
                {settings.contactEmail || BRAND.email}
              </a>
              <a
                href={`mailto:${settings.legalEmail || BRAND.legalEmail}`}
                className="mt-1 block text-sm text-ink-600 transition hover:text-navy-700"
              >
                {settings.legalEmail || BRAND.legalEmail}
              </a>
            </div>
          </div>

          <div className="surface-card flex gap-4 p-6">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
              <Icon name="clock" size={20} />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-ink-950">
                {dict.contact.responseTime}
              </h3>
              <p className="mt-1 text-sm text-ink-600">{dict.contact.responseTimeValue}</p>
            </div>
          </div>

          <div className="surface-card flex gap-4 p-6">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
              <Icon name="headset" size={20} />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-lg font-semibold text-ink-950">
                {dict.contact.telegramTitle}
              </h3>
              <p className="text-sm text-ink-600">{dict.contact.telegramText}</p>
              <a
                href={BRAND.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-navy-700 transition hover:text-gold-600"
              >
                {dict.contact.openTelegram} <span aria-hidden="true">↗</span>
                <span className="text-xs font-medium text-ink-600">{BRAND.telegramHandle}</span>
              </a>
            </div>
          </div>

          <div className="rounded-card border border-navy-800/15 bg-navy-800/5 p-6">
            <p className="text-xs leading-relaxed text-ink-600">{dict.affiliate.note}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container-page max-w-4xl">
          <h2 className="mb-8 font-display text-3xl font-semibold text-ink-950">
            {dict.contact.faqTitle}
          </h2>
          <div className="flex flex-col gap-3">
            {faqKeys.map((key) => (
              <details
                key={key}
                className="group rounded-2xl border border-ink-900/10 bg-ivory-50 p-5 open:border-navy-800/25"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-ink-950">
                  {dict.contact.faq[key].q}
                  <span className="text-gold-600 transition group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">
                  {dict.contact.faq[key].a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
