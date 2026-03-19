import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getHomepageContent } from "@/data/homepage";
import { getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

export function HomeInstitutionalCta({ locale }: { locale: Locale }) {
  const content = getHomepageContent(locale);

  return (
    <section id="institution" className="relative z-10 overflow-hidden px-6 py-32 text-center md:px-12 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_100%)]" />

      <h2 className="mb-16 text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--color-subtle)]">
        {content.cta.kicker}
      </h2>

      <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-center gap-12 opacity-35 md:gap-24">
        {content.cta.institutionalMarks.map((mark) => (
          <div
            key={mark}
            className="text-2xl font-light uppercase tracking-[0.28em] text-[var(--color-text)]"
          >
            {mark}
          </div>
        ))}
      </div>

      <Container className="mt-28 max-w-5xl">
        <div className="relative inline-block w-full">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-[var(--color-glow-1)] via-transparent to-[var(--color-glow-1)] blur-2xl opacity-60" />
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] px-8 py-16 shadow-[0_30px_100px_rgba(0,0,0,0.22)] md:px-16 md:py-28">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,var(--color-glow-1)_0,transparent_70%)]" />
            <h3 className="relative z-10 mb-8 text-5xl font-light tracking-[-0.07em] text-[var(--color-text)] md:text-7xl">
              {content.cta.title}
            </h3>
            <p className="relative z-10 mx-auto mb-12 max-w-2xl text-xl font-light leading-relaxed text-[var(--color-muted)]">
              {content.cta.description}
            </p>
            <Link
              href={getLocalizedPath(locale, "/demo")}
              className="yakala-primary-action relative z-10 inline-flex rounded-sm px-12 py-6 text-sm font-bold uppercase tracking-[0.22em] transition hover:scale-[1.02]"
            >
              {content.cta.primaryCta}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
