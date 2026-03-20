"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { switchLocalePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/i18n";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const trPath = switchLocalePath(pathname, "tr");
  const enPath = switchLocalePath(pathname, "en");

  return (
    <div className="inline-flex items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-control-bg)] p-1 text-[11px] font-bold uppercase tracking-[0.12em] shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md">
      <Link
        href={trPath}
        aria-current={locale === "tr" ? "page" : undefined}
        className={cn(
          "rounded-full px-3.5 py-1.5 shadow-sm transition",
          locale === "tr"
            ? "bg-[var(--color-accent-bg)] !text-[var(--color-accent-text)]"
            : "text-[var(--color-control-text-muted)] hover:text-[var(--color-control-text)]",
        )}
      >
        TR
      </Link>
      <Link
        href={enPath}
        aria-current={locale === "en" ? "page" : undefined}
        className={cn(
          "rounded-full px-3.5 py-1.5 shadow-sm transition",
          locale === "en"
            ? "bg-[var(--color-accent-bg)] !text-[var(--color-accent-text)]"
            : "text-[var(--color-control-text-muted)] hover:text-[var(--color-control-text)]",
        )}
      >
        EN
      </Link>
    </div>
  );
}
