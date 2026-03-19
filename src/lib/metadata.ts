import type { Metadata } from "next";

import { getMessages } from "@/data/messages";
import { siteConfig } from "@/data/site";
import { getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";
import type { Product } from "@/types/product";

export const siteMetadataBase = new URL("https://yakala.io");

export function buildPageMetadata({
  locale,
  title,
  description,
  path,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonicalPath = getLocalizedPath(locale, path);
  const languages = {
    tr: getLocalizedPath("tr", path),
    en: getLocalizedPath("en", path),
  };

  return {
    metadataBase: siteMetadataBase,
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages,
    },
    openGraph: {
      title,
      description,
      siteName: siteConfig.name,
      locale,
    },
  };
}

export function buildHomeMetadata(locale: Locale): Metadata {
  const dictionary = getMessages(locale);

  return buildPageMetadata({
    locale,
    path: "/",
    title: `${siteConfig.name} | ${dictionary.brand.tagline}`,
    description: dictionary.brand.description,
  });
}

export function buildProductsMetadata(locale: Locale): Metadata {
  const dictionary = getMessages(locale);

  return buildPageMetadata({
    locale,
    path: "/products",
    title: `${dictionary.productsPage.title} | ${siteConfig.name}`,
    description: dictionary.productsPage.description,
  });
}

export function buildProductMetadata(locale: Locale, product: Product): Metadata {
  return buildPageMetadata({
    locale,
    path: `/products/${product.slug}`,
    title: `${product.name[locale]} | ${siteConfig.name}`,
    description: product.shortDescription[locale],
  });
}

export function buildStaticPageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}) {
  return buildPageMetadata({
    locale,
    path,
    title: `${title} | ${siteConfig.name}`,
    description,
  });
}
