import type { Metadata } from "next";

import { IhaleDashboardClient } from "@/components/ihale/ihale-dashboard-client";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "tr",
  path: "/ihale/dashboard",
  title: "Ihale Radar Dashboard Girisi",
  description: "Ihale Radar token handoff sonrasinda dashboard giris noktasi.",
});

export default async function IhaleDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;

  return <IhaleDashboardClient locale="tr" tokenFromQuery={params.token} />;
}
