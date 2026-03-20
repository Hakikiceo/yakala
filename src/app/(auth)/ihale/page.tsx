import type { Metadata } from "next";

import { IhaleEntry } from "@/components/ihale/ihale-entry";
import { buildCentralAuthHref, buildIhaleReturnTo, getRequestOrigin } from "@/lib/ihale-handoff";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "tr",
  path: "/ihale",
  title: "Ihale Radar Giris",
  description: "Ihale Radar urunune merkezi giris ve kayit yonlendirmesi.",
});

export default async function IhaleLandingPage() {
  const origin = await getRequestOrigin();
  const returnTo = buildIhaleReturnTo(origin, "tr");

  return (
    <IhaleEntry
      locale="tr"
      loginHref={buildCentralAuthHref({ locale: "tr", mode: "login", returnTo })}
      registerHref={buildCentralAuthHref({ locale: "tr", mode: "register", returnTo })}
    />
  );
}
