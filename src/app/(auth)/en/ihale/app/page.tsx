import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { IhaleAppShell } from "@/components/ihale/ihale-app-shell";
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
  const hasSession = Boolean(cookieStore.get(IHALE_SESSION_COOKIE)?.value);

  if (!hasSession) {
    redirect("/en/ihale/login");
  }

  return <IhaleAppShell locale="en" />;
}
