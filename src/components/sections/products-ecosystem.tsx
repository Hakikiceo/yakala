import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getMessages } from "@/data/messages";
import { getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";
import type { Product } from "@/types/product";

export function ProductsEcosystem({
  locale,
  products,
  showEcosystemSummary = false,
}: {
  locale: Locale;
  products: Product[];
  showEcosystemSummary?: boolean;
}) {
  const dictionary = getMessages(locale);
  const liveCount = products.filter((product) => product.status === "live").length;
  const betaCount = products.filter((product) => product.status === "beta").length;
  const comingSoonCount = products.filter((product) => product.status === "comingSoon").length;

  return (
    <section className="py-18">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={dictionary.home.products.eyebrow}
            title={dictionary.home.products.title}
            description={dictionary.home.products.description}
          />
          <Button href={getLocalizedPath(locale, "/products")} variant="secondary">
            {dictionary.common.viewProducts}
          </Button>
        </div>
        {showEcosystemSummary ? (
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-[1.5rem] border border-[var(--color-border-strong)] bg-[var(--color-control-bg)] p-6 shadow-[0_12px_28px_rgba(0,0,0,0.04)]">
              <div className="text-3xl font-semibold tracking-[-0.05em] text-[var(--color-text)]">
                {products.length}
              </div>
              <div className="mt-2 text-sm text-[var(--color-muted)]">
                {dictionary.home.products.ecosystemTitle}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--color-border-strong)] bg-[var(--color-control-bg)] p-6 shadow-[0_12px_28px_rgba(0,0,0,0.04)]">
              <div className="text-3xl font-semibold tracking-[-0.05em] text-[var(--color-text)]">
                {liveCount}
              </div>
              <div className="mt-2 text-sm text-[var(--color-muted)]">
                {dictionary.home.products.statusSummary.live}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--color-border-strong)] bg-[var(--color-control-bg)] p-6 shadow-[0_12px_28px_rgba(0,0,0,0.04)]">
              <div className="text-3xl font-semibold tracking-[-0.05em] text-[var(--color-text)]">
                {betaCount}
              </div>
              <div className="mt-2 text-sm text-[var(--color-muted)]">
                {dictionary.home.products.statusSummary.beta}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--color-border-strong)] bg-[var(--color-control-bg)] p-6 shadow-[0_12px_28px_rgba(0,0,0,0.04)]">
              <div className="text-3xl font-semibold tracking-[-0.05em] text-[var(--color-text)]">
                {comingSoonCount}
              </div>
              <div className="mt-2 text-sm text-[var(--color-muted)]">
                {dictionary.home.products.statusSummary.comingSoon}
              </div>
            </div>
          </div>
        ) : null}
        {showEcosystemSummary ? (
          <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--color-muted)]">
            {dictionary.home.products.ecosystemDescription}
          </p>
        ) : null}
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  );
}
