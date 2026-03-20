import { timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "yakala_admin_session";
const ADMIN_COOKIE_VALUE = "authorized";

function toBuffer(value: string) {
  return Buffer.from(value, "utf8");
}

function safeEqualText(a: string, b: string) {
  const aBuffer = toBuffer(a);
  const bBuffer = toBuffer(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

export function hasAdminPanelKey() {
  return Boolean(process.env.CENTRAL_ADMIN_PANEL_KEY);
}

export function validateAdminPanelKey(candidate: string) {
  const key = process.env.CENTRAL_ADMIN_PANEL_KEY;
  if (!key || !candidate) {
    return false;
  }

  return safeEqualText(candidate, key);
}

export async function isAdminSessionActive() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_COOKIE_VALUE;
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 8,
  };
}

export function getAdminSessionCookieValue() {
  return ADMIN_COOKIE_VALUE;
}
