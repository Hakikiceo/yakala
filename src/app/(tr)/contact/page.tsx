import type { Metadata } from "next";

import { ContactPage } from "@/components/pages/contact-page";
import { buildStaticPageMetadata } from "@/lib/metadata";
import type { ConversionIntent } from "@/types/product";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "tr",
  path: "/contact",
  title: "Iletisim",
  description: "Platform, urun ailesi ve Radar cozumleri icin YAKALA ekibiyle iletisime gecin.",
});

export default async function TurkishContactRoute({
  searchParams,
}: {
  searchParams: Promise<{ intent?: ConversionIntent; product?: string }>;
}) {
  const params = await searchParams;

  return (
    <ContactPage locale="tr" intent={params.intent ?? "general_contact"} productSlug={params.product} />
  );
}
