import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { resolveUserAccessByToken } from "@/lib/app-access";
import { buildIhaleDashboardRedirectUrl } from "@/lib/ihale-handoff";
import { IHALE_SESSION_COOKIE } from "@/lib/ihale-session";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "en",
  path: "/ihale/app",
  title: "Ihale Radar Application",
  description: "Ihale Radar in-product application entry layer.",
});

export default async function IhaleAppPageEn() {
  const cookieStore = await cookies();
  const token = cookieStore.get(IHALE_SESSION_COOKIE)?.value;

  if (!token) {
    redirect("/en/ihale/login");
  }

  const access = await resolveUserAccessByToken(token, "ihaleradar");

  if (!access.ok) {
    redirect("/en/ihale/login");
  }

  if (!access.hasAccess) {
    redirect("/en/ihale/no-access");
  }

  const dashboardRedirectUrl = buildIhaleDashboardRedirectUrl(token);

  if (!dashboardRedirectUrl) {
    redirect("/en/ihale/no-access");
  }

  redirect(dashboardRedirectUrl);
}
