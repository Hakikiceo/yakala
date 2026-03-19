import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import type { Locale } from "@/types/i18n";

export const runtime = "nodejs";

const signupsDir = path.join(process.cwd(), "storage");
const signupsFile = path.join(signupsDir, "coming-soon-signups.ndjson");

type SignupPayload = {
  email?: unknown;
  locale?: unknown;
};

function isValidLocale(value: unknown): value is Locale {
  return value === "tr" || value === "en";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: SignupPayload;

  try {
    payload = (await request.json()) as SignupPayload;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const locale = isValidLocale(payload.locale) ? payload.locale : "tr";

  if (!isValidEmail(email)) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  const record = {
    email,
    locale,
    source: "coming-soon",
    createdAt: new Date().toISOString(),
  };

  await mkdir(signupsDir, { recursive: true });
  await appendFile(signupsFile, `${JSON.stringify(record)}\n`, "utf8");

  return Response.json({ ok: true });
}
