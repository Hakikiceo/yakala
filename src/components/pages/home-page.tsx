import { HomeCinematicHero } from "@/components/home/home-cinematic-hero";
import { HomeEcosystem } from "@/components/home/home-ecosystem";
import { HomeInstitutionalCta } from "@/components/home/home-institutional-cta";
import { HomeManifesto } from "@/components/home/home-manifesto";
import { HomeSolutions } from "@/components/home/home-solutions";
import { getAllProducts } from "@/lib/products";
import type { Locale } from "@/types/i18n";

export function HomePage({ locale }: { locale: Locale }) {
  const products = getAllProducts();

  return (
    <>
      <HomeCinematicHero locale={locale} />
      <HomeManifesto locale={locale} />
      <HomeEcosystem locale={locale} products={products} />
      <HomeSolutions locale={locale} />
      <HomeInstitutionalCta locale={locale} />
    </>
  );
}
