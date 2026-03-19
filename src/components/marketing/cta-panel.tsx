import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CtaPanel({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] px-8 py-12 shadow-[0_30px_100px_rgba(0,0,0,0.22)] md:px-12 md:py-14">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-[radial-gradient(ellipse_at_top,var(--color-glow-1)_0,transparent_70%)]" />
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-balance text-4xl font-light tracking-[-0.06em] text-[var(--color-text)] md:text-5xl">
              {title}
            </h2>
            <p className="mt-5 text-lg font-light leading-8 text-[var(--color-muted)]">{description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={primaryHref}>{primaryLabel}</Button>
              {secondaryHref && secondaryLabel ? (
                <Button href={secondaryHref} variant="secondary">
                  {secondaryLabel}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
