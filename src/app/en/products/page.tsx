import type { Metadata } from "next";

import { ProductsPage } from "@/components/pages/products-page";
import { buildProductsMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildProductsMetadata("en");

export default function EnglishProductsRoute() {
  return <ProductsPage locale="en" />;
}
