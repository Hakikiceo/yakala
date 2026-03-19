"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getAlternateLocale, switchLocalePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/i18n";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const alternateLocale = getAlternateLocale(locale);
  const alternatePath = switchLocalePath(pathname, alternateLocale);

  return (
    <div className="inline-flex items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-control-bg)] p-1 text-[10px] font-bold uppercase tracking-[0.24em] shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md">
      <span className="rounded-full px-3 py-1.5 text-[var(--color-control-text-muted)]">
        {locale === "tr" ? "TR" : "EN"}
      </span>
      <Link
        href={alternatePath}
        className={cn(
          "yakala-primary-action rounded-full px-3 py-1.5 shadow-sm transition",
        )}
      >
        {alternateLocale === "tr" ? "TR" : "EN"}
      </Link>
    </div>
  );
}
