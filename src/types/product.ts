import type { Locale } from "@/types/i18n";

export type ProductStatus = "live" | "beta" | "comingSoon";
export type ConversionIntent =
  | "demo"
  | "beta_interest"
  | "early_access"
  | "general_contact";

export type LocalizedString = Record<Locale, string>;

export type LocalizedStringArray = Record<Locale, string[]>;

export type Product = {
  slug: string;
  status: ProductStatus;
  featured: boolean;
  sortOrder: number;
  category: LocalizedString;
  name: LocalizedString;
  shortDescription: LocalizedString;
  longDescription: LocalizedString;
  ctaLabel: LocalizedString;
  featureBullets: LocalizedStringArray;
  targetAudience: LocalizedStringArray;
};
