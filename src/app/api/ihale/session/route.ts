import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { IHALE_SESSION_COOKIE, IHALE_SESSION_MAX_AGE_SECONDS } from "@/lib/ihale-session";

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { url: url.replace(/\/$/, ""), anonKey };
}

function asToken(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function isValidSupabaseAccessToken({
  url,
  anonKey,
  token,
}: {
  url: string;
  anonKey: string;
  token: string;
}) {
  const response = await fetch(`${url}/auth/v1/user`, {
    method: "GET",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return response.ok;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(IHALE_SESSION_COOKIE)?.value;

  return NextResponse.json({
    hasSession: Boolean(token),
  });
}

export async function POST(request: Request) {
  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json(
      { message: "Auth servis degiskenleri eksik." },
      { status: 500 },
    );
  }

  const body = (await request.json().catch(() => null)) as { token?: unknown } | null;
  const token = asToken(body?.token);

  if (!token) {
    return NextResponse.json({ message: "Token zorunludur." }, { status: 400 });
  }

  const isValidToken = await isValidSupabaseAccessToken({
    url: config.url,
    anonKey: config.anonKey,
    token,
  });

  if (!isValidToken) {
    return NextResponse.json({ message: "Gecersiz token." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(IHALE_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: IHALE_SESSION_MAX_AGE_SECONDS,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(IHALE_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
