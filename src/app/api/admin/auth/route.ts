import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  getAdminSessionCookieOptions,
  getAdminSessionCookieValue,
  hasAdminPanelKey,
  validateAdminPanelKey,
} from "@/lib/admin-panel";

type AuthPayload = {
  key?: unknown;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get(ADMIN_SESSION_COOKIE)?.value === getAdminSessionCookieValue();

  return NextResponse.json({
    configured: hasAdminPanelKey(),
    authenticated: isAuthenticated,
  });
}

export async function POST(request: Request) {
  if (!hasAdminPanelKey()) {
    return NextResponse.json(
      { message: "CENTRAL_ADMIN_PANEL_KEY ayarlanmamis." },
      { status: 500 },
    );
  }

  const payload = (await request.json().catch(() => null)) as AuthPayload | null;
  const key = asText(payload?.key);

  if (!validateAdminPanelKey(key)) {
    return NextResponse.json({ message: "Admin anahtari gecersiz." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    getAdminSessionCookieValue(),
    getAdminSessionCookieOptions(),
  );

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    ...getAdminSessionCookieOptions(),
    maxAge: 0,
  });

  return response;
}
