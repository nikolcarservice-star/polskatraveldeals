import type { LegalDoc, LegalSlug } from "./types";

export const legalEn: Record<LegalSlug, LegalDoc> = {
  regulamin: {
    slug: "regulamin",
    updated: "15 October 2026",
    intro:
      "These terms govern the use of the POLSKA TRAVEL DEALS website, including its travel search and comparison tools.",
    sections: [
      {
        id: "general",
        heading: "1. General provisions",
        paragraphs: [
          "The service is operated by Polska Travel Deals at polskatraveldeals.vercel.app. Using the service is voluntary and constitutes acceptance of these terms.",
          "The service is informational and comparative. We are neither a tour operator nor a travel intermediary within the meaning of the Polish travel package act.",
        ],
      },
      {
        id: "services",
        heading: "2. Scope of services",
        paragraphs: [
          "We provide a search and comparison tool for tours, flights, hotels and activities offered by external partners. Prices, dates and conditions are shown for orientation.",
          "The set of free features may change. No account is required to browse and compare offers.",
        ],
      },
      {
        id: "bookings",
        heading: "3. Bookings and payments",
        paragraphs: [
          "Bookings and payments are made directly with the partner behind the offer link. Your contract is with that partner, and its own terms and cancellation policy apply.",
          "POLSKA TRAVEL DEALS does not act as a contracting party and does not process payments for the offers displayed.",
        ],
      },
      {
        id: "prices",
        heading: "4. Prices and availability",
        paragraphs: [
          "Prices and availability come from partners and may change in real time. The final confirmation of price and conditions is issued by the tour operator or airline.",
          "We may correct displayed data whenever a partner provides updated information.",
        ],
      },
      {
        id: "affiliate",
        heading: "5. Affiliate links",
        paragraphs: [
          "Some links on the site are affiliate links. We may earn a commission from the partner if you book through such a link. This does not affect your price or booking conditions.",
          "See the “Affiliate disclosure” document for details.",
        ],
      },
      {
        id: "liability",
        heading: "6. Liability",
        paragraphs: [
          "We strive to keep data up to date, but we do not guarantee completeness or offer availability at partners. Responsibility for offer content lies with the partner.",
          "We are not responsible for the content and rules of third-party sites reached through partner links.",
        ],
      },
      {
        id: "complaints",
        heading: "7. Complaints and disputes",
        paragraphs: [
          "Complaints about the service can be sent to kontakt@polskatraveldeals.vercel.app and are answered within 14 days.",
          "For booking-related issues contact the partner you booked with. Consumers may use out-of-court dispute resolution routes.",
        ],
      },
      {
        id: "changes",
        heading: "8. Changes to the terms",
        paragraphs: [
          "These terms may be updated. A new version applies from the date of publication, with the “Last updated” date adjusted accordingly.",
        ],
      },
    ],
  },

  "polityka-prywatnosci": {
    slug: "polityka-prywatnosci",
    updated: "15 October 2026",
    intro:
      "This policy explains what data we process, why we process it and which rights you have under the GDPR.",
    sections: [
      {
        id: "controller",
        heading: "1. Data controller",
        paragraphs: [
          "The data controller is Polska Travel Deals. Privacy contact: rodo@polskatraveldeals.vercel.app.",
        ],
      },
      {
        id: "scope",
        heading: "2. Scope and purposes",
        paragraphs: [
          "We process data you provide voluntarily: your e-mail address in the newsletter form, and name, e-mail, subject and message content in the contact form.",
          "Technical data (IP address, browser type, visit time) is processed for security and correct operation of the service on the basis of our legitimate interest.",
          "We do not make automated decisions with legal effects and we do not profile visitors.",
        ],
      },
      {
        id: "bases",
        heading: "3. Legal bases",
        paragraphs: [
          "Consent for the newsletter; legitimate interest for security and replying to enquiries; performance of a contract or legal obligation where necessary.",
        ],
      },
      {
        id: "recipients",
        heading: "4. Recipients",
        paragraphs: [
          "We use technical providers: hosting (Vercel) and an e-mail delivery provider, strictly to the extent needed to run the service.",
          "Data may be passed to a booking partner only when you go to its site yourself and enter data there — from that point the partner is the controller.",
        ],
      },
      {
        id: "retention",
        heading: "5. Retention periods",
        paragraphs: [
          "Contact form data is kept until we reply and no longer than 12 months. Newsletter data is kept until you unsubscribe. Technical data follows the hosting provider's security requirements.",
        ],
      },
      {
        id: "rights",
        heading: "6. Your rights",
        paragraphs: [
          "You may request access, rectification, erasure, restriction, portability, and object to processing based on legitimate interest.",
          "Consent can be withdrawn at any time without affecting prior lawful processing. You have the right to lodge a complaint with your supervisory authority.",
        ],
      },
      {
        id: "newsletter",
        heading: "7. Newsletter",
        paragraphs: [
          "Newsletter sign-up is confirmed through a link in the confirmation message. You can unsubscribe at any time with the opt-out link in every message.",
        ],
      },
      {
        id: "security",
        heading: "8. Security",
        paragraphs: [
          "We apply organisational and technical safeguards: HTTPS encryption, restricted access and data minimisation.",
        ],
      },
      {
        id: "changes",
        heading: "9. Changes to this policy",
        paragraphs: [
          "This policy may be updated. The date of the last change appears at the top of the page.",
        ],
      },
    ],
  },

  "polityka-cookies": {
    slug: "polityka-cookies",
    updated: "15 October 2026",
    intro:
      "Information about the cookies used on this site and how to manage them.",
    sections: [
      {
        id: "what",
        heading: "1. What cookies are",
        paragraphs: [
          "Cookies are small text files stored on your device when you visit a site. They let the site remember settings and work correctly.",
        ],
      },
      {
        id: "types",
        heading: "2. Which cookies we use",
        paragraphs: [
          "Strictly necessary — keep your session and security; without them the service does not work. Preferences — remember your chosen language (ptd-locale cookie). Functional — remember the consent you gave in the cookie banner.",
          "Analytics tools may only run after you consent. Partners you are redirected to set their own cookies under their own policies.",
        ],
      },
      {
        id: "manage",
        heading: "3. Managing cookies",
        paragraphs: [
          "You can delete or block cookies in your browser settings. Restricting strictly necessary cookies may break some features of the site.",
        ],
      },
      {
        id: "third-parties",
        heading: "4. External links",
        paragraphs: [
          "Clicking an offer takes you to a partner's site. That partner is responsible for cookies set outside our service.",
        ],
      },
      {
        id: "duration",
        heading: "5. Lifetime",
        paragraphs: [
          "Session cookies expire when you close the browser. Preference cookies are stored for up to 12 months or until you remove them.",
        ],
      },
      {
        id: "contact",
        heading: "6. Contact",
        paragraphs: [
          "Questions about cookies can be sent to kontakt@polskatraveldeals.vercel.app.",
        ],
      },
    ],
  },

  "ujawnienie-afiliacyjne": {
    slug: "ujawnienie-afiliacyjne",
    updated: "15 October 2026",
    intro:
      "An honest explanation of how we make money and why some links are labelled.",
    sections: [
      {
        id: "what",
        heading: "1. What affiliate links are",
        paragraphs: [
          "An affiliate link points to a partner's site and allows us to be identified as the referral source. If you book after following it, we may receive a commission.",
        ],
      },
      {
        id: "how",
        heading: "2. How we earn",
        paragraphs: [
          "We work with partner programmes, including Travelpayouts (Viator, GetTransfer, Aviasales, Hotellook and others), Klook and Booking.com. The commission comes from the partner.",
        ],
      },
      {
        id: "price",
        heading: "3. Your price",
        paragraphs: [
          "Using the site is free. A commission never increases the price of an offer — you pay exactly what the partner charges.",
        ],
      },
      {
        id: "labels",
        heading: "4. Labelling",
        paragraphs: [
          "Offer cards carry a “Affiliate link” badge. Full information is available in this disclosure and in the site footer.",
        ],
      },
      {
        id: "ranking",
        heading: "5. Effect on ranking",
        paragraphs: [
          "Partner commission does not decide the order of results. Sorting depends on your filters, price, ratings and popularity of the offers.",
        ],
      },
    ],
  },

  "nota-prawna": {
    slug: "nota-prawna",
    updated: "15 October 2026",
    intro: "Legal notice: who operates the site, how to reach us and where content comes from.",
    sections: [
      {
        id: "operator",
        heading: "1. Site operator",
        paragraphs: [
          "POLSKA TRAVEL DEALS — Polska Travel Deals. Domain: polskatraveldeals.vercel.app. Contact e-mail: kontakt@polskatraveldeals.vercel.app.",
          "The service is not a travel agency or tour operator and does not sell travel services on its own account.",
        ],
      },
      {
        id: "contact",
        heading: "2. Contact",
        paragraphs: [
          "General enquiries: kontakt@polskatraveldeals.vercel.app. Technical issues: pomoc@polskatraveldeals.vercel.app. Personal data: rodo@polskatraveldeals.vercel.app.",
        ],
      },
      {
        id: "content",
        heading: "3. Content and licences",
        paragraphs: [
          "Site texts are our original content. Photographs come from Wikimedia Commons under CC BY-SA licences and public domain, in line with the licence requirements.",
        ],
      },
      {
        id: "ip",
        heading: "4. Intellectual property",
        paragraphs: [
          "The POLSKA TRAVEL DEALS name, visual identity and site layout belong to the operator. Partner trademarks remain the property of their owners.",
        ],
      },
    ],
  },
};
