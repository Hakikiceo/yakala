import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { resolveUserAccessByToken, resolveUserAccessProfileByToken } from "@/lib/app-access";
import { CENTRAL_SESSION_COOKIE } from "@/lib/central-session";
import { buildIhaleDashboardRedirectUrl } from "@/lib/ihale-handoff";
import { IHALE_SESSION_COOKIE } from "@/lib/ihale-session";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "tr",
  path: "/ihale/app",
  title: "Ihale Radar Uygulama",
  description: "Ihale Radar urun ici uygulama giris katmani.",
});

export default async function IhaleAppPage() {
  const cookieStore = await cookies();
  const ihaleToken = cookieStore.get(IHALE_SESSION_COOKIE)?.value;
  const centralToken = cookieStore.get(CENTRAL_SESSION_COOKIE)?.value;

  const token = ihaleToken || centralToken;

  if (!token) {
    redirect("/login?app=ihaleradar");
  }

  const access = ihaleToken
    ? await resolveUserAccessByToken(token, "ihaleradar")
    : await resolveUserAccessProfileByToken(token);

  if (!access.ok) {
    redirect("/login?app=ihaleradar");
  }

  const hasAccess =
    "hasAccess" in access
      ? access.hasAccess
      : access.appAccess.includes("ihaleradar") || access.appAccess.length > 0;

  if (!hasAccess) {
    redirect("/ihale/no-access");
  }

  const dashboardRedirectUrl = buildIhaleDashboardRedirectUrl(token);

  if (!dashboardRedirectUrl) {
    redirect("/ihale/no-access");
  }

  redirect(dashboardRedirectUrl);
}
