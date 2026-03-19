import { Button } from "@/components/ui/button";
import { CtaPanel } from "@/components/marketing/cta-panel";
import { FeaturePanelGrid } from "@/components/marketing/feature-panel-grid";
import { PageHero } from "@/components/marketing/page-hero";
import { getMessages } from "@/data/messages";
import { getProductBySlug } from "@/lib/products";
import { siteConfig } from "@/data/site";
import { getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";
import type { ConversionIntent } from "@/types/product";

export function DemoPage({
  locale,
  intent = "demo",
  productSlug,
}: {
  locale: Locale;
  intent?: ConversionIntent;
  productSlug?: string;
}) {
  const dictionary = getMessages(locale);
  const selectedProduct = productSlug ? getProductBySlug(productSlug) : undefined;
  const intentContent = dictionary.demoPage.intents[intent];

  return (
    <>
      <PageHero
        eyebrow={dictionary.demoPage.eyebrow}
        title={dictionary.demoPage.title}
        description={dictionary.demoPage.description}
      />
      <section className="pb-10">
        <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
          <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                {dictionary.demoPage.intentLabel}
              </div>
              <div className="mt-3 text-2xl font-medium tracking-[-0.03em] text-[var(--color-text)]">
                {intentContent.title}
              </div>
              <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">
                {intentContent.description}
              </p>
              {selectedProduct ? (
                <p className="mt-4 text-sm font-medium text-[var(--color-text)]">
                  {selectedProduct.name[locale]}
                </p>
              ) : null}
            </div>
            <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8 shadow-[0_20px_70px_rgba(0,0,0,0.2)]">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-subtle)]">
                YAKALA.IO
              </div>
              <p className="mt-6 text-lg leading-8 text-[var(--color-muted)]">{siteConfig.email}</p>
              <p className="mt-2 text-lg leading-8 text-[var(--color-muted)]">{siteConfig.phone}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={`mailto:${siteConfig.email}`}>{dictionary.common.contactSales}</Button>
                <Button
                  href={getLocalizedPath(locale, `/contact?intent=general_contact${selectedProduct ? `&product=${selectedProduct.slug}` : ""}`)}
                  variant="secondary"
                >
                  {dictionary.common.intent.general_contact}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FeaturePanelGrid
        columns={3}
        items={dictionary.demoPage.bullets.map((bullet, index) => ({
          title:
            index === 0
              ? dictionary.common.intent.demo
              : index === 1
                ? dictionary.common.intent.beta_interest
                : dictionary.common.intent.early_access,
          description: bullet,
        }))}
      />
      <CtaPanel
        title={locale === "tr" ? "Talep yapisini olusturduk, form akisini sonra baglariz." : "The request structure is ready; the form flow can be connected next."}
        description={
          locale === "tr"
            ? "Demo, beta ilgisi, erken erisim ve genel iletisim niyetleri artik ayri sekilde okunabiliyor. Bir sonraki adim bunlari forma veya CRM akisine baglamak."
            : "Demo, beta interest, early access, and general contact intents are now separated cleanly. The next step is wiring them into a form or CRM flow."
        }
        primaryHref={`mailto:${siteConfig.email}`}
        primaryLabel={dictionary.common.contactSales}
        secondaryHref={getLocalizedPath(locale, "/products")}
        secondaryLabel={dictionary.common.viewProducts}
      />
    </>
  );
}
