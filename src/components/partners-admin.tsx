"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { LOCALES, LOCALE_META } from "@/lib/brand";
import { DESTINATIONS } from "@/lib/data";
import type { Partner, PartnerKey } from "@/lib/partners";
import type { Offer } from "@/lib/offers";
import type { ClickStats } from "@/lib/click-stats";
import type { Dictionary } from "@/i18n/dictionaries";
import type { FormState } from "@/lib/actions";
import { formatPrice, formatDateTime } from "@/lib/format";
import {
  deleteOfferAction,
  saveManualOffer,
  savePartner,
  toggleOfferPublished,
} from "@/app/admin/partners/actions";

const IDLE: FormState = { status: "idle" };

const input =
  "h-11 w-full rounded-xl border border-ink-900/12 bg-white px-3.5 text-sm text-ink-900 outline-none transition focus:border-navy-600";
const area = `${input} h-auto min-h-24 py-2.5 font-mono text-xs`;
const label = "text-xs font-bold uppercase tracking-wider text-ink-600";

function stateText(state: FormState, dict: Dictionary): string {
  if (state.status !== "error" && state.message !== "saved") return "";
  if (state.status === "success") return dict.partners.saved;
  switch (state.message) {
    case "write-failed":
      return dict.partners.saveError;
    case "hosts-first":
      return dict.partners.hostsFirst;
    case "unauthorized":
      return dict.admin.loginError;
    default:
      return dict.partners.invalid;
  }
}

function StatusBadge({ partner, dict }: { partner: Partner; dict: Dictionary }) {
  const tone =
    partner.status === "approved"
      ? "bg-sea-100 text-sea-700"
      : partner.status === "pending"
        ? "bg-gold-100 text-gold-700"
        : "bg-ivory-100 text-ink-600";
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
      {dict.partners.status[partner.status]}
    </span>
  );
}

export function PartnersAdmin({
  dictionary,
  partners,
  liveKeys,
  offers,
  stats,
}: {
  dictionary: Dictionary;
  partners: Partner[];
  liveKeys: string[];
  offers: Offer[];
  stats: ClickStats;
}) {
  const dict = dictionary;
  const [active, setActive] = useState<PartnerKey | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [partnerState, partnerAction, partnerPending] = useActionState(savePartner, IDLE);
  const [offerState, offerAction, offerPending] = useActionState(saveManualOffer, IDLE);
  const [toggleState, toggleAction] = useActionState(toggleOfferPublished, IDLE);

  const manual = offers.filter((offer) => offer.partner === "travellead");
  const editing = editId ? offers.find((offer) => offer.id === editId) : undefined;
  const toggleMessage = stateText(toggleState, dict);

  return (
    <div className="flex flex-col gap-10">
      {/* ---------------- Click statistics ---------------- */}
      <section className="surface-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold text-ink-950">
            {dict.partners.clicks}
          </h2>
          <p className="text-xs text-ink-600">
            {dict.partners.clicksTotal}: <strong>{stats.total}</strong>
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {partners.map((partner) => (
            <div key={partner.key} className="rounded-xl bg-ivory-100 px-3 py-3">
              <p className="truncate text-xs font-semibold text-ink-700">{partner.name}</p>
              <p className="font-display text-2xl font-semibold text-navy-800">
                {stats.byPartner[partner.key] ?? 0}
              </p>
            </div>
          ))}
        </div>

        {stats.recent.length > 0 ? (
          <ul className="mt-4 flex flex-col gap-1.5 text-xs text-ink-600">
            {stats.recent.map((row, index) => (
              <li key={`${row.ts}-${index}`} className="flex flex-wrap gap-2 font-mono">
                <span className="text-ink-600/70">{formatDateTime(row.ts, "pl")}</span>
                <span className="font-semibold text-navy-700">{row.partner}</span>
                <span className="text-ink-600/70">{row.sub}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-ink-600">{dict.partners.noClicks}</p>
        )}

        <p className="mt-3 rounded-xl bg-ivory-100 px-4 py-3 text-xs leading-relaxed text-ink-600">
          {dict.partners.storageNote}
        </p>
      </section>

      {/* ---------------- Partner programmes ---------------- */}
      <section className="flex flex-col gap-5">
        <h2 className="font-display text-xl font-semibold text-ink-950">
          {dict.partners.title}
        </h2>

        {partners.map((partner) => {
          const live = liveKeys.includes(partner.key);
          const expanded = active === partner.key;
          return (
            <div key={partner.key} className="surface-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-lg font-semibold text-ink-950">
                    {partner.name}
                  </h3>
                  <span className="rounded-full bg-ivory-100 px-2.5 py-1 text-[11px] font-semibold text-ink-600">
                    {partner.programme}
                  </span>
                  <StatusBadge partner={partner} dict={dict} />
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      partner.enabled ? "bg-sea-100 text-sea-700" : "bg-ivory-100 text-ink-600"
                    }`}
                  >
                    {partner.enabled ? dict.partners.on : dict.partners.off}
                  </span>
                  {live ? (
                    <span className="rounded-full bg-navy-800 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-400">
                      LIVE
                    </span>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => setActive(expanded ? null : partner.key)}
                  className="inline-flex h-10 items-center rounded-full bg-navy-800 px-5 text-sm font-semibold text-white transition hover:bg-navy-700"
                >
                  {expanded ? dict.partners.remove : dict.partners.edit}
                </button>
              </div>

              {!live ? (
                <p className="mt-3 rounded-xl bg-ivory-100 px-4 py-3 text-xs leading-relaxed text-ink-600">
                  {dict.partners.adminLead}
                </p>
              ) : null}

              {expanded ? (
                <form
                  key={`${partner.key}-${JSON.stringify(partner)}`}
                  action={partnerAction}
                  className="mt-5 flex flex-col gap-4 border-t border-ink-900/8 pt-5"
                >
                  <input type="hidden" name="key" value={partner.key} />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5">
                      <span className={label}>{dict.partners.statusLabel}</span>
                      <select name="status" defaultValue={partner.status} className={input}>
                        <option value="approved">{dict.partners.status.approved}</option>
                        <option value="pending">{dict.partners.status.pending}</option>
                        <option value="disabled">{dict.partners.status.disabled}</option>
                      </select>
                    </label>

                    <label className="flex items-end gap-2 pb-3 text-sm font-semibold text-ink-800">
                      <input
                        type="checkbox"
                        name="enabled"
                        defaultChecked={partner.enabled}
                        className="h-4 w-4 accent-navy-800"
                      />
                      {partner.enabled ? dict.partners.on : dict.partners.off}
                    </label>

                    <label className="flex flex-col gap-1.5">
                      <span className={label}>
                        {dict.partners.affiliateId} ({partner.envVar})
                      </span>
                      <input
                        name="affiliateId"
                        defaultValue={partner.affiliateId}
                        className={input}
                      />
                    </label>

                    <label className="flex flex-col gap-1.5">
                      <span className={label}>{dict.partners.tokenParam}</span>
                      <input name="tokenParam" defaultValue={partner.tokenParam} className={input} />
                    </label>

                    <label className="flex flex-col gap-1.5">
                      <span className={label}>{dict.partners.homepage}</span>
                      <input name="homepage" defaultValue={partner.homepage} className={input} />
                    </label>

                    <label className="flex flex-col gap-1.5">
                      <span className={label}>{dict.partners.searchTemplate}</span>
                      <input
                        name="searchUrlTemplate"
                        defaultValue={partner.searchUrlTemplate}
                        className={input}
                      />
                    </label>

                    <label className="flex flex-col gap-1.5 sm:col-span-2">
                      <span className={label}>{dict.partners.allowedHosts}</span>
                      <input
                        name="allowedHosts"
                        defaultValue={partner.allowedHosts.join(", ")}
                        className={input}
                      />
                    </label>
                  </div>

                  <fieldset className="flex flex-col gap-2">
                    <span className={label}>{dict.partners.ctaLabel}</span>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {LOCALES.map((code) => (
                        <label key={code} className="flex flex-col gap-1.5">
                          <span className="text-xs text-ink-600">
                            {LOCALE_META[code].flag} {LOCALE_META[code].name}
                          </span>
                          <input
                            name={`cta${code.charAt(0).toUpperCase()}${code.slice(1)}`}
                            defaultValue={partner.cta.label[code]}
                            className={input}
                          />
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="flex flex-col gap-2">
                    <span className={label}>{dict.partners.widgets}</span>
                    <div className="flex flex-wrap gap-4 text-sm text-ink-700">
                      {(
                        [
                          ["toolSearch", dict.partners.tools.search],
                          ["toolDeepLinks", dict.partners.tools.deepLinks],
                          ["toolWidget", dict.partners.tools.widget],
                          ["toolBanners", dict.partners.tools.banners],
                          ["toolManualOffers", dict.partners.tools.manualOffers],
                        ] as const
                      ).map(([name, text]) => (
                        <label key={name} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name={name}
                            defaultChecked={partner.tools[name.replace("tool", "").replace(/^./, (c) => c.toLowerCase()) as keyof Partner["tools"]]}
                            className="h-4 w-4 accent-navy-800"
                          />
                          {text}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <label className="flex flex-col gap-1.5">
                    <span className={label}>{dict.partners.widgetCode}</span>
                    <textarea
                      name="widgetCode"
                      rows={3}
                      defaultValue={partner.widgetCode}
                      className={area}
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className={label}>
                      {dict.partners.links} — {dict.partners.linkUrl} | {dict.partners.offerTitle}
                    </span>
                    <textarea
                      name="links"
                      rows={Math.max(3, partner.links.length)}
                      defaultValue={partner.links
                        .map((link) => `${link.label} | ${link.url} | ${link.enabled ? "1" : "0"}`)
                        .join("\n")}
                      className={area}
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className={label}>{dict.partners.note}</span>
                    <textarea
                      name="note"
                      rows={2}
                      defaultValue={partner.note}
                      className={`${input} h-auto py-2.5`}
                    />
                  </label>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="submit"
                      disabled={partnerPending}
                      className="h-12 rounded-full bg-navy-800 px-7 text-sm font-bold text-white transition hover:bg-navy-700 disabled:opacity-70"
                    >
                      {partnerPending ? dict.common.loading : dict.partners.save}
                    </button>
                    <p
                      role="status"
                      aria-live="polite"
                      className={`text-sm font-semibold ${
                        partnerState.status === "error" ? "text-flag-red" : "text-sea-600"
                      }`}
                    >
                      {stateText(partnerState, dict)}
                    </p>
                  </div>
                </form>
              ) : null}
            </div>
          );
        })}
      </section>

      {/* ---------------- Manual (TravelLead) offers ---------------- */}
      <section className="surface-card flex flex-col gap-5 p-6">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink-950">
            {dict.partners.manualOffers}
          </h2>
          <p className="mt-1 text-sm text-ink-600">{dict.partners.manualLead}</p>
        </div>

        <form
          key={editing ? `edit-${editing.id}` : "new-offer"}
          action={offerAction}
          className="flex flex-col gap-4 rounded-2xl border border-ink-900/8 bg-ivory-100 p-5"
        >
          {editing ? <input type="hidden" name="id" value={editing.id} /> : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className={label}>{dict.partners.offerTitle} (PL)</span>
              <input name="titlePl" defaultValue={editing?.title?.pl ?? ""} className={input} required />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={label}>{dict.partners.offerTitle} (EN)</span>
              <input name="titleEn" defaultValue={editing?.title?.en ?? ""} className={input} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={label}>{dict.partners.offerTitle} (UA)</span>
              <input name="titleUk" defaultValue={editing?.title?.uk ?? ""} className={input} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={label}>{dict.partners.offerTitle} (RU)</span>
              <input name="titleRu" defaultValue={editing?.title?.ru ?? ""} className={input} />
            </label>

            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className={label}>{dict.partners.offerUrl}</span>
              <input
                name="url"
                type="url"
                defaultValue={editing?.url ?? ""}
                placeholder="https://…"
                className={input}
                required
              />
            </label>

            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className={label}>{dict.partners.source}</span>
              <input
                name="source"
                defaultValue={editing?.source ?? ""}
                placeholder="https://…"
                className={input}
                required
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={label}>{dict.partners.priceLabel}</span>
              <input
                name="price"
                type="number"
                min={1}
                step="1"
                defaultValue={editing?.price ?? ""}
                className={input}
                required
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={label}>{dict.partners.nights}</span>
              <input
                name="nights"
                type="number"
                min={1}
                step="1"
                defaultValue={editing?.nights ?? ""}
                className={input}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={label}>{dict.common.rating}</span>
              <input
                name="rating"
                type="number"
                min={0}
                max={5}
                step="0.1"
                defaultValue={editing?.rating ?? ""}
                className={input}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={label}>{dict.partners.reviews}</span>
              <input
                name="reviews"
                type="number"
                min={0}
                step="1"
                defaultValue={editing?.reviews ?? ""}
                className={input}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={label}>{dict.search.destination}</span>
              <select name="destination" defaultValue={editing?.destination ?? ""} className={input}>
                <option value="">—</option>
                {DESTINATIONS.map((destination) => (
                  <option key={destination.slug} value={destination.slug}>
                    {destination.name.pl}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={label}>{dict.partners.imageLabel}</span>
              <input name="image" defaultValue={editing?.image ?? ""} className={input} />
            </label>
          </div>

          <label className="flex items-center gap-2 text-sm font-semibold text-ink-800">
            <input
              type="checkbox"
              name="published"
              defaultChecked={editing?.published ?? false}
              className="h-4 w-4 accent-navy-800"
            />
            {dict.partners.published}
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={offerPending}
              className="h-12 rounded-full bg-navy-800 px-7 text-sm font-bold text-white transition hover:bg-navy-700 disabled:opacity-70"
            >
              {offerPending ? dict.common.loading : editing ? dict.partners.save : dict.partners.addOffer}
            </button>
            {editing ? (
              <button
                type="button"
                onClick={() => setEditId(null)}
                className="h-12 rounded-full border border-ink-900/15 px-6 text-sm font-semibold text-ink-900 transition hover:border-navy-700"
              >
                {dict.partners.addOffer}
              </button>
            ) : null}
            <p
              role="status"
              aria-live="polite"
              className={`text-sm font-semibold ${
                offerState.status === "error" ? "text-flag-red" : "text-sea-600"
              }`}
            >
              {stateText(offerState, dict)}
            </p>
          </div>
        </form>

        <div className="overflow-x-auto rounded-2xl border border-ink-900/8 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-ink-900/8 text-xs uppercase tracking-wider text-ink-600">
              <tr>
                <th className="px-4 py-3">{dict.partners.offerTitle}</th>
                <th className="px-4 py-3">{dict.partners.priceLabel}</th>
                <th className="px-4 py-3">{dict.partners.source}</th>
                <th className="px-4 py-3">{dict.partners.published}</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {manual.map((offer) => (
                <tr key={offer.id} className="border-b border-ink-900/5">
                  <td className="max-w-[260px] truncate px-4 py-3">{offer.title?.pl ?? offer.id}</td>
                  <td className="px-4 py-3">{formatPrice(offer.price, "pl")}</td>
                  <td className="max-w-[220px] truncate px-4 py-3 text-xs text-ink-600">
                    {offer.source || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        offer.published ? "bg-sea-100 text-sea-700" : "bg-ivory-100 text-ink-600"
                      }`}
                    >
                      {offer.published ? dict.partners.yes : dict.partners.no}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setEditId(offer.id)}
                      className="mr-2 rounded-full border border-ink-900/15 px-3 py-1.5 text-xs font-semibold text-navy-700 transition hover:border-navy-600"
                    >
                      {dict.partners.edit}
                    </button>
                    <form action={deleteOfferAction} className="inline">
                      <input type="hidden" name="id" value={offer.id} />
                      <button
                        type="submit"
                        className="rounded-full border border-flag-red/30 px-3 py-1.5 text-xs font-semibold text-flag-red transition hover:bg-flag-red/10"
                      >
                        {dict.partners.remove}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {manual.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-sm text-ink-600">
                    {dict.partners.noOffers}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------------- All offers: publishing switches ---------------- */}
      <section className="surface-card flex flex-col gap-4 p-6">
        <h2 className="font-display text-xl font-semibold text-ink-950">
          {dict.partners.published}
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-ink-900/8 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-ink-900/8 text-xs uppercase tracking-wider text-ink-600">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">{dict.partners.offerTitle}</th>
                <th className="px-4 py-3">Partner</th>
                <th className="px-4 py-3">{dict.partners.published}</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id} className="border-b border-ink-900/5">
                  <td className="px-4 py-3 font-mono text-xs text-ink-700">{offer.id}</td>
                  <td className="max-w-[280px] truncate px-4 py-3">{offer.title?.pl ?? offer.id}</td>
                  <td className="px-4 py-3">{offer.partner}</td>
                  <td className="px-4 py-3">
                    <form action={toggleAction} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={offer.id} />
                      <button
                        type="submit"
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                          offer.published
                            ? "bg-sea-100 text-sea-700 hover:bg-sea-200"
                            : "bg-ivory-100 text-ink-600 hover:bg-ivory-200"
                        }`}
                      >
                        {offer.published ? dict.partners.yes : dict.partners.no}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/admin"
            className="inline-flex h-11 items-center rounded-full border border-ink-900/15 px-5 text-sm font-semibold text-ink-900 transition hover:border-navy-700"
          >
            ← {dict.admin.title}
          </Link>
          <p
            role="status"
            aria-live="polite"
            className={`text-sm font-semibold ${
              toggleState.status === "error" ? "text-flag-red" : "text-sea-600"
            }`}
          >
            {toggleMessage}
          </p>
        </div>
      </section>
    </div>
  );
}
