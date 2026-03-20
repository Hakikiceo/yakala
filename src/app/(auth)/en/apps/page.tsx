import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { CentralAppsHub } from "@/components/auth/central-apps-hub";
import { resolveUserAccessProfileByToken } from "@/lib/app-access";
import { CENTRAL_SESSION_COOKIE } from "@/lib/central-session";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "en",
  path: "/apps",
  title: "Application Access Panel",
  description: "Access approved applications from the central panel.",
});

export default async function EnglishAppsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CENTRAL_SESSION_COOKIE)?.value;

  if (!token) {
    redirect("/en/login");
  }

  const profile = await resolveUserAccessProfileByToken(token);

  if (!profile.ok) {
    redirect("/en/login");
  }

  return <CentralAppsHub locale="en" email={profile.email} appAccess={profile.appAccess} />;
}
