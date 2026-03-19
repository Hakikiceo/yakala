import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export function FeaturePanelGrid({
  items,
  columns = 3,
}: {
  items: {
    title: string;
    description: string;
    extra?: string;
  }[];
  columns?: 2 | 3;
}) {
  return (
    <section className="pb-20 md:pb-24">
      <Container
        className={`grid gap-6 ${
          columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        {items.map((item) => (
          <Card key={item.title} className="p-8">
            <h3 className="text-xl font-medium tracking-[-0.03em] text-[var(--color-text)]">{item.title}</h3>
            <p className="mt-4 text-base font-light leading-7 text-[var(--color-muted)]">
              {item.description}
            </p>
            {item.extra ? (
              <div className="mt-6 border-t border-[var(--color-border)] pt-5 text-sm uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                {item.extra}
              </div>
            ) : null}
          </Card>
        ))}
      </Container>
    </section>
  );
}
