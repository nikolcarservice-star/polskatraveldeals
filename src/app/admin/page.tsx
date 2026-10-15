import { dict } from "@/i18n/dictionaries";
import { OFFERS } from "@/lib/offers";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSettings } from "@/lib/settings";
import { AdminLogin, AdminPanel } from "@/components/admin-panel";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) return <AdminLogin dictionary={dict} />;

  return (
    <AdminPanel
      settings={getSettings()}
      dictionary={dict}
      counts={{
        pages: 18,
        offers: OFFERS.length,
      }}
    />
  );
}
