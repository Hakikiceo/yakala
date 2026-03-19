import { products } from "@/data/products";
import type { Locale } from "@/types/i18n";

export function getAllProducts() {
  return [...products].sort((left, right) => left.sortOrder - right.sortOrder);
}

export function getFeaturedProducts() {
  return getAllProducts().filter((product) => product.featured);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug: string) {
  return getAllProducts().filter((product) => product.slug !== slug).slice(0, 3);
}

export function getLocalizedProductName(slug: string, locale: Locale) {
  return getProductBySlug(slug)?.name[locale];
}
