import { CtaPanel } from "@/components/marketing/cta-panel";
import { FeaturePanelGrid } from "@/components/marketing/feature-panel-grid";
import { PageHero } from "@/components/marketing/page-hero";
import { getMessages } from "@/data/messages";
import { getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

export function AboutPage({ locale }: { locale: Locale }) {
  const dictionary = getMessages(locale);

  return (
    <>
      <PageHero
        eyebrow={dictionary.aboutPage.eyebrow}
        title={dictionary.aboutPage.title}
        description={dictionary.aboutPage.description}
      />
      <FeaturePanelGrid items={dictionary.aboutPage.pillars} columns={3} />
      <CtaPanel
        title={locale === "tr" ? "YAKALA bir kampanya sayfasi degil, urun evidir." : "YAKALA is a product house, not a campaign site."}
        description={
          locale === "tr"
            ? "Her yeni Radar urunu ayni mimari, ayni tasarim sistemi ve ayni kurumsal cati altinda yerini alir."
            : "Each new Radar product can live under the same architecture, design system, and institutional umbrella."
        }
        primaryHref={getLocalizedPath(locale, "/products")}
        primaryLabel={dictionary.common.viewProducts}
        secondaryHref={getLocalizedPath(locale, "/contact")}
        secondaryLabel={dictionary.nav.contact}
      />
    </>
  );
}
