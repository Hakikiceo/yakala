import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { CentralAppsHub } from "@/components/auth/central-apps-hub";
import { resolveUserAccessProfileByToken } from "@/lib/app-access";
import { CENTRAL_SESSION_COOKIE } from "@/lib/central-session";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "tr",
  path: "/apps",
  title: "Uygulama Erisim Paneli",
  description: "Onayli uygulamalara merkezi panelden erisim.",
});

export default async function TurkishAppsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CENTRAL_SESSION_COOKIE)?.value;

  if (!token) {
    redirect("/login");
  }

  const profile = await resolveUserAccessProfileByToken(token);

  if (!profile.ok) {
    redirect("/login");
  }

  return <CentralAppsHub locale="tr" email={profile.email} appAccess={profile.appAccess} />;
}
