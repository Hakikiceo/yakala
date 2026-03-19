import type { Metadata } from "next";

import { ContactPage } from "@/components/pages/contact-page";
import { buildStaticPageMetadata } from "@/lib/metadata";
import type { ConversionIntent } from "@/types/product";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "en",
  path: "/contact",
  title: "Contact",
  description: "Contact the YAKALA team about the platform, product family, or Radar fit.",
});

export default async function EnglishContactRoute({
  searchParams,
}: {
  searchParams: Promise<{ intent?: ConversionIntent; product?: string }>;
}) {
  const params = await searchParams;

  return (
    <ContactPage locale="en" intent={params.intent ?? "general_contact"} productSlug={params.product} />
  );
}
