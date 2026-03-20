import { NextResponse } from "next/server";

function getBaseUrl(request: Request) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");

  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

export async function GET(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const requestUrl = new URL(request.url);
  const locale = requestUrl.searchParams.get("locale") === "en" ? "en" : "tr";
  const app = requestUrl.searchParams.get("app");
  const returnTo = requestUrl.searchParams.get("return_to");

  if (!supabaseUrl) {
    return NextResponse.redirect(new URL(locale === "en" ? "/en/login" : "/login", request.url));
  }

  const origin = getBaseUrl(request);
  const callbackPath = locale === "en" ? "/en/auth/callback" : "/auth/callback";
  const callbackUrl = new URL(`${origin}${callbackPath}`);
  if (app) {
    callbackUrl.searchParams.set("app", app);
  }
  if (returnTo) {
    callbackUrl.searchParams.set("return_to", returnTo);
  }
  const redirectTo = callbackUrl.toString();

  const authorizeUrl = new URL(`${supabaseUrl.replace(/\/$/, "")}/auth/v1/authorize`);
  authorizeUrl.searchParams.set("provider", "google");
  authorizeUrl.searchParams.set("redirect_to", redirectTo);

  return NextResponse.redirect(authorizeUrl.toString());
}
