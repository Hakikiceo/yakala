import type { Metadata } from "next";

import { AboutPage } from "@/components/pages/about-page";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "en",
  path: "/about",
  title: "About",
  description:
    "Learn about YAKALA's product-house model, modular platform architecture, and restrained corporate brand direction.",
});

export default function EnglishAboutRoute() {
  return <AboutPage locale="en" />;
}
