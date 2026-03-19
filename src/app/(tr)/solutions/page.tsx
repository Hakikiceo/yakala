import type { Metadata } from "next";

import { SolutionsPage } from "@/components/pages/solutions-page";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "tr",
  path: "/solutions",
  title: "Cozumler",
  description:
    "YAKALA'nin farkli Radar urunleriyle hangi kurumsal izleme problemlerini cozdugunu inceleyin.",
});

export default function TurkishSolutionsRoute() {
  return <SolutionsPage locale="tr" />;
}
