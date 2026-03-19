import type { Metadata } from "next";

import { AboutPage } from "@/components/pages/about-page";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "tr",
  path: "/about",
  title: "Hakkimizda",
  description:
    "YAKALA'nin urun evi mantigi, moduler platform yapisi ve kurumsal marka yaklasimi hakkinda bilgi alin.",
});

export default function TurkishAboutRoute() {
  return <AboutPage locale="tr" />;
}
