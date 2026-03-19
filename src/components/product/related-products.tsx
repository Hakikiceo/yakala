import { ProductCard } from "@/components/product/product-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getMessages } from "@/data/messages";
import type { Locale } from "@/types/i18n";
import type { Product } from "@/types/product";

export function RelatedProducts({
  locale,
  products,
}: {
  locale: Locale;
  products: Product[];
}) {
  const dictionary = getMessages(locale);

  return (
    <section className="pb-18 md:pb-24">
      <Container>
        <SectionHeading eyebrow={dictionary.productsPage.eyebrow} title={dictionary.productPage.relatedTitle} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  );
}
