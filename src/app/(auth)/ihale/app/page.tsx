import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { IhaleAppShell } from "@/components/ihale/ihale-app-shell";
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
  const hasSession = Boolean(cookieStore.get(IHALE_SESSION_COOKIE)?.value);

  if (!hasSession) {
    redirect("/ihale/login");
  }

  return <IhaleAppShell locale="tr" />;
}
