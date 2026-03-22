import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { resolveUserAccessProfileByToken } from "@/lib/app-access";
import { CENTRAL_SESSION_COOKIE } from "@/lib/central-session";

function normalizeBaseUrl(value: string | undefined, fallback: string) {
  const raw = (value ?? "").trim() || fallback;
  try {
    return new URL(raw);
  } catch {
    return new URL(fallback);
  }
}

function toLoginUrl(requestUrl: string) {
  const base = new URL(requestUrl);
  return new URL("/login?app=ihaleradar", `${base.protocol}//${base.host}`);
}

function toNoAccessUrl(requestUrl: string, reason: string) {
  const url = new URL("/ihale/no-access", requestUrl);
  url.searchParams.set("reason", reason);
  return url;
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const centralToken = cookieStore.get(CENTRAL_SESSION_COOKIE)?.value;

  if (!centralToken) {
    return NextResponse.redirect(toLoginUrl(request.url));
  }

  const profile = await resolveUserAccessProfileByToken(centralToken);
  if (!profile.ok) {
    return NextResponse.redirect(toLoginUrl(request.url));
  }

  const hasIhaleAccess =
    profile.appAccess.includes("ihaleradar");

  if (!hasIhaleAccess) {
    return NextResponse.redirect(toNoAccessUrl(request.url, "NO_APP_ACCESS"));
  }

  if (!profile.email) {
    return NextResponse.redirect(toNoAccessUrl(request.url, "MISSING_EMAIL"));
  }

  const ihaleApiUrl = normalizeBaseUrl(process.env.IHALERADAR_API_URL, "http://localhost:3001");
  const ihaleWebUrl = normalizeBaseUrl(process.env.IHALERADAR_WEB_URL, "http://localhost:3000");
  const handoffSecret = (process.env.CENTRAL_TO_IHALE_HANDOFF_SECRET ?? "").trim();

  if (!handoffSecret) {
    return NextResponse.redirect(toNoAccessUrl(request.url, "MISSING_HANDOFF_SECRET"));
  }

  let handoffResponse: Response;
  try {
    handoffResponse = await fetch(new URL("/auth/central-handoff", ihaleApiUrl), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-central-handoff-secret": handoffSecret,
      },
      body: JSON.stringify({
        email: profile.email,
      }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.redirect(toNoAccessUrl(request.url, "HANDOFF_FETCH_FAILED"));
  }

  const payload = (await handoffResponse.json().catch(() => null)) as { token?: unknown } | null;
  const token = typeof payload?.token === "string" ? payload.token : "";

  if (!handoffResponse.ok || !token) {
    const status = String(handoffResponse.status || "");
    const reason = token ? `HANDOFF_${status || "FAILED"}` : `HANDOFF_TOKEN_${status || "FAILED"}`;
    return NextResponse.redirect(toNoAccessUrl(request.url, reason));
  }

  const target = new URL("/dashboard", ihaleWebUrl);
  target.searchParams.set("token", token);
  return NextResponse.redirect(target);
}
