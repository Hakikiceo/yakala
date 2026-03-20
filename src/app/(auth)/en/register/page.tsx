import type { Metadata } from "next";

import { CentralAuthForm } from "@/components/auth/central-auth-form";
import { parseAllowedReturnTo } from "@/lib/central-auth";
import { buildStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildStaticPageMetadata({
  locale: "en",
  path: "/register",
  title: "Central Register",
  description: "YAKALA central account registration page.",
});

export default async function EnglishRegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ app?: string; return_to?: string }>;
}) {
  const params = await searchParams;
  const apiBaseUrl = process.env.IHALERADAR_API_BASE_URL ?? "";
  const allowedReturnTo = parseAllowedReturnTo(process.env.CENTRAL_ALLOWED_RETURN_TO);

  return (
    <CentralAuthForm
      locale="en"
      mode="register"
      apiBaseUrl={apiBaseUrl}
      allowedReturnTo={allowedReturnTo}
      appParam={params.app}
      returnToParam={params.return_to}
    />
  );
}
