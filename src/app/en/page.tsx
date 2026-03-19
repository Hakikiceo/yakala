import type { Metadata } from "next";

import { HomePage } from "@/components/pages/home-page";
import { buildHomeMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildHomeMetadata("en");

export default function EnglishHomeRoute() {
  return <HomePage locale="en" />;
}
