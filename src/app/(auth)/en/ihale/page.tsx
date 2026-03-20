import type { Metadata } from "next";

import { IhaleEntry } from "@/components/ihale/ihale-entry";
import { buildCentralAuthHref, buildIhaleReturnTo, getRequestOrigin } from "@/lib/ihale-handoff";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "en",
  path: "/ihale",
  title: "Ihale Radar Access",
  description: "Central sign in and registration entry for Ihale Radar.",
});

export default async function IhaleLandingPageEn() {
  const origin = await getRequestOrigin();
  const returnTo = buildIhaleReturnTo(origin, "en");

  return (
    <IhaleEntry
      locale="en"
      loginHref={buildCentralAuthHref({ locale: "en", mode: "login", returnTo })}
      registerHref={buildCentralAuthHref({ locale: "en", mode: "register", returnTo })}
    />
  );
}
