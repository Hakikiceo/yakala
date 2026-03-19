import { CpuIcon, GlobeIcon, ShieldIcon } from "@/components/home/home-icons";
import { Container } from "@/components/ui/container";
import { getHomepageContent } from "@/data/homepage";
import type { Locale } from "@/types/i18n";

const dashboardImage =
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop";

export function HomeSolutions({ locale }: { locale: Locale }) {
  const content = getHomepageContent(locale);
  const icons = [ShieldIcon, GlobeIcon, CpuIcon];

  return (
    <section
      id="solutions"
      className="relative z-10 overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-panel)] py-32 md:py-40"
    >
      <div className="absolute right-0 top-1/2 h-[800px] w-[800px] -translate-y-1/2 rounded-full bg-[var(--color-glow-1)] blur-[120px]" />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-5">
            <h2 className="mb-6 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--color-subtle)]">
              <div className="h-px w-8 bg-[var(--color-border-strong)]" />
              {content.solutions.kicker}
            </h2>
            <h3 className="mb-16 text-4xl font-light leading-[1.08] tracking-[-0.06em] text-[var(--color-text)] md:text-6xl">
              {content.solutions.titleLine1}
              <br />
              <span className="text-[var(--color-subtle)]">{content.solutions.titleLine2}</span>
            </h3>

            <div className="space-y-12">
              {content.solutions.items.map((item, index) => {
                const Icon = icons[index];

                return (
                  <div key={item.title} className="flex gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]">
                      <Icon className="h-5 w-5 text-[var(--color-muted)]" />
                    </div>
                    <div>
                      <h4 className="mb-2 text-lg font-medium text-[var(--color-text)]">{item.title}</h4>
                      <p className="font-light leading-relaxed text-[var(--color-muted)]">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[0_25px_80px_rgba(0,0,0,0.2)] backdrop-blur-3xl md:p-8">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-25"
                style={{ backgroundImage: `url('${dashboardImage}')` }}
              />

              <div className="relative z-10 flex h-full flex-col gap-4">
                <div className="flex h-12 items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 backdrop-blur-xl">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="h-4 w-32 rounded-full bg-[var(--color-border)]" />
                </div>

                <div className="flex flex-1 gap-4">
                  <div className="hidden w-1/4 flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-4 backdrop-blur-xl md:flex">
                    <div className="mb-4 h-8 w-full rounded-md bg-[var(--color-border)]" />
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="h-4 w-full rounded-sm bg-[var(--color-border)]" />
                    ))}
                  </div>

                  <div className="flex flex-1 flex-col gap-4">
                    <div className="relative flex flex-1 flex-col justify-end overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-6 backdrop-blur-xl">
                      <svg
                        className="absolute bottom-0 left-0 right-0 h-32 w-full opacity-60"
                        viewBox="0 0 100 40"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0,40 L0,20 Q10,10 20,25 T40,15 T60,30 T80,10 T100,20 L100,40 Z"
                          fill="currentColor"
                          className="text-emerald-500/20"
                        />
                        <path
                          d="M0,20 Q10,10 20,25 T40,15 T60,30 T80,10 T100,20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          className="text-emerald-400"
                        />
                      </svg>
                      <div className="relative z-10 flex items-end justify-between">
                        <div>
                          <div className="mb-1 text-[10px] uppercase tracking-[0.24em] text-[var(--color-subtle)]">
                            {content.solutions.dashboardLabel}
                          </div>
                          <div className="text-3xl font-light tracking-[-0.05em] text-[var(--color-text)]">
                            {content.solutions.dashboardValue}
                          </div>
                        </div>
                        <div className="font-mono text-sm text-emerald-400">
                          {content.solutions.dashboardDelta}
                        </div>
                      </div>
                    </div>

                    <div className="flex h-1/3 gap-4">
                      {Array.from({ length: 2 }).map((_, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-4 backdrop-blur-xl"
                        >
                          <div className="mb-4 h-8 w-8 rounded-full bg-[var(--color-border)]" />
                          <div className="mb-2 h-2 w-1/2 rounded-full bg-[var(--color-border-strong)]" />
                          <div className="h-2 w-3/4 rounded-full bg-[var(--color-border)]" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
