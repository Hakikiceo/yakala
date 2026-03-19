import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getMessages } from "@/data/messages";
import { getLocalizedPath } from "@/lib/i18n";
import { getIntentForProductStatus } from "@/lib/intents";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/i18n";
import type { Product } from "@/types/product";

export function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const dictionary = getMessages(locale);
  const href = getLocalizedPath(locale, `/products/${product.slug}`);
  const status = dictionary.common.status[product.status];
  const intent = dictionary.common.intent[getIntentForProductStatus(product.status)];

  return (
    <Link href={href} className="group block h-full">
      <Card
        className={cn(
          "flex h-full flex-col justify-between p-7 transition duration-500 hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-strong)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.18)]",
          product.status === "comingSoon" && "bg-[var(--color-surface)]",
        )}
      >
        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <Badge
              className={cn(
                product.status === "live" &&
                  "border-emerald-500/30 bg-emerald-500/12 text-emerald-700 [html[data-theme='dark']_&]:text-emerald-300",
                product.status === "beta" &&
                  "border-sky-500/30 bg-sky-500/12 text-sky-700 [html[data-theme='dark']_&]:text-sky-300",
                product.status === "comingSoon" &&
                  "border-amber-500/30 bg-amber-500/12 text-amber-700 [html[data-theme='dark']_&]:text-amber-300",
              )}
            >
              {status}
            </Badge>
            <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              {product.category[locale]}
            </span>
          </div>
          <h3 className="text-2xl font-medium tracking-[-0.04em] text-[var(--color-text)]">
            {product.name[locale]}
          </h3>
          <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
            {product.shortDescription[locale]}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-[var(--color-border)] pt-5">
          <div>
            <div className="text-sm font-semibold text-[var(--color-text)]">
              {product.ctaLabel[locale]}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--color-subtle)]">
              {intent}
            </div>
          </div>
          <span className="text-lg text-[var(--color-subtle)] transition group-hover:translate-x-1 group-hover:text-[var(--color-text)]">→</span>
        </div>
      </Card>
    </Link>
  );
}
