import type { Metadata } from "next";
import { redirect } from "next/navigation";

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
  if (params.token) {
    redirect(`/ihale/app?token=${encodeURIComponent(params.token)}`);
  }
  redirect("/ihale/app");
}
