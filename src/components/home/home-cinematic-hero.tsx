import Link from "next/link";

import { ArrowRightIcon } from "@/components/home/home-icons";
import { Container } from "@/components/ui/container";
import { getHomepageContent } from "@/data/homepage";
import { getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

export function HomeCinematicHero({ locale }: { locale: Locale }) {
  const content = getHomepageContent(locale);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="yakala-home-orbit h-full w-full scale-105 bg-cover bg-no-repeat"
          style={{
            backgroundImage: "var(--hero-image-url)",
            backgroundPosition: "center 38%",
            filter: "var(--color-hero-image-filter)",
            opacity: "var(--color-hero-image-opacity)",
          }}
        />
      </div>
      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_top,var(--color-hero-overlay-a),var(--color-hero-overlay-b),transparent)]" />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,var(--color-hero-overlay-a),var(--color-hero-overlay-c),transparent)]" />

      <Container className="relative z-20 mt-16 flex w-full flex-col items-center gap-16 py-20 lg:flex-row">
        <div className="max-w-3xl flex-1">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-control-bg)] px-4 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.1)] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--color-control-text-muted)]">
              {content.hero.status}
            </span>
          </div>

          <h1 className="mb-8 text-6xl font-light leading-[0.9] tracking-[-0.08em] text-[var(--color-text)] md:text-8xl lg:text-[7rem]">
            {content.hero.titleLine1}
            <br />
            <span className="bg-gradient-to-r from-[var(--color-text)] to-[var(--color-subtle)] bg-clip-text font-medium text-transparent">
              {content.hero.titleLine2}
            </span>
          </h1>

          <p className="mb-12 max-w-2xl text-xl font-light leading-relaxed text-[var(--color-muted)] md:text-2xl">
            {content.hero.description}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href={getLocalizedPath(locale, "/products")}
              className="yakala-primary-action inline-flex items-center justify-center gap-3 rounded-sm px-10 py-5 text-sm font-bold uppercase tracking-[0.22em] transition-all hover:scale-[1.02]"
            >
              {content.hero.primaryCta}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href={getLocalizedPath(locale, "/solutions")}
              className="yakala-secondary-action inline-flex items-center justify-center gap-2 rounded-sm border px-10 py-5 text-sm font-semibold uppercase tracking-[0.22em] backdrop-blur-md transition"
            >
              {content.hero.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="hidden flex-1 justify-end lg:flex">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
            <div className="mb-8 flex items-center justify-between border-b border-[var(--color-border)] pb-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--color-muted)]">
                {content.hero.panelEyebrow}
              </div>
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[var(--color-subtle)]" />
                <div className="h-2 w-2 rounded-full bg-[var(--color-subtle)]" />
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
            </div>
            <div className="space-y-6">
              {content.hero.panelStats.map((stat) => (
                <div key={stat.label}>
                  <div className="mb-1 text-[10px] uppercase tracking-[0.24em] text-[var(--color-subtle)]">
                    {stat.label}
                  </div>
                  <div className="font-mono text-4xl font-light tracking-[-0.06em] text-[var(--color-text)]">
                    {stat.value}
                  </div>
                </div>
              ))}
              <div className="h-px w-full bg-[var(--color-border)]" />
              <div className="flex h-24 items-end gap-2 pt-2 opacity-70">
                {[22, 34, 46, 58, 40, 72, 60, 54, 76, 66, 82, 61, 73, 68, 88].map(
                  (height, index) => (
                    <div
                      key={`${height}-${index}`}
                      className="flex-1 rounded-sm bg-[var(--color-accent-bg)]/80"
                      style={{ height: `${height}%` }}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
