import type { Metadata } from "next";

import { DemoPage } from "@/components/pages/demo-page";
import { buildStaticPageMetadata } from "@/lib/metadata";
import type { ConversionIntent } from "@/types/product";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "tr",
  path: "/demo",
  title: "Demo Talebi",
  description:
    "Canli urunler, beta surecler ve yaklasan Radar lansmanlari icin YAKALA ekibiyle demo gorusmesi planlayin.",
});

export default async function TurkishDemoRoute({
  searchParams,
}: {
  searchParams: Promise<{ intent?: ConversionIntent; product?: string }>;
}) {
  const params = await searchParams;

  return <DemoPage locale="tr" intent={params.intent ?? "demo"} productSlug={params.product} />;
}
