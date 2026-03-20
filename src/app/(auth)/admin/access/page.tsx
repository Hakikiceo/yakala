import type { Metadata } from "next";

import { AdminAccessPanel } from "@/components/admin/admin-access-panel";
import { hasAdminPanelKey, isAdminSessionActive } from "@/lib/admin-panel";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "tr",
  path: "/admin/access",
  title: "Admin Erişim Onay",
  description: "Ihale Radar erisim taleplerini manuel onaylama paneli.",
});

export default async function AdminAccessPage() {
  const configured = hasAdminPanelKey();
  const authenticated = await isAdminSessionActive();

  return (
    <AdminAccessPanel
      locale="tr"
      configured={configured}
      initialAuthenticated={authenticated}
    />
  );
}
