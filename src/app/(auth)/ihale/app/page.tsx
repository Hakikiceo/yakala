import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { resolveUserAccessByToken } from "@/lib/app-access";
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
  const token = cookieStore.get(IHALE_SESSION_COOKIE)?.value;

  if (!token) {
    redirect("/ihale/login");
  }

  const access = await resolveUserAccessByToken(token, "ihaleradar");

  if (!access.ok) {
    redirect("/ihale/login");
  }

  if (!access.hasAccess) {
    redirect("/ihale/no-access");
  }

  const dashboardRedirectUrl = buildIhaleDashboardRedirectUrl(token);

  if (!dashboardRedirectUrl) {
    redirect("/ihale/no-access");
  }

  redirect(dashboardRedirectUrl);
}
