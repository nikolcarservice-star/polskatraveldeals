import { BRAND, SLOGAN, absoluteUrl } from "@/lib/brand";
import { dict } from "@/i18n/dictionaries";

const shell = (body: string) => `
<!doctype html>
<html lang="pl">
  <body style="margin:0;background:#faf7f1;font-family:Helvetica,Arial,sans-serif;color:#0b1220">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f1;padding:24px 0">
      <tr><td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e7dfd0">
          <tr><td style="background:#0a2540;padding:20px 28px">
            <div style="font-size:13px;letter-spacing:.18em;color:#e3bd63;font-weight:700">${BRAND.name}</div>
            <div style="font-size:12px;color:#f3eee4;opacity:.75;margin-top:4px">${SLOGAN}</div>
          </td></tr>
          <tr><td style="padding:28px">${body}</td></tr>
          <tr><td style="background:#f3eee4;padding:16px 28px;font-size:11px;color:#2a3d5c;line-height:1.6">
            ${dict.emails.footerLegal}<br/>
            ${dict.emails.footerAffiliate}<br/>
            ${BRAND.name} · ${absoluteUrl("/")}
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

function cta(label: string, url: string) {
  return `<a href="${url}" style="display:inline-block;margin-top:18px;background:#cfa037;color:#060b13;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px">${label}</a>`;
}

function heading(text: string) {
  return `<h1 style="font-family:Georgia,serif;font-size:24px;margin:0 0 12px;color:#0a2540">${text}</h1>`;
}

function paragraph(text: string) {
  return `<p style="font-size:14px;line-height:1.7;color:#1a2a44;margin:0 0 8px">${text}</p>`;
}

function unsubscribe() {
  return `<p style="font-size:11px;color:#2a3d5c;margin-top:22px">${dict.emails.unsubscribeText}</p>`;
}

export function welcomeEmail(): string {
  return shell(
    heading(dict.emails.welcomeTitle) +
      paragraph(dict.emails.welcomeText) +
      paragraph(`<em>${dict.emails.welcomePreheader}</em>`) +
      cta(dict.emails.welcomeCta, absoluteUrl("/")) +
      unsubscribe() +
      `<p style="font-size:12px;color:#2a3d5c;margin-top:16px">${dict.emails.signature}</p>`
  );
}

export function confirmEmail(token = "{token}"): string {
  const url = `${absoluteUrl("/newsletter")}?confirm=${token}`;
  return shell(
    heading(dict.emails.confirmTitle) +
      paragraph(dict.emails.confirmText) +
      cta(dict.emails.confirmCta, url) +
      unsubscribe()
  );
}

/** Deal template returned as a structured payload for the admin panel. */
export function dealEmailParts(
  offer: { destination: string; price: string; url: string }
): { subject: string; preheader: string; html: string } {
  return {
    subject: dict.emails.dealSubject
      .replace("{destination}", offer.destination)
      .replace("{price}", offer.price),
    preheader: dict.emails.dealPreheader,
    html: shell(
      heading(dict.emails.dealTitle) +
        paragraph(dict.emails.dealText) +
        paragraph(`<strong>${offer.destination}</strong> — ${offer.price}`) +
        cta(dict.emails.dealCta, offer.url) +
        unsubscribe()
    ),
  };
}

export function welcomeEmailParts(): { subject: string; preheader: string; html: string } {
  return {
    subject: dict.emails.welcomeSubject,
    preheader: dict.emails.welcomePreheader,
    html: welcomeEmail(),
  };
}

export function confirmEmailParts(token = "{token}"): { subject: string; preheader: string; html: string } {
  return {
    subject: dict.emails.confirmTitle,
    preheader: dict.emails.welcomePreheader,
    html: confirmEmail(token),
  };
}
