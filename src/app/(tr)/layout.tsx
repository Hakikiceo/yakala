import type { ReactNode } from "react";
import type { Metadata } from "next";

import { ComingSoonScreen } from "@/components/coming-soon/coming-soon-screen";
import { SiteShell } from "@/components/layout/site-shell";
import "@/app/globals.css";
import { isComingSoonModeEnabled } from "@/data/site";
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

export default function TurkishLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="tr"
      className="h-full scroll-smooth antialiased"
      suppressHydrationWarning
      data-theme={isComingSoonModeEnabled ? "dark" : undefined}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: isComingSoonModeEnabled ? comingSoonThemeInitScript : liveThemeInitScript,
          }}
        />
      </head>
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-text)]">
        {isComingSoonModeEnabled ? (
          <ComingSoonScreen locale="tr" />
        ) : (
          <SiteShell locale="tr">{children}</SiteShell>
        )}
      </body>
    </html>
  );
}
