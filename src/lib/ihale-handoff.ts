import { headers } from "next/headers";

export async function getRequestOrigin() {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host") ?? "www.yakala.io";
  const proto = headerStore.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}

export function buildIhaleReturnTo(origin: string, locale: "tr" | "en") {
  const path = locale === "en" ? "/en/ihale/dashboard" : "/ihale/dashboard";
  return `${origin}${path}`;
}

export function buildCentralAuthHref({
  locale,
  mode,
  returnTo,
}: {
  locale: "tr" | "en";
  mode: "login" | "register";
  returnTo: string;
}) {
  const prefix = locale === "en" ? "/en" : "";
  const authPath = mode === "login" ? "/login" : "/register";
  const params = new URLSearchParams({
    app: "ihaleradar",
    return_to: returnTo,
  });

  return `${prefix}${authPath}?${params.toString()}`;
}
