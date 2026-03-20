import type { Metadata } from "next";

import { IhaleNoAccess } from "@/components/ihale/ihale-no-access";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "tr",
  path: "/ihale/no-access",
  title: "Ihale Radar Yetki Gerekli",
  description: "Ihale Radar urunune erisim icin yetki gereklidir.",
});

export default function IhaleNoAccessPage() {
  return <IhaleNoAccess locale="tr" />;
}
