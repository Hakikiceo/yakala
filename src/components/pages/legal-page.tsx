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
  const isPrivacy = variant === "privacy";
  const title = isPrivacy ? dictionary.legalPage.privacyTitle : dictionary.legalPage.termsTitle;
  const lastUpdated = locale === "tr" ? "20 Mart 2026" : "March 20, 2026";

  const privacyItems =
    locale === "tr"
      ? [
          {
            title: "Toplanan veriler",
            description:
              "Kayit ve giris sureclerinde ad soyad, e-posta ve tercih edilen bildirim kanali gibi hesap yonetimi icin gerekli veriler islenir. Teknik guvenlik loglari ve temel kullanim kayitlari servis kararliligi amaciyla tutulabilir.",
          },
          {
            title: "Isleme amaci",
            description:
              "Veriler; kimlik dogrulama, erisim yetkilendirme, urun deneyimi iyilestirme, destek sureci ve guvenlik operasyonlari amaclariyla kullanilir. Veriler bu kapsamin disinda amaca aykiri sekilde islenmez.",
          },
          {
            title: "Paylasim ve saklama",
            description:
              "YAKALA, verileri yalnizca hizmet sunumu icin zorunlu teknik altyapi saglayicilariyla paylasir. Veriler, yasal yukumluluklar ve operasyonel gereklilikler dogrultusunda makul surelerle saklanir.",
          },
          {
            title: "Kullanici haklari",
            description:
              "Kullanicilar veri erisim, duzeltme, silme ve itiraz haklari kapsaminda talepte bulunabilir. Talepler iletisim kanallari uzerinden alinip makul surede sonuclandirilir.",
          },
        ]
      : [
          {
            title: "Data collected",
            description:
              "During registration and sign-in, YAKALA processes account data such as full name, email, and selected notification channel. Basic technical and security logs may also be retained for service reliability.",
          },
          {
            title: "Purpose of processing",
            description:
              "Data is processed for identity verification, access authorization, product operations, support, and security monitoring. Data is not processed beyond these purposes.",
          },
          {
            title: "Sharing and retention",
            description:
              "Data is shared only with essential infrastructure providers required to deliver the service. Retention periods are limited to legal obligations and operational necessity.",
          },
          {
            title: "User rights",
            description:
              "Users may submit requests for access, correction, deletion, and objection. Requests are handled through official contact channels within a reasonable timeframe.",
          },
        ];

  const termsItems =
    locale === "tr"
      ? [
          {
            title: "Hizmet kapsami",
            description:
              "YAKALA, kurumsal kullanim odakli dijital izleme urunleri sunar. Hizmet kapsaminda yer alan ozellikler urun bazinda degisebilir ve surec icinde guncellenebilir.",
          },
          {
            title: "Hesap sorumlulugu",
            description:
              "Kullanicilar hesap bilgilerinin dogrulugundan ve erisim bilgilerinin guvenliginden sorumludur. Yetkisiz erisim suphelerinde kullanicinin derhal bilgilendirme yapmasi beklenir.",
          },
          {
            title: "Kabul edilebilir kullanim",
            description:
              "Platform; hukuka aykiri faaliyetler, izinsiz veri cekimi, servis butunlugunu bozacak otomasyonlar veya ucuncu taraf haklarini ihlal edecek sekilde kullanilamaz.",
          },
          {
            title: "Degisiklik ve guncellemeler",
            description:
              "YAKALA, hizmet kosullarini ve urun icerigini operasyonel ihtiyaclara gore guncelleyebilir. Onemli degisikliklerde kullanicilar uygun kanallarla bilgilendirilir.",
          },
        ]
      : [
          {
            title: "Service scope",
            description:
              "YAKALA provides business-focused digital monitoring products. Available capabilities may vary by product and can evolve over time.",
          },
          {
            title: "Account responsibility",
            description:
              "Users are responsible for accurate account information and secure credential handling. Suspected unauthorized access must be reported without delay.",
          },
          {
            title: "Acceptable use",
            description:
              "The platform may not be used for unlawful activity, unauthorized extraction, abusive automation, or any behavior that violates third-party rights or service integrity.",
          },
          {
            title: "Changes and updates",
            description:
              "YAKALA may update terms and product behavior based on operational requirements. Material updates are communicated through appropriate channels.",
          },
        ];

  const items = isPrivacy ? privacyItems : termsItems;

  return (
    <>
      <PageHero
        title={title}
        description={`${dictionary.legalPage.description} ${locale === "tr" ? "Son guncelleme" : "Last updated"}: ${lastUpdated}.`}
      />
      <FeaturePanelGrid
        columns={2}
        items={items}
      />
      <CtaPanel
        title={
          locale === "tr"
            ? "Yasal talepleriniz icin dogrudan iletisime gecebilirsiniz."
            : "Contact the team for legal requests."
        }
        description={
          locale === "tr"
            ? "Veri talepleri, uyum sorulari ve sozlesmesel surecler icin kurumsal ekibimizle iletisim kurabilirsiniz."
            : "For data requests, compliance questions, and contractual processes, contact our corporate team."
        }
        primaryHref={getLocalizedPath(locale, "/contact")}
        primaryLabel={dictionary.nav.contact}
      />
    </>
  );
}
