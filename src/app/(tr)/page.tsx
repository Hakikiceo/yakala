import type { Metadata } from "next";

import { HomePage } from "@/components/pages/home-page";
import { buildHomeMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildHomeMetadata("tr");

export default function TurkishHomeRoute() {
  return <HomePage locale="tr" />;
}
