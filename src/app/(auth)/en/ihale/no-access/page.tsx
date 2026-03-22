import type { Metadata } from "next";

import { IhaleNoAccess } from "@/components/ihale/ihale-no-access";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "en",
  path: "/ihale/no-access",
  title: "Ihale Radar Access Required",
  description: "Access permission is required for Ihale Radar.",
});

export default async function IhaleNoAccessPageEn({
  searchParams,
}: {
  searchParams?: Promise<{ reason?: string }>;
}) {
  const params = (await searchParams) ?? {};
  return <IhaleNoAccess locale="en" reason={params.reason ?? null} />;
}
