import type { Metadata } from "next";
import Link from "next/link";
import { dict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { NewsletterForm } from "@/components/newsletter-form";
import { Icon } from "@/components/icon";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: dict.newsletterPage.title,
    description: dict.newsletterPage.description,
    path: "/newsletter",
  });
}

const BENEFITS = ["compare", "tag", "clock"] as const;

export default function NewsletterPage() {
  const benefitTexts = [
    dict.newsletter.title,
    dict.how.steps.two.desc,
    dict.contact.responseTimeValue,
  ];

  return (
    <>
      <section className="bg-navy-900 pt-12 pb-24 md:pt-16 md:pb-32">
        <div className="container-page flex flex-col items-start gap-5">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
            {dict.footer.newsletterTitle}
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-white text-balance-heavy sm:text-5xl">
            {dict.newsletter.title}
          </h1>
          <p className="max-w-2xl leading-relaxed text-ivory-200/75">{dict.newsletter.lead}</p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-14 md:grid-cols-2 md:py-20">
        <div className="surface-card flex flex-col gap-5 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-ink-950">
            {dict.newsletterPage.title}
          </h2>
          <NewsletterForm dict={dict} />
          <Link
            href="/legal/polityka-prywatnosci"
            className="text-xs font-semibold text-navy-700 underline-offset-4 transition hover:text-gold-600 hover:underline"
          >
            {dict.newsletter.note}
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {BENEFITS.map((name, index) => (
            <div key={name} className="flex gap-4 rounded-2xl border border-ink-900/10 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
                <Icon name={name} size={20} />
              </span>
              <p className="text-sm leading-relaxed text-ink-700">{benefitTexts[index]}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-navy-800/15 bg-navy-800/5 p-5">
            <p className="text-xs leading-relaxed text-ink-600">{dict.emails.unsubscribeText}</p>
            <p className="mt-2 text-xs leading-relaxed text-ink-600">{dict.affiliate.note}</p>
          </div>
        </div>
      </section>
    </>
  );
}
