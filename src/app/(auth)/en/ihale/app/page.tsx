import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { resolveUserAccessByToken, resolveUserAccessProfileByToken } from "@/lib/app-access";
import { CENTRAL_SESSION_COOKIE } from "@/lib/central-session";
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
  const ihaleToken = cookieStore.get(IHALE_SESSION_COOKIE)?.value;
  const centralToken = cookieStore.get(CENTRAL_SESSION_COOKIE)?.value;

  const token = ihaleToken || centralToken;

  if (!token) {
    redirect("/en/login?app=ihaleradar");
  }

  const access = ihaleToken
    ? await resolveUserAccessByToken(token, "ihaleradar")
    : await resolveUserAccessProfileByToken(token);

  if (!access.ok) {
    redirect("/en/login?app=ihaleradar");
  }

  const hasAccess =
    "hasAccess" in access
      ? access.hasAccess
      : access.appAccess.includes("ihaleradar") || access.appAccess.length > 0;

  if (!hasAccess) {
    redirect("/en/ihale/no-access");
  }

  const dashboardRedirectUrl = buildIhaleDashboardRedirectUrl(token);

  if (!dashboardRedirectUrl) {
    redirect("/en/ihale/no-access");
  }

  redirect(dashboardRedirectUrl);
}
