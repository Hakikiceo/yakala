import type { Metadata } from "next";

import { AdminAccessPanel } from "@/components/admin/admin-access-panel";
import { hasAdminPanelKey, isAdminSessionActive } from "@/lib/admin-panel";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "en",
  path: "/admin/access",
  title: "Admin Access Approval",
  description: "Manual approval panel for Ihale Radar access requests.",
});

export default async function AdminAccessPageEn() {
  const configured = hasAdminPanelKey();
  const authenticated = await isAdminSessionActive();

  return (
    <AdminAccessPanel
      locale="en"
      configured={configured}
      initialAuthenticated={authenticated}
    />
  );
}
