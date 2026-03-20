import { headers } from "next/headers";

export async function getRequestOrigin() {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host") ?? "www.yakala.io";
  const proto = headerStore.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}

export function buildIhaleReturnTo(origin: string, locale: "tr" | "en") {
  const path = locale === "en" ? "/en/ihale/app" : "/ihale/app";
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

function normalizeDashboardBaseUrl(rawValue: string) {
  const value = rawValue.trim();
  if (!value) {
    return null;
  }

  try {
    return new URL(value);
  } catch {
    return null;
  }
}

export function buildIhaleDashboardRedirectUrl(token: string) {
  const configuredUrl = process.env.IHALERADAR_DASHBOARD_URL ?? "";
  const fallbackLocal = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000/dashboard";
  const base = normalizeDashboardBaseUrl(configuredUrl || fallbackLocal);

  if (!base) {
    return null;
  }

  base.searchParams.set("token", token);
  return base.toString();
}
