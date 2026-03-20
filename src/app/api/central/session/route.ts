import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { resolveUserAccessProfileByToken } from "@/lib/app-access";
import {
  CENTRAL_SESSION_COOKIE,
  CENTRAL_SESSION_MAX_AGE_SECONDS,
} from "@/lib/central-session";

function asToken(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CENTRAL_SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({
      hasSession: false,
      appAccess: [],
      email: null,
    });
  }

  const profile = await resolveUserAccessProfileByToken(token);

  if (!profile.ok) {
    return NextResponse.json(
      {
        hasSession: false,
        appAccess: [],
        email: null,
        message: profile.message,
      },
      { status: profile.status },
    );
  }

  const hasApprovedAccess = profile.appAccess.length > 0;

  return NextResponse.json({
    hasSession: hasApprovedAccess,
    appAccess: profile.appAccess,
    email: profile.email,
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { token?: unknown } | null;
  const token = asToken(body?.token);

  if (!token) {
    return NextResponse.json({ message: "Token zorunludur." }, { status: 400 });
  }

  const profile = await resolveUserAccessProfileByToken(token);

  if (!profile.ok) {
    return NextResponse.json({ message: profile.message }, { status: profile.status });
  }

  if (profile.appAccess.length === 0) {
    return NextResponse.json(
      { message: "Erisim talebiniz henuz onaylanmadi." },
      { status: 403 },
    );
  }

  const response = NextResponse.json({
    ok: true,
    appAccess: profile.appAccess,
    email: profile.email,
  });

  response.cookies.set(CENTRAL_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: CENTRAL_SESSION_MAX_AGE_SECONDS,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(CENTRAL_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
