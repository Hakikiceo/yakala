import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getMessages } from "@/data/messages";
import { getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

export function DemoCta({ locale }: { locale: Locale }) {
  const dictionary = getMessages(locale);

  return (
    <section className="py-18 md:py-24">
      <Container>
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,var(--color-panel-strong),var(--color-panel))] px-8 py-10 text-[var(--color-text)] shadow-[0_24px_90px_rgba(0,0,0,0.14)] md:px-12 md:py-14">
          <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
            {dictionary.home.cta.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
            {dictionary.home.cta.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={getLocalizedPath(locale, "/demo")}>
              {dictionary.home.cta.primaryCta}
            </Button>
            <Button href={getLocalizedPath(locale, "/contact")} variant="secondary">
              {dictionary.home.cta.secondaryCta}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
