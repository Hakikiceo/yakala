import type { Locale } from "@/types/i18n";
import type { ConversionIntent, Product, ProductStatus } from "@/types/product";

export function getIntentForProductStatus(status: ProductStatus): ConversionIntent {
  if (status === "beta") {
    return "beta_interest";
  }

  if (status === "comingSoon") {
    return "early_access";
  }

  return "demo";
}

export function getProductIntentHref(locale: Locale, product: Product) {
  const intent = getIntentForProductStatus(product.status);
  const params = new URLSearchParams({
    intent,
    product: product.slug,
  });

  return {
    intent,
    href: `${locale === "tr" ? "" : "/en"}/demo?${params.toString()}`,
  };
}
