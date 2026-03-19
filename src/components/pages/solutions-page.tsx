import { CtaPanel } from "@/components/marketing/cta-panel";
import { FeaturePanelGrid } from "@/components/marketing/feature-panel-grid";
import { PageHero } from "@/components/marketing/page-hero";
import { getMessages } from "@/data/messages";
import { getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

export function SolutionsPage({ locale }: { locale: Locale }) {
  const dictionary = getMessages(locale);

  return (
    <>
      <PageHero
        eyebrow={dictionary.solutionsPage.eyebrow}
        title={dictionary.solutionsPage.title}
        description={dictionary.solutionsPage.description}
      />
      <FeaturePanelGrid items={dictionary.solutionsPage.items} columns={3} />
      <CtaPanel
        title={locale === "tr" ? "Cozum alanlarini urun ailesiyle eslestirin." : "Map solution areas to the product family."}
        description={
          locale === "tr"
            ? "YAKALA, tek urun mantigiyla degil; firsat takibi, pazar gorunurlugu ve sektorel izleme ihtiyaclarina gore konumlanir."
            : "YAKALA is positioned not as a single tool, but around opportunity tracking, market visibility, and vertical monitoring needs."
        }
        primaryHref={getLocalizedPath(locale, "/products")}
        primaryLabel={dictionary.common.viewProducts}
        secondaryHref={getLocalizedPath(locale, "/demo")}
        secondaryLabel={dictionary.nav.demo}
      />
    </>
  );
}
