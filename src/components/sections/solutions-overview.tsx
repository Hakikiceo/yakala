import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getMessages } from "@/data/messages";
import type { Locale } from "@/types/i18n";

export function SolutionsOverview({ locale }: { locale: Locale }) {
  const dictionary = getMessages(locale);

  return (
    <section className="py-18">
      <Container>
        <SectionHeading
          eyebrow={dictionary.home.solutions.eyebrow}
          title={dictionary.home.solutions.title}
          description={dictionary.home.solutions.description}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {dictionary.home.solutions.items.map((item) => (
            <Card key={item.title} className="p-7">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
