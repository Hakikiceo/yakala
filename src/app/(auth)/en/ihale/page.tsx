import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { IhaleEntry } from "@/components/ihale/ihale-entry";
import { resolveUserAccessProfileByToken } from "@/lib/app-access";
import { CENTRAL_SESSION_COOKIE } from "@/lib/central-session";
import { buildCentralAuthHref, buildIhaleReturnTo, getRequestOrigin } from "@/lib/ihale-handoff";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "en",
  path: "/ihale",
  title: "Ihale Radar Access",
  description: "Central sign in and registration entry for Ihale Radar.",
});

export default async function IhaleLandingPageEn() {
  const cookieStore = await cookies();
  const centralToken = cookieStore.get(CENTRAL_SESSION_COOKIE)?.value;

  if (centralToken) {
    const profile = await resolveUserAccessProfileByToken(centralToken);
    if (profile.ok && (profile.appAccess.includes("ihaleradar") || profile.appAccess.length > 0)) {
      redirect("/en/ihale/app");
    }
  }

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
