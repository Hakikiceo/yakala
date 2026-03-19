"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LanguageSwitch } from "@/components/layout/language-switch";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Container } from "@/components/ui/container";
import { getHomepageContent } from "@/data/homepage";
import { getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const content = getHomepageContent(locale);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/" || pathname === "/en";

  const navItems = [
    {
      label: content.shell.platform,
      href: isHome ? "#platform" : getLocalizedPath(locale, "/"),
    },
    {
      label: content.shell.ecosystem,
      href: isHome ? "#ecosystem" : getLocalizedPath(locale, "/products"),
    },
    {
      label: content.shell.solutions,
      href: isHome ? "#solutions" : getLocalizedPath(locale, "/solutions"),
    },
    {
      label: content.shell.institution,
      href: isHome ? "#institution" : getLocalizedPath(locale, "/about"),
    },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-700 ${
        scrolled
          ? "border-[var(--color-border)] bg-[color:var(--color-surface-strong)] py-4 shadow-[0_4px_30px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
          : "border-transparent bg-transparent py-8"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between gap-3 md:gap-4">
          <Link href={getLocalizedPath(locale, "/")} className="flex items-center gap-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-[var(--color-accent-bg)] shadow-[0_0_15px_rgba(0,0,0,0.08)]">
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-text)]" />
            </div>
            <span className="text-lg font-semibold uppercase tracking-[0.2em] text-[var(--color-text)]">
              YAKALA<span className="font-light text-[var(--color-subtle)]">.IO</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)] md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition hover:text-[var(--color-text)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 md:gap-6">
            <ThemeToggle />
            <LanguageSwitch locale={locale} />
            <Link
              href={getLocalizedPath(locale, "/contact")}
              className="hidden text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)] transition hover:text-[var(--color-text)] md:block"
            >
              {content.shell.contact}
            </Link>
            <Link
              href={getLocalizedPath(locale, "/demo")}
              className="yakala-primary-action inline-flex rounded-sm px-3.5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] transition hover:scale-[1.02] md:px-6 md:text-[11px] md:tracking-[0.26em]"
            >
              {content.shell.requestAccess}
            </Link>
          </div>
        </div>

        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="shrink-0 rounded-full border border-[var(--color-border)] bg-[var(--color-control-bg)] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-control-text-muted)] transition hover:bg-[var(--color-control-bg-hover)] hover:text-[var(--color-control-text)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
