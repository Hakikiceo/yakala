import type { Metadata } from "next";

import { LegalPage } from "@/components/pages/legal-page";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "tr",
  path: "/legal/terms",
  title: "Kullanim Kosullari",
  description: "YAKALA kullanim kosullarinin yer tutucu surumu.",
});

export default function TurkishTermsRoute() {
  return <LegalPage locale="tr" variant="terms" />;
}
