import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import type { Locale } from "@/types/i18n";

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-500">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--color-glow-1),transparent_30%),radial-gradient(circle_at_top_right,var(--color-glow-2),transparent_24%),linear-gradient(180deg,var(--color-bg)_0%,var(--color-bg-elevated)_100%)]" />
        <SiteHeader locale={locale} />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={locale} />
      </div>
    </ThemeProvider>
  );
}
