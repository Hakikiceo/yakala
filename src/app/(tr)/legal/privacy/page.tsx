import type { Metadata } from "next";

import { LegalPage } from "@/components/pages/legal-page";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "tr",
  path: "/legal/privacy",
  title: "Gizlilik Politikasi",
  description: "YAKALA gizlilik politikasinin yer tutucu surumu.",
});

export default function TurkishPrivacyRoute() {
  return <LegalPage locale="tr" variant="privacy" />;
}
