"use client";

import { useMemo, useState, useActionState } from "react";
import Link from "next/link";
import { DESTINATIONS } from "@/lib/data";
import { PARTNERS, PARTNER_LIST } from "@/lib/partners";
import { OFFERS, offerTitle, visibleOffers } from "@/lib/offers";
import { formatPrice } from "@/lib/format";
import type { SiteSettings } from "@/lib/settings";
import type { Dictionary } from "@/i18n/dictionaries";
import { login as loginAction, logout, saveSettings } from "@/app/admin/actions";
import {
  confirmEmailParts,
  dealEmailParts,
  welcomeEmailParts,
} from "@/lib/email-templates";

type Tab = "dashboard" | "content" | "offers" | "emails";
type FormState = { status: "idle" | "success" | "error"; message?: string };

const IDLE: FormState = { status: "idle" };

const input =
  "h-11 w-full rounded-xl border border-ink-900/12 bg-white px-3.5 text-sm text-ink-900 outline-none transition focus:border-navy-600";
const label = "text-xs font-bold uppercase tracking-wider text-ink-600";

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "rounded-full px-4 py-2 text-sm font-semibold transition",
        active ? "bg-navy-800 text-white" : "border border-ink-900/12 bg-white text-ink-700",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Field({
  name,
  value,
  dict,
  multiline = false,
}: {
  name: string;
  value: string;
  dict: Dictionary;
  multiline?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={label}>{dict.admin.field[name as keyof typeof dict.admin.field] ?? name}</span>
      {multiline ? (
        <textarea name={name} rows={3} defaultValue={value} className={`${input} h-auto py-2.5`} />
      ) : (
        <input name={name} defaultValue={value} className={input} />
      )}
    </label>
  );
}

export function AdminPanel({
  settings,
  counts,
  dictionary,
}: {
  settings: SiteSettings;
  counts: { pages: number; offers: number };
  dictionary: Dictionary;
}) {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [state, formAction, pending] = useActionState(saveSettings, IDLE);
  const dict = dictionary;
  const [template, setTemplate] = useState<"welcome" | "confirm" | "deal">("welcome");
  const [copied, setCopied] = useState(false);

  const email = useMemo(() => {
    if (template === "welcome") return welcomeEmailParts();
    if (template === "confirm") return confirmEmailParts();
    const destination = DESTINATIONS[0];
    const live = visibleOffers({ destination: destination.slug });
    const minPrice = live.length ? Math.min(...live.map((offer) => offer.price)) : null;
    return dealEmailParts({
      destination: destination.name,
      price: minPrice !== null ? formatPrice(minPrice) : "—",
      url: `https://polskatraveldeals.vercel.app/destinations/${destination.slug}`,
    });
  }, [template]);

  const statusText =
    state.status === "success"
      ? dict.admin.saved
      : state.status === "error"
        ? state.message === "write-failed"
          ? dict.admin.saveError
          : dict.admin.saveError
        : "";

  function exportJson() {
    const payload = {
      brand: {
        projectName: settings.projectName,
        legalName: settings.legalName,
        slogan: settings.slogan,
      },
      settings,
      partners: PARTNERS,
      offers: OFFERS,
      destinations: DESTINATIONS.map((d) => ({ slug: d.slug, name: d.name, region: d.region })),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "polska-travel-deals-export.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email.html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-ivory-100">
      <header className="border-b border-ink-900/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-600">
              {dict.admin.brand}
            </p>
            <h1 className="font-display text-xl font-semibold text-ink-950">{dict.admin.title}</h1>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="h-10 rounded-full border border-ink-900/12 px-5 text-sm font-semibold text-ink-700 transition hover:border-navy-600 hover:text-navy-700"
            >
              {dict.admin.logout}
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-8">
        <nav className="mb-8 flex flex-wrap gap-2">
          <TabButton active={tab === "dashboard"} onClick={() => setTab("dashboard")}>
            {dict.admin.dashboard}
          </TabButton>
          <TabButton active={tab === "content"} onClick={() => setTab("content")}>
            {dict.admin.content}
          </TabButton>
          <TabButton active={tab === "offers"} onClick={() => setTab("offers")}>
            {dict.admin.offers}
          </TabButton>
          <TabButton active={tab === "emails"} onClick={() => setTab("emails")}>
            {dict.admin.emails}
          </TabButton>
        </nav>

        {tab === "dashboard" ? (
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: dict.admin.stats.pages, value: counts.pages },
                { label: dict.admin.stats.offers, value: counts.offers },
                {
                  label: dict.admin.stats.lastSaved,
                  value: new Date(settings.updatedAt).toLocaleDateString("pl-PL"),
                },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-ink-900/8 bg-white p-5">
                  <p className={label}>{item.label}</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-navy-800">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-gold-500/30 bg-gold-500/8 p-5 text-sm leading-relaxed text-ink-800">
              {dict.admin.deployWarning}
            </div>

            <div className="rounded-2xl border border-ink-900/8 bg-white p-5">
              <p className={label}>Partnerzy</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                BOOKING_AID / AVIASALES_MARKER / TRIP_AID / TRAVELLEAD_ID
              </p>
              <p className="mt-2 text-xs text-ink-600">
                ADMIN_PASSWORD: {process.env.ADMIN_PASSWORD ? "?" : "default (ptd-admin)"}
              </p>
            </div>
          </div>
        ) : null}

        {tab === "content" ? (
          <form action={formAction} className="flex flex-col gap-6">
            <section className="rounded-2xl border border-ink-900/8 bg-white p-6">
              <h2 className="mb-4 font-display text-lg font-semibold text-ink-950">
                {dict.admin.sections.brand}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="projectName" value={settings.projectName} dict={dict} />
                <Field name="slogan" value={settings.slogan} dict={dict} />
                <Field name="legalName" value={settings.legalName} dict={dict} />
                <Field name="domain" value={settings.domain} dict={dict} />
                <Field name="url" value={settings.url} dict={dict} />
                <Field name="contactEmail" value={settings.contactEmail} dict={dict} />
                <Field name="supportEmail" value={settings.supportEmail} dict={dict} />
                <Field name="legalEmail" value={settings.legalEmail} dict={dict} />
              </div>
            </section>

            <section className="rounded-2xl border border-ink-900/8 bg-white p-6">
              <h2 className="mb-4 font-display text-lg font-semibold text-ink-950">
                {dict.admin.sections.telegram}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="telegram" value={settings.telegram} dict={dict} />
                <Field name="telegramHandle" value={settings.telegramHandle} dict={dict} />
              </div>
            </section>

            <section className="rounded-2xl border border-ink-900/8 bg-white p-6">
              <h2 className="mb-4 font-display text-lg font-semibold text-ink-950">
                {dict.admin.sections.seo}
              </h2>
              <div className="grid gap-4">
                <Field name="seoTitle" value={settings.seo.title} dict={dict} />
                <Field name="seoDescription" value={settings.seo.description} dict={dict} multiline />
                <Field name="seoKeywords" value={settings.seo.keywords} dict={dict} multiline />
              </div>
            </section>

            <section className="rounded-2xl border border-ink-900/8 bg-white p-6">
              <h2 className="mb-4 font-display text-lg font-semibold text-ink-950">
                {dict.admin.sections.home}
              </h2>
              <div className="grid gap-4">
                <Field name="heroEyebrow" value={settings.hero.eyebrow} dict={dict} />
                <Field name="heroLead" value={settings.hero.lead} dict={dict} multiline />
                <Field name="heroImage" value={settings.hero.image} dict={dict} multiline />
                <label className="flex items-center gap-3 text-sm font-semibold text-ink-800">
                  <input
                    type="checkbox"
                    name="newsletterEnabled"
                    defaultChecked={settings.newsletter.enabled}
                    className="h-4 w-4 accent-[#cfa037]"
                  />
                  {dict.footer.newsletterTitle}
                </label>
              </div>
            </section>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={pending}
                className="h-12 rounded-full bg-navy-800 px-7 text-sm font-bold text-white transition hover:bg-navy-700 disabled:opacity-70"
              >
                {pending ? dict.common.loading : dict.admin.save}
              </button>
              <p role="status" aria-live="polite" className="text-sm font-semibold text-sea-600">
                {statusText}
              </p>
            </div>
          </form>
        ) : null}

        {tab === "offers" ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink-600">{dict.partners.adminLead}</p>
              <Link
                href="/admin/partners"
                className="inline-flex h-11 items-center rounded-full bg-navy-800 px-6 text-sm font-semibold text-white transition hover:bg-navy-700"
              >
                {dict.partners.manage} →
              </Link>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-ink-900/8 bg-white">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-b border-ink-900/8 text-xs uppercase tracking-wider text-ink-600">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">{dict.search.filters}</th>
                    <th className="px-4 py-3">{dict.partners.offerTitle}</th>
                    <th className="px-4 py-3">{dict.common.currency}</th>
                    <th className="px-4 py-3">★</th>
                    <th className="px-4 py-3">Partner</th>
                    <th className="px-4 py-3">{dict.partners.published}</th>
                  </tr>
                </thead>
                <tbody>
                  {OFFERS.map((offer) => (
                    <tr key={offer.id} className="border-b border-ink-900/5">
                      <td className="px-4 py-3 font-mono text-xs text-ink-700">{offer.id}</td>
                      <td className="px-4 py-3">{offer.kind}</td>
                      <td className="max-w-[240px] truncate px-4 py-3">{offerTitle(offer)}</td>
                      <td className="px-4 py-3">{formatPrice(offer.price)}</td>
                      <td className="px-4 py-3">{offer.rating}</td>
                      <td className="px-4 py-3">{offer.partner}</td>
                      <td className="px-4 py-3">
                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-xs font-semibold",
                            offer.published
                              ? "bg-sea-100 text-sea-700"
                              : "bg-ivory-100 text-ink-600",
                          ].join(" ")}
                        >
                          {offer.published ? dict.partners.yes : dict.partners.no}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-2xl border border-ink-900/8 bg-white p-5">
              <p className={label}>{dict.partners.title}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {PARTNER_LIST.map((partner) => (
                  <li
                    key={partner.key}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-ivory-100 px-3 py-2 text-xs"
                  >
                    <span className="font-semibold text-ink-700">{partner.name}</span>
                    <span className="text-ink-600">
                      {dict.partners.status[partner.status]} · {partner.enabled ? "ON" : "OFF"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={exportJson}
                className="h-11 rounded-full bg-navy-800 px-6 text-sm font-bold text-white transition hover:bg-navy-700"
              >
                {dict.admin.export}
              </button>
            </div>
          </div>
        ) : null}

        {tab === "emails" ? (
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={template}
                onChange={(event) => setTemplate(event.target.value as typeof template)}
                className="h-10 rounded-full border border-ink-900/12 bg-white px-4 text-sm font-semibold"
              >
                <option value="welcome">{dict.emails.welcomeSubject}</option>
                <option value="confirm">{dict.emails.confirmTitle}</option>
                <option value="deal">{dict.emails.dealTitle}</option>
              </select>
              <button
                type="button"
                onClick={copyEmail}
                className="h-10 rounded-full bg-navy-800 px-5 text-sm font-semibold text-white transition hover:bg-navy-700"
              >
                {copied ? dict.emails.copied : dict.emails.copy}
              </button>
            </div>

            <div className="rounded-2xl border border-ink-900/8 bg-white p-5">
              <p className={label}>{dict.emails.preview}</p>
              <p className="mt-2 text-sm text-ink-700">
                <strong>Subject:</strong> {email.subject}
              </p>
              <p className="text-sm text-ink-600">
                <strong>Preheader:</strong> {email.preheader}
              </p>
            </div>

            <iframe
              title={dict.emails.preview}
              srcDoc={email.html}
              className="h-[520px] w-full rounded-2xl border border-ink-900/8 bg-white"
            />

            <details className="rounded-2xl border border-ink-900/8 bg-white p-5">
              <summary className="cursor-pointer text-sm font-semibold text-navy-700">HTML</summary>
              <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap break-all text-[11px] leading-relaxed text-ink-700">
                {email.html}
              </pre>
            </details>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export function AdminLogin({ dictionary }: { dictionary: Dictionary }) {
  const [state, action, pending] = useActionState(loginAction, IDLE);
  const dict = dictionary;
  const error =
    state.status === "error"
      ? state.message === "required"
        ? dict.admin.required
        : dict.admin.loginError
      : "";

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory-100 px-5">
      <form
        action={action}
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-ink-900/8 bg-white p-8 shadow-soft"
      >
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-600">
            {dict.admin.brand}
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-ink-950">
            {dict.admin.title}
          </h1>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className={label}>{dict.admin.password}</span>
          <input type="password" name="password" required className={input} autoFocus />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="h-12 rounded-full bg-navy-800 text-sm font-bold text-white transition hover:bg-navy-700 disabled:opacity-70"
        >
          {pending ? dict.common.loading : dict.admin.login}
        </button>
        <p role="alert" className="text-sm font-semibold text-flag-red">
          {error}
        </p>
        <p className="text-xs leading-relaxed text-ink-600">{dict.admin.hint}</p>
      </form>
    </div>
  );
}
