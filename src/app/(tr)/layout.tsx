import type { ReactNode } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";

import { ComingSoonScreen } from "@/components/coming-soon/coming-soon-screen";
import { SiteShell } from "@/components/layout/site-shell";
import "@/app/globals.css";
import { isComingSoonModeEnabled } from "@/data/site";
import { resolveUserAccessProfileByToken } from "@/lib/app-access";
import { CENTRAL_SESSION_COOKIE } from "@/lib/central-session";
import { siteMetadataBase } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: siteMetadataBase,
};

const liveThemeInitScript = `
  try {
    var storedTheme = window.localStorage.getItem("yakala-theme");
    var theme = storedTheme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = "dark";
  }
`;

const comingSoonThemeInitScript = `document.documentElement.dataset.theme = "dark";`;

export default async function TurkishLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(CENTRAL_SESSION_COOKIE)?.value;
  let hasApprovedAccess = false;

  if (token) {
    const profile = await resolveUserAccessProfileByToken(token);
    hasApprovedAccess = profile.ok && profile.appAccess.length > 0;
  }

  const showComingSoon = isComingSoonModeEnabled && !hasApprovedAccess;

  return (
    <html
      lang="tr"
      className="h-full scroll-smooth antialiased"
      suppressHydrationWarning
      data-theme={showComingSoon ? "dark" : undefined}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: showComingSoon ? comingSoonThemeInitScript : liveThemeInitScript,
          }}
        />
      </head>
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-text)]">
        {showComingSoon ? (
          <ComingSoonScreen locale="tr" />
        ) : (
          <SiteShell locale="tr">{children}</SiteShell>
        )}
      </body>
    </html>
  );
}
