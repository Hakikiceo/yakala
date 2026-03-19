import { HomeEcosystem } from "@/components/home/home-ecosystem";
import { CtaPanel } from "@/components/marketing/cta-panel";
import { FeaturePanelGrid } from "@/components/marketing/feature-panel-grid";
import { PageHero } from "@/components/marketing/page-hero";
import { getMessages } from "@/data/messages";
import { getLocalizedPath } from "@/lib/i18n";
import { getAllProducts } from "@/lib/products";
import type { Locale } from "@/types/i18n";

export function ProductsPage({ locale }: { locale: Locale }) {
  const dictionary = getMessages(locale);
  const products = getAllProducts();

  return (
    <>
      <PageHero
        eyebrow={dictionary.productsPage.eyebrow}
        title={dictionary.productsPage.title}
        description={dictionary.productsPage.description}
      />
      <FeaturePanelGrid
        columns={3}
        items={[
          {
            title: dictionary.common.status.live,
            description:
              locale === "tr"
                ? "Canli urunler dogrudan detay sayfasi, demo akisina ve operasyonel degerlendirmeye acilir."
                : "Live products open directly into product evaluation, detail review, and demo planning.",
          },
          {
            title: dictionary.common.status.beta,
            description:
              locale === "tr"
                ? "Beta urunler erken ilgi, geri bildirim ve kontrollu erisim sureci icin ayri konumlanir."
                : "Beta products are positioned for early interest, feedback, and controlled access planning.",
          },
          {
            title: dictionary.common.status.comingSoon,
            description:
              locale === "tr"
                ? "Yaklasan urunler lansman oncesi talepleri ve stratejik ilgi toplamak icin teaser olarak sunulur."
                : "Upcoming products are presented as teasers to collect strategic pre-launch demand and interest.",
          },
        ]}
      />
      <HomeEcosystem locale={locale} products={products} />
      <CtaPanel
        title={locale === "tr" ? "Radar ailesini birlikte degerlendirelim." : "Review the Radar family together."}
        description={
          locale === "tr"
            ? "Canli urunler, beta surecler ve yaklasan lansmanlar icin hangi Radar kombinasyonunun kurumunuza uygun oldugunu birlikte netlestirelim."
            : "Clarify which Radar combination fits your institution across live products, beta programs, and upcoming launches."
        }
        primaryHref={getLocalizedPath(locale, "/demo")}
        primaryLabel={dictionary.nav.demo}
        secondaryHref={getLocalizedPath(locale, "/contact")}
        secondaryLabel={dictionary.nav.contact}
      />
    </>
  );
}
