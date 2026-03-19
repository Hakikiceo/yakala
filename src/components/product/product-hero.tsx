import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getMessages } from "@/data/messages";
import { getLocalizedPath } from "@/lib/i18n";
import { getProductIntentHref } from "@/lib/intents";
import type { Locale } from "@/types/i18n";
import type { Product } from "@/types/product";

export function ProductHero({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const dictionary = getMessages(locale);
  const statusContent = dictionary.productPage.statusMessages[product.status];
  const intentTarget = getProductIntentHref(locale, product);

  return (
    <section className="relative overflow-hidden pt-36 pb-18 md:pt-44 md:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--color-glow-1),transparent_28%),radial-gradient(circle_at_top_right,var(--color-glow-2),transparent_22%)]" />
      <Container>
        <div className="relative z-10 grid gap-10 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.2)] backdrop-blur-xl md:grid-cols-[1.2fr,0.8fr] md:p-12">
          <div className="max-w-3xl">
            <div className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-subtle)]">
              {product.category[locale]}
            </div>
            <h1 className="max-w-3xl text-balance text-5xl font-light tracking-[-0.07em] text-[var(--color-text)] md:text-7xl">
              {product.name[locale]}
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-light leading-8 text-[var(--color-muted)]">
              {product.longDescription[locale]}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={intentTarget.href}>{statusContent.primaryCta}</Button>
              <Button href={getLocalizedPath(locale, "/products")} variant="secondary">
                {dictionary.common.exploreOtherProducts}
              </Button>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-[var(--color-border-strong)] bg-[var(--color-control-bg)] p-7 text-[var(--color-control-text)] shadow-[0_18px_48px_rgba(0,0,0,0.08)]">
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-subtle)]">
              {dictionary.common.statusLabel}
            </div>
            <div className="mt-4 text-3xl font-medium">
              {dictionary.common.status[product.status]}
            </div>
            <p className="mt-5 text-lg font-medium leading-8 text-[var(--color-control-text)]">
              {statusContent.title}
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--color-control-text-muted)]">
              {statusContent.description}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
