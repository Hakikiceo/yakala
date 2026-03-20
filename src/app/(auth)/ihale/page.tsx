import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { IhaleEntry } from "@/components/ihale/ihale-entry";
import { resolveUserAccessProfileByToken } from "@/lib/app-access";
import { CENTRAL_SESSION_COOKIE } from "@/lib/central-session";
import { buildCentralAuthHref, buildIhaleReturnTo, getRequestOrigin } from "@/lib/ihale-handoff";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "tr",
  path: "/ihale",
  title: "Ihale Radar Giris",
  description: "Ihale Radar urunune merkezi giris ve kayit yonlendirmesi.",
});

export default async function IhaleLandingPage() {
  const cookieStore = await cookies();
  const centralToken = cookieStore.get(CENTRAL_SESSION_COOKIE)?.value;

  if (centralToken) {
    const profile = await resolveUserAccessProfileByToken(centralToken);
    if (profile.ok && (profile.appAccess.includes("ihaleradar") || profile.appAccess.length > 0)) {
      redirect("/ihale/app");
    }
  }

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
