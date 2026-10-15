import { DocumentShell } from "@/components/shell";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <DocumentShell>{children}</DocumentShell>;
}
