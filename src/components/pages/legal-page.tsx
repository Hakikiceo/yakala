import { CtaPanel } from "@/components/marketing/cta-panel";
import { FeaturePanelGrid } from "@/components/marketing/feature-panel-grid";
import { PageHero } from "@/components/marketing/page-hero";
import { getMessages } from "@/data/messages";
import { getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

export function LegalPage({
  locale,
  variant,
}: {
  locale: Locale;
  variant: "privacy" | "terms";
}) {
  const dictionary = getMessages(locale);
  const title =
    variant === "privacy"
      ? dictionary.legalPage.privacyTitle
      : dictionary.legalPage.termsTitle;

  return (
    <>
      <PageHero title={title} description={dictionary.legalPage.description} />
      <FeaturePanelGrid
        columns={2}
        items={[
          {
            title,
            description: dictionary.legalPage.description,
          },
          {
            title:
              locale === "tr"
                ? "Yasal icerik durumu"
                : "Legal content status",
            description:
              locale === "tr"
                ? "Bu alan, nihai yasal metinler hazir oldugunda mevcut route ve tasarim sistemi korunarak guncellenecektir."
                : "This area will be updated with final legal copy later while preserving the current route structure and design system.",
          },
        ]}
      />
      <CtaPanel
        title={locale === "tr" ? "Yasal detaylar icin dogrudan iletisime gecebilirsiniz." : "Reach out directly for legal detail requests."}
        description={
          locale === "tr"
            ? "Gizlilik, kullanim kosullari veya kurumsal uyum basliklari icin ekip tarafindan paylasilacak nihai metinler bu alana yerlestirilecektir."
            : "Final texts for privacy, terms, and broader compliance topics can later be placed into this structure without route changes."
        }
        primaryHref={getLocalizedPath(locale, "/contact")}
        primaryLabel={dictionary.nav.contact}
      />
    </>
  );
}
