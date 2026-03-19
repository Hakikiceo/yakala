import type { Metadata } from "next";

import { ProductsPage } from "@/components/pages/products-page";
import { buildProductsMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildProductsMetadata("tr");

export default function TurkishProductsRoute() {
  return <ProductsPage locale="tr" />;
}
