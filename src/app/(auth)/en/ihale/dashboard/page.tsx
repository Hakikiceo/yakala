import type { Metadata } from "next";

import { IhaleDashboardClient } from "@/components/ihale/ihale-dashboard-client";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "en",
  path: "/ihale/dashboard",
  title: "Ihale Radar Dashboard Access",
  description: "Ihale Radar dashboard entry point after token handoff.",
});

export default async function IhaleDashboardPageEn({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;

  return <IhaleDashboardClient locale="en" tokenFromQuery={params.token} />;
}
