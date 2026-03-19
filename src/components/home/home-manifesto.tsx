import { DatabaseIcon, NetworkIcon } from "@/components/home/home-icons";
import { Container } from "@/components/ui/container";
import { getHomepageContent } from "@/data/homepage";
import type { Locale } from "@/types/i18n";

export function HomeManifesto({ locale }: { locale: Locale }) {
  const content = getHomepageContent(locale);

  return (
    <section
      id="platform"
      className="relative z-10 border-y border-[var(--color-border)] bg-[var(--color-panel)] py-32 md:py-40"
    >
      <Container className="flex flex-col gap-20 lg:flex-row lg:gap-24">
        <div className="lg:w-1/3">
          <div className="lg:sticky lg:top-40">
            <h2 className="mb-6 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--color-subtle)]">
              <div className="h-px w-8 bg-[var(--color-border-strong)]" />
              {content.manifesto.kicker}
            </h2>
            <h3 className="mb-6 text-5xl font-light leading-[1.05] tracking-[-0.07em] text-[var(--color-text)] md:text-6xl">
              {content.manifesto.titleLine1}
              <br />
              <span className="font-medium text-[var(--color-subtle)]">
                {content.manifesto.titleLine2}
              </span>
            </h3>
            <p className="text-lg font-light leading-relaxed text-[var(--color-muted)]">
              {content.manifesto.description}
            </p>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-8 md:grid-cols-2">
          {[
            {
              title: content.manifesto.layerTitle,
              description: content.manifesto.layerDescription,
              Icon: DatabaseIcon,
              offset: "",
            },
            {
              title: content.manifesto.deployTitle,
              description: content.manifesto.deployDescription,
              Icon: NetworkIcon,
              offset: "md:translate-y-16",
            },
          ].map(({ title, description, Icon, offset }) => (
            <div
              key={title}
              className={`rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 transition-colors duration-500 hover:bg-[var(--color-surface-strong)] ${offset}`}
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-panel-strong)]">
                <Icon className="h-6 w-6 text-[var(--color-text)]" />
              </div>
              <h4 className="mb-4 text-2xl font-medium text-[var(--color-text)]">{title}</h4>
              <p className="text-base font-light leading-relaxed text-[var(--color-muted)]">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
