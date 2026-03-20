import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { resolveUserAccessByToken } from "@/lib/app-access";
import { IHALE_SESSION_COOKIE, IHALE_SESSION_MAX_AGE_SECONDS } from "@/lib/ihale-session";
const APP_KEY = "ihaleradar";

function asToken(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(IHALE_SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({
      hasSession: false,
      hasAccess: false,
    });
  }

  const access = await resolveUserAccessByToken(token, APP_KEY);

  if (!access.ok) {
    return NextResponse.json({
      hasSession: false,
      hasAccess: false,
      message: access.message,
    });
  }

  return NextResponse.json({
    hasSession: true,
    hasAccess: access.hasAccess,
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { token?: unknown } | null;
  const token = asToken(body?.token);

  if (!token) {
    return NextResponse.json({ message: "Token zorunludur." }, { status: 400 });
  }

  const access = await resolveUserAccessByToken(token, APP_KEY);

  if (!access.ok) {
    return NextResponse.json({ message: access.message }, { status: access.status });
  }

  if (!access.hasAccess) {
    return NextResponse.json(
      { message: "Ihale Radar erisim yetkiniz bulunmuyor." },
      { status: 403 },
    );
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
