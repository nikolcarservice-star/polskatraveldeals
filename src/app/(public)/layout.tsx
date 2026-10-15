import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieBar } from "@/components/cookie-bar";
import { dict } from "@/i18n/dictionaries";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {dict.nav.skipToContent}
      </a>
      <SiteHeader dict={dict} />
      <main id="main">{children}</main>
      <SiteFooter dict={dict} />
      <CookieBar dict={dict} />
    </>
  );
}
