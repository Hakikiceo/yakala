import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getMessages } from "@/data/messages";
import { getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

export function HomeHero({ locale }: { locale: Locale }) {
  const dictionary = getMessages(locale);

  return (
    <section className="py-18 md:py-24">
      <Container>
        <div className="grid gap-10 rounded-[2rem] border border-[var(--color-border)] bg-[rgba(255,255,255,0.76)] p-8 shadow-[0_18px_80px_rgba(15,23,42,0.08)] md:grid-cols-[1.25fr,0.75fr] md:p-12">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-subtle)]">
              {dictionary.home.hero.eyebrow}
            </div>
            <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.06em] text-[var(--color-text)] md:text-7xl">
              {dictionary.home.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
              {dictionary.home.hero.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href={getLocalizedPath(locale, "/demo")}>
                {dictionary.home.hero.primaryCta}
              </Button>
              <Button href={getLocalizedPath(locale, "/products")} variant="secondary">
                {dictionary.home.hero.secondaryCta}
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {dictionary.home.platformOverview.points.map((point) => (
              <div
                key={point}
                className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6"
              >
                <div className="text-sm font-medium leading-7 text-[var(--color-text)]">
                  {point}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
