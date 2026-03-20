import { isAllowedReturnTo, parseAllowedReturnTo, resolveAuthApp } from "@/lib/central-auth";
import { GoogleCallbackClient } from "@/components/auth/google-callback-client";

export default async function GoogleCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ app?: string; return_to?: string }>;
}) {
  const params = await searchParams;
  const appParam = resolveAuthApp(params.app) === "ihaleradar" ? "ihaleradar" : undefined;
  const allowedReturnTo = parseAllowedReturnTo(process.env.CENTRAL_ALLOWED_RETURN_TO);
  const returnToParam =
    params.return_to && isAllowedReturnTo(params.return_to, allowedReturnTo)
      ? params.return_to
      : undefined;

  return <GoogleCallbackClient locale="tr" appParam={appParam} returnToParam={returnToParam} />;
}
