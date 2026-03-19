import type { Metadata } from "next";

import { LegalPage } from "@/components/pages/legal-page";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "en",
  path: "/legal/privacy",
  title: "Privacy Policy",
  description: "Placeholder version of the YAKALA privacy policy.",
});

export default function EnglishPrivacyRoute() {
  return <LegalPage locale="en" variant="privacy" />;
}
