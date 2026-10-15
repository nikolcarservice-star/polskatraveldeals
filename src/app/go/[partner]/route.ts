import { NextResponse, type NextRequest } from "next/server";
import { getPartner, isAllowedHost, partnerAcceptsOffers } from "@/lib/partners";
import { recordClick } from "@/lib/click-stats";

/**
 * Transparent outbound hop: `go.polskatraveldeals`-style links pass through
 * here so we can count clicks, then send the visitor straight to the partner.
 * No booking, no payment, no proxying of partner content — a 307 redirect.
 *
 * Guards: unknown/disabled/unapproved partner, missing target and any host
 * outside the partner's allowlist all fall back to the homepage instead of
 * redirecting (no open-redirect primitive).
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ partner: string }> }
) {
  const { partner: key } = await params;
  const partner = getPartner(key);
  const target = request.nextUrl.searchParams.get("u");
  const sub = request.nextUrl.searchParams.get("s") ?? "";
  const home = new URL("/", request.url);

  if (!partner || !partner.enabled || !partnerAcceptsOffers(partner)) {
    return NextResponse.redirect(home, 302);
  }
  if (!target || !isAllowedHost(partner, target)) {
    return NextResponse.redirect(home, 302);
  }

  await recordClick({ partner: partner.key, sub: sub.slice(0, 80), target });

  return NextResponse.redirect(target, 307);
}
