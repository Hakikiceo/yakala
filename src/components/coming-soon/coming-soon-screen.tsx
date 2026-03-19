import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getMessages } from "@/data/messages";
import { siteConfig } from "@/data/site";
import { getAlternateLocale, getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

const cardCopy = {
  tr: {
    platform: "Platform",
    ecosystem: "Radar ekosistemi",
    location: "Konum",
  },
  en: {
    platform: "Platform",
    ecosystem: "Radar ecosystem",
    location: "Location",
  },
} as const;

export function ComingSoonScreen({ locale }: { locale: Locale }) {
  const dictionary = getMessages(locale);
  const alternateLocale = getAlternateLocale(locale);
  const content = dictionary.comingSoonPage;
  const labels = cardCopy[locale];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_20%),linear-gradient(180deg,#050506_0%,#0a0a0d_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-35"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=100&w=4000&auto=format&fit=crop")',
          backgroundPosition: "center 30%",
          backgroundSize: "cover",
          filter: "brightness(0.38) contrast(1.1) grayscale(0.22)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,3,3,0.86)_0%,rgba(3,3,3,0.74)_42%,rgba(3,3,3,0.96)_100%)]" />

      <Container className="flex min-h-screen flex-col justify-between py-8 md:py-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-[var(--color-accent-bg)] shadow-[0_0_15px_rgba(0,0,0,0.12)]">
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-text)]" />
            </div>
            <span className="text-lg font-semibold uppercase tracking-[0.2em] text-[var(--color-text)]">
              YAKALA<span className="font-light text-[var(--color-subtle)]">.IO</span>
            </span>
          </div>

          <Link
            href={getLocalizedPath(alternateLocale, "/")}
            className="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-control-bg)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-control-text)] backdrop-blur-md transition hover:bg-[var(--color-control-bg-hover)]"
          >
            {alternateLocale === "tr" ? dictionary.nav.turkish : dictionary.nav.english}
          </Link>
        </div>

        <section className="py-16 md:py-20">
          <div className="max-w-5xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--color-control-text-muted)]">
                {content.eyebrow}
              </span>
            </div>

            <h1 className="max-w-4xl text-5xl font-light leading-[0.92] tracking-[-0.08em] text-[var(--color-text)] md:text-7xl lg:text-[6.5rem]">
              {content.title}
            </h1>

            <p className="mt-8 max-w-2xl text-lg font-light leading-8 text-[var(--color-muted)] md:text-xl">
              {content.description}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={`mailto:${siteConfig.email}`}
                className="yakala-primary-action inline-flex items-center justify-center rounded-sm px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] transition hover:scale-[1.02]"
              >
                {content.contactCta}
              </a>
              <div className="yakala-secondary-action inline-flex items-center justify-center rounded-sm border px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em]">
                {content.availability}
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--color-subtle)]">
                {labels.platform}
              </div>
              <div className="mt-5 text-3xl font-light tracking-[-0.05em] text-[var(--color-text)]">
                {labels.ecosystem}
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--color-subtle)]">
                {labels.location}
              </div>
              <div className="mt-5 text-lg font-light text-[var(--color-text)]">
                {siteConfig.location[locale]}
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border)] pt-6 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)] md:flex-row md:items-center">
          <span>{siteConfig.name} © 2026</span>
        </div>
      </Container>
    </main>
  );
}
