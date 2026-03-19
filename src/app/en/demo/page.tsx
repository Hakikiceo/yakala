import type { Metadata } from "next";

import { DemoPage } from "@/components/pages/demo-page";
import { buildStaticPageMetadata } from "@/lib/metadata";
import type { ConversionIntent } from "@/types/product";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "en",
  path: "/demo",
  title: "Request Demo",
  description:
    "Plan a YAKALA demo conversation for live products, beta programs, and upcoming Radar launches.",
});

export default async function EnglishDemoRoute({
  searchParams,
}: {
  searchParams: Promise<{ intent?: ConversionIntent; product?: string }>;
}) {
  const params = await searchParams;

  return <DemoPage locale="en" intent={params.intent ?? "demo"} productSlug={params.product} />;
}
