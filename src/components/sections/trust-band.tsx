import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getMessages } from "@/data/messages";
import type { Locale } from "@/types/i18n";

export function TrustBand({ locale }: { locale: Locale }) {
  const dictionary = getMessages(locale);

  return (
    <section className="py-18">
      <Container>
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,var(--color-surface-strong),var(--color-surface))] p-8 md:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.06)]">
          <SectionHeading
            eyebrow={dictionary.home.trust.eyebrow}
            title={dictionary.home.trust.title}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {dictionary.home.trust.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.5rem] border border-[var(--color-border-strong)] bg-[var(--color-control-bg)] p-6 shadow-[0_12px_28px_rgba(0,0,0,0.04)]"
              >
                <div className="text-4xl font-semibold tracking-[-0.06em] text-[var(--color-text)]">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-[var(--color-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
