import type { Metadata } from "next";

import { SolutionsPage } from "@/components/pages/solutions-page";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "en",
  path: "/solutions",
  title: "Solutions",
  description:
    "Review the business monitoring problems YAKALA addresses across its Radar product family.",
});

export default function EnglishSolutionsRoute() {
  return <SolutionsPage locale="en" />;
}
