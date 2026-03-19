import { ProductDetails } from "@/components/product/product-details";
import { ProductHero } from "@/components/product/product-hero";
import { RelatedProducts } from "@/components/product/related-products";
import { getRelatedProducts } from "@/lib/products";
import type { Locale } from "@/types/i18n";
import type { Product } from "@/types/product";

export function ProductDetailPage({
  locale,
  product,
}: {
  locale: Locale;
  product: Product;
}) {
  const relatedProducts = getRelatedProducts(product.slug);

  return (
    <>
      <ProductHero locale={locale} product={product} />
      <ProductDetails locale={locale} product={product} />
      <RelatedProducts locale={locale} products={relatedProducts} />
    </>
  );
}
