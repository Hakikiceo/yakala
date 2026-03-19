import Link from "next/link";

import { ArrowRightIcon } from "@/components/home/home-icons";
import { HomeRadarCard } from "@/components/home/home-radar-card";
import { Container } from "@/components/ui/container";
import { getHomepageContent } from "@/data/homepage";
import { getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";
import type { Product } from "@/types/product";

export function HomeEcosystem({
  locale,
  products,
}: {
  locale: Locale;
  products: Product[];
}) {
  const content = getHomepageContent(locale);

  return (
    <section id="ecosystem" className="relative z-10 py-32 md:py-40">
      <Container>
        <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-6 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--color-subtle)]">
              <div className="h-px w-8 bg-[var(--color-border-strong)]" />
              {content.ecosystem.kicker}
            </h2>
            <h3 className="text-4xl font-light tracking-[-0.06em] text-[var(--color-text)] md:text-6xl">
              {content.ecosystem.title}
            </h3>
          </div>

          <Link
            href={getLocalizedPath(locale, "/products")}
            className="inline-flex items-center gap-2 border-b border-[var(--color-text)] pb-1 text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-text)] transition-colors hover:border-[var(--color-subtle)] hover:text-[var(--color-subtle)]"
          >
            {content.ecosystem.viewAll}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {[
            {
              value: products.length.toString(),
              label: content.ecosystem.summary.total,
            },
            {
              value: products.filter((product) => product.status === "live").length.toString(),
              label: content.ecosystem.summary.live,
            },
            {
              value: products.filter((product) => product.status === "beta").length.toString(),
              label: content.ecosystem.summary.beta,
            },
            {
              value: products
                .filter((product) => product.status === "comingSoon")
                .length.toString(),
              label: content.ecosystem.summary.comingSoon,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
            >
              <div className="text-3xl font-light tracking-[-0.06em] text-[var(--color-text)]">{stat.value}</div>
              <div className="mt-2 text-sm text-[var(--color-muted)]">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <HomeRadarCard key={product.slug} product={product} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  );
}
