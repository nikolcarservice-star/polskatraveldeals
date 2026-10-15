import rawPartners from "@/content/partners.json";

export type PartnerKey = "booking" | "aviasales" | "trip" | "travellead";

export type PartnerStatus = "approved" | "pending" | "disabled";

export type PartnerProgramme = "travelpayouts" | "travellead";

export const PARTNER_KEYS: PartnerKey[] = ["booking", "aviasales", "trip", "travellead"];

export interface PartnerLink {
  id: string;
  label: string;
  url: string;
  enabled: boolean;
  note?: string;
}

export interface Partner {
  key: PartnerKey;
  name: string;
  programme: PartnerProgramme;
  status: PartnerStatus;
  enabled: boolean;
  /** Travelpayouts marker/aid or TravelLead partner id. */
  affiliateId: string;
  /** Environment variable that overrides `affiliateId` (keeps secrets out of git). */
  envVar: string;
  /** Query parameter carrying the id, e.g. `aid` or `marker`. */
  tokenParam: string;
  homepage: string;
  /** Template with an optional `{id}` placeholder; empty means "no search CTA". */
  searchUrlTemplate: string;
  /** Hostnames the /go redirector is allowed to send users to. */
  allowedHosts: string[];
  tools: {
    search: boolean;
    deepLinks: boolean;
    widget: boolean;
    banners: boolean;
    manualOffers: boolean;
  };
  /** Official partner widget snippet, pasted by the admin. */
  widgetCode: string;
  cta: { label: string; style: "primary" | "secondary" };
  links: PartnerLink[];
  note: string;
}

export type PartnersFile = Record<PartnerKey, Partner>;

export const PARTNERS = rawPartners as PartnersFile;

/** Ordered list for rendering (public stats, admin tables). */
export const PARTNER_LIST: Partner[] = PARTNER_KEYS.map((key) => PARTNERS[key]);

export function getPartner(key: string): Partner | undefined {
  return (PARTNERS as Record<string, Partner>)[key];
}

/** Resolved affiliate id: environment variable wins over the value stored in the admin panel. */
export function resolvedAffiliateId(partner: Partner): string {
  const fromEnv = partner.envVar ? process.env[partner.envVar]?.trim() : "";
  if (fromEnv) return fromEnv;
  return partner.affiliateId.trim();
}

/**
 * Core honesty rule: an offer may be shown only when the programme is approved,
 * switched on, and we actually hold the affiliate data needed for a working link.
 */
export function partnerAcceptsOffers(partner: Partner | undefined): boolean {
  if (!partner || !partner.enabled || partner.status !== "approved") return false;
  if (partner.programme === "travelpayouts") return Boolean(resolvedAffiliateId(partner));
  // TravelLead: manually curated catalogue — the admin must have filled in the
  // partner homepage / template / allowed host before any link can work.
  return Boolean(
    partner.homepage.trim() || partner.searchUrlTemplate.trim() || partner.allowedHosts.length > 0
  );
}

export function isAllowedHost(partner: Partner, target: string): boolean {
  if (partner.allowedHosts.length === 0) return false;
  try {
    const host = new URL(target).hostname.toLowerCase();
    return partner.allowedHosts.some((allowed) => host === allowed.toLowerCase() || host.endsWith(`.${allowed.toLowerCase()}`));
  } catch {
    return false;
  }
}

function applyTemplate(template: string, id: string): string {
  if (!template) return "";
  return id ? template.replaceAll("{id}", id) : template.replace(/[?&][^=]*=\{id\}/, "");
}

export interface PartnerTargetOptions {
  /** Explicit destination (a verified offer URL). */
  url?: string;
  /** Internal campaign tag stored in the click log. */
  subId?: string;
}

/**
 * Returns the final external URL for a partner, or `null` when the partner is
 * not ready (not approved, no id, no template, host not allowed). Callers must
 * hide the CTA instead of rendering a broken link.
 */
export function buildPartnerTarget(
  partner: Partner | undefined,
  options: PartnerTargetOptions = {}
): string | null {
  if (!partner || !partnerAcceptsOffers(partner)) return null;

  const id = resolvedAffiliateId(partner);
  const explicit = options.url?.trim();
  const target = explicit || applyTemplate(partner.searchUrlTemplate.trim(), id);
  if (!target) return null;
  if (!isAllowedHost(partner, target)) return null;

  // Append the affiliate id when the target does not carry it yet.
  if (id && partner.tokenParam) {
    try {
      const url = new URL(target);
      if (!url.searchParams.has(partner.tokenParam)) {
        url.searchParams.set(partner.tokenParam, id);
      }
      return url.toString();
    } catch {
      return null;
    }
  }
  return target;
}

/** Publicly visible widget snippet (only when the programme is approved). */
export function partnerWidget(partner: Partner): string | null {
  if (!partner.enabled || partner.status !== "approved") return null;
  const code = partner.widgetCode.trim();
  return code || null;
}
