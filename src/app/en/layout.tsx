import type { ReactNode } from "react";
import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/site-shell";
import "@/app/globals.css";
import { siteMetadataBase } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: siteMetadataBase,
};

const themeInitScript = `
  try {
    var storedTheme = window.localStorage.getItem("yakala-theme");
    var theme = storedTheme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = "dark";
  }
`;

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-text)]">
        <SiteShell locale="en">{children}</SiteShell>
      </body>
    </html>
  );
}
