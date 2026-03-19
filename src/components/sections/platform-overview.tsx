import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getMessages } from "@/data/messages";
import type { Locale } from "@/types/i18n";

export function PlatformOverview({ locale }: { locale: Locale }) {
  const dictionary = getMessages(locale);

  return (
    <section className="py-18">
      <Container className="grid gap-10 lg:grid-cols-[0.95fr,1.05fr]">
        <SectionHeading
          eyebrow={dictionary.home.platformOverview.eyebrow}
          title={dictionary.home.platformOverview.title}
          description={dictionary.home.platformOverview.description}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {dictionary.home.platformOverview.points.map((point) => (
            <div
              key={point}
              className="rounded-[1.5rem] border border-[var(--color-border-strong)] bg-[var(--color-control-bg)] p-6 text-sm leading-7 text-[var(--color-control-text)] shadow-[0_12px_28px_rgba(0,0,0,0.04)]"
            >
              {point}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
