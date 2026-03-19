import { Container } from "@/components/ui/container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-18 md:pt-44 md:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--color-glow-1),transparent_28%),radial-gradient(circle_at_top_right,var(--color-glow-2),transparent_22%)]" />
      <Container className="relative z-10">
        {eyebrow ? (
          <div className="mb-6 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--color-subtle)]">
            <div className="h-px w-8 bg-[var(--color-border-strong)]" />
            {eyebrow}
          </div>
        ) : null}
        <h1 className="max-w-4xl text-balance text-5xl font-light leading-[0.95] tracking-[-0.07em] text-[var(--color-text)] md:text-7xl">
          {title}
        </h1>
        {description ? <p className="mt-8 max-w-3xl text-xl font-light leading-relaxed text-[var(--color-muted)]">{description}</p> : null}
      </Container>
    </section>
  );
}
