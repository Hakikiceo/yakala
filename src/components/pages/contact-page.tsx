import { CtaPanel } from "@/components/marketing/cta-panel";
import { FeaturePanelGrid } from "@/components/marketing/feature-panel-grid";
import { PageHero } from "@/components/marketing/page-hero";
import { getMessages } from "@/data/messages";
import { siteConfig } from "@/data/site";
import { getLocalizedPath } from "@/lib/i18n";
import { getProductBySlug } from "@/lib/products";
import type { Locale } from "@/types/i18n";
import type { ConversionIntent } from "@/types/product";

export function ContactPage({
  locale,
  intent = "general_contact",
  productSlug,
}: {
  locale: Locale;
  intent?: ConversionIntent;
  productSlug?: string;
}) {
  const dictionary = getMessages(locale);
  const selectedProduct = productSlug ? getProductBySlug(productSlug) : undefined;

  return (
    <>
      <PageHero
        eyebrow={dictionary.contactPage.eyebrow}
        title={dictionary.contactPage.title}
        description={dictionary.contactPage.description}
      />
      <section className="pb-10">
        <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
          <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              {dictionary.demoPage.intentLabel}
            </div>
            <div className="mt-3 text-2xl font-medium tracking-[-0.03em] text-[var(--color-text)]">
              {dictionary.common.intent[intent]}
            </div>
            {selectedProduct ? (
              <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">
                {selectedProduct.name[locale]}
              </p>
            ) : null}
          </div>
        </div>
      </section>
      <FeaturePanelGrid
        columns={2}
        items={dictionary.contactPage.cards.map((card, index) => ({
          title: card.title,
          description: card.description,
          extra:
            index === 0
              ? `${siteConfig.email} / ${siteConfig.phone}`
              : siteConfig.location[locale],
        }))}
      />
      <CtaPanel
        title={locale === "tr" ? "Dogru Radar kurgusunu birlikte netlestirelim." : "Clarify the right Radar configuration together."}
        description={
          locale === "tr"
            ? "Genel bir kurumsal gorusme, demo planlamasi veya urun ailesi uzerinden ihtiyac analizi icin ekiple iletisime gecin."
            : "Reach the team for a broader institutional conversation, a demo plan, or a product-family level needs review."
        }
        primaryHref={`mailto:${siteConfig.email}`}
        primaryLabel={dictionary.common.contactSales}
        secondaryHref={getLocalizedPath(locale, "/demo")}
        secondaryLabel={dictionary.nav.demo}
      />
    </>
  );
}
