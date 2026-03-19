import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getMessages } from "@/data/messages";
import type { Locale } from "@/types/i18n";
import type { Product } from "@/types/product";

export function ProductDetails({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const dictionary = getMessages(locale);

  return (
    <section className="pb-18 md:pb-24">
      <Container className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <Card className="p-8 md:p-10">
          <SectionHeading
            title={dictionary.productPage.featuresTitle}
            description={product.shortDescription[locale]}
          />
          <ul className="mt-8 space-y-4">
            {product.featureBullets[locale].map((bullet) => (
              <li
                key={bullet}
                className="rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-control-bg)] px-5 py-4 text-[var(--color-control-text)] shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-8 md:p-10">
          <SectionHeading
            title={dictionary.productPage.audienceTitle}
            description={product.longDescription[locale]}
          />
          <ul className="mt-8 space-y-4">
            {product.targetAudience[locale].map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-control-bg)] px-5 py-4 text-[var(--color-control-text)] shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </Container>
    </section>
  );
}
