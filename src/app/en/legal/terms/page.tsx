import type { Metadata } from "next";

import { LegalPage } from "@/components/pages/legal-page";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "en",
  path: "/legal/terms",
  title: "Terms of Use",
  description: "Placeholder version of the YAKALA terms of use.",
});

export default function EnglishTermsRoute() {
  return <LegalPage locale="en" variant="terms" />;
}
