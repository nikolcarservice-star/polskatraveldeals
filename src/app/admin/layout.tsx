import type { Metadata } from "next";
import { DocumentShell } from "@/components/shell";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${BRAND.name} · Admin`,
  robots: { index: false, follow: false },
};

/**
 * Admin lives outside the localised route group, so it provides its own root
 * layout (html/body) while reusing the same typography shell.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DocumentShell lang="pl">{children}</DocumentShell>;
}
