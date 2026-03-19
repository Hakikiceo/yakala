import Link from "next/link";

import { ChevronRightIcon, ProductIcon } from "@/components/home/home-icons";
import { getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";
import type { Product } from "@/types/product";

export function HomeRadarCard({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  return (
    <Link
      href={getLocalizedPath(locale, `/products/${product.slug}`)}
      className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8 backdrop-blur-md transition-all duration-700 hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-strong)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.22)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-glow-1)] via-transparent to-transparent opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] transition-colors duration-700 group-hover:bg-[var(--color-accent-bg)]">
        <ProductIcon
          slug={product.slug}
          className="h-6 w-6 text-[var(--color-muted)] transition-colors duration-700 group-hover:text-[var(--color-accent-text)]"
        />
      </div>
      <div className="relative z-10 mt-auto pt-12">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h4 className="text-xl font-medium tracking-tight text-[var(--color-text)]">{product.name[locale]}</h4>
          <div className="flex h-8 w-8 translate-x-[-12px] items-center justify-center rounded-full bg-[var(--color-surface-strong)] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
            <ChevronRightIcon className="h-4 w-4 text-[var(--color-text)]" />
          </div>
        </div>
        <p className="text-sm font-light leading-7 text-[var(--color-muted)]">
          {product.shortDescription[locale]}
        </p>
      </div>
    </Link>
  );
}
