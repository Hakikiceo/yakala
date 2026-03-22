import { NextResponse } from "next/server";

import { isAdminSessionActive } from "@/lib/admin-panel";
import { notifyAccessApproved } from "@/lib/access-approval-notifier";
import { listAdminUsers, updateUserAccessMetadata } from "@/lib/supabase-admin-users";

const DEFAULT_SUPPORTED_APPS = [
  "ihaleradar",
  "hiberadar",
  "rakipradar",
  "mapegradar",
  "muhaseberadar",
  "sahibindenradar",
  "ajansradar",
  "emlakradar",
] as const;

function parseSupportedApps(): string[] {
  const raw = (process.env.CENTRAL_SUPPORTED_APPS ?? "").trim();
  if (!raw) return [...DEFAULT_SUPPORTED_APPS];
  const parsed = raw
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
  return parsed.length > 0 ? Array.from(new Set(parsed)) : [...DEFAULT_SUPPORTED_APPS];
}

type UpdatePayload = {
  userId?: unknown;
  email?: unknown;
  action?: unknown;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

async function resolveUserId(input: { userId?: string; email?: string }) {
  if (input.userId) return { ok: true as const, userId: input.userId };
  if (!input.email) {
    return { ok: false as const, status: 400, message: "userId veya email zorunludur." };
  }

  const usersResult = await listAdminUsers();
  if (!usersResult.ok) {
    return { ok: false as const, status: usersResult.status, message: usersResult.message };
  }

  const matched = usersResult.users.find((u) => (u.email ?? "").toLowerCase() === input.email);
  if (!matched) {
    return { ok: false as const, status: 404, message: "Kullanici bulunamadi." };
  }

  return { ok: true as const, userId: matched.id };
}

async function applyAccessForApps(params: {
  userId: string;
  appKeys: string[];
  approved: boolean;
}) {
  for (const appKey of params.appKeys) {
    const result = await updateUserAccessMetadata({
      userId: params.userId,
      appKey,
      approved: params.approved,
    });

    if (!result.ok) {
      return result;
    }
  }

  return { ok: true as const };
}

export async function GET() {
  const authorized = await isAdminSessionActive();
  if (!authorized) {
    return NextResponse.json({ message: "Yetkisiz istek." }, { status: 401 });
  }

  const supportedApps = parseSupportedApps();
  const usersResult = await listAdminUsers();

  if (!usersResult.ok) {
    return NextResponse.json({ message: usersResult.message }, { status: usersResult.status });
  }

  const pending = usersResult.users
    .filter((user) => {
      if (!user.email) return false;
      if (user.appAccess.includes("ihaleradar")) return false;
      if (user.accessRequests.includes("ihaleradar")) return true;
      return true;
    })
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });

  const approved = usersResult.users
    .filter((user) => user.appAccess.includes("ihaleradar"))
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    })
    .map((user) => ({
      ...user,
      fullAccessEnabled: supportedApps.every((appKey) => user.appAccess.includes(appKey)),
    }));

  return NextResponse.json({
    supportedApps,
    pending,
    approved,
  });
}

export async function POST(request: Request) {
  const authorized = await isAdminSessionActive();
  if (!authorized) {
    return NextResponse.json({ message: "Yetkisiz istek." }, { status: 401 });
  }

  const supportedApps = parseSupportedApps();
  const payload = (await request.json().catch(() => null)) as UpdatePayload | null;
  const userId = asText(payload?.userId);
  const email = normalizeEmail(asText(payload?.email));
  const action = asText(payload?.action);

  if (!["approve", "revoke", "full_access_on", "full_access_off"].includes(action)) {
    return NextResponse.json({ message: "Gecersiz action." }, { status: 400 });
  }

  const resolved = await resolveUserId({ userId, email });
  if (!resolved.ok) {
    return NextResponse.json({ message: resolved.message }, { status: resolved.status });
  }

  if (action === "approve") {
    const result = await applyAccessForApps({
      userId: resolved.userId,
      appKeys: supportedApps,
      approved: true,
    });

    if (!result.ok) {
      return NextResponse.json({ message: result.message }, { status: result.status });
    }

    const usersResult = await listAdminUsers();
    if (usersResult.ok) {
      const user = usersResult.users.find((u) => u.id === resolved.userId);
      if (user) {
        await notifyAccessApproved({
          appKey: "ihaleradar",
          email: user.email,
          notifyChannel: user.notifyChannel,
          notifyTarget: user.notifyTarget,
        });
      }
    }

    return NextResponse.json({ ok: true });
  }

  if (action === "revoke") {
    const result = await applyAccessForApps({
      userId: resolved.userId,
      appKeys: supportedApps,
      approved: false,
    });

    if (!result.ok) {
      return NextResponse.json({ message: result.message }, { status: result.status });
    }

    return NextResponse.json({ ok: true });
  }

  if (action === "full_access_on") {
    const result = await applyAccessForApps({
      userId: resolved.userId,
      appKeys: supportedApps,
      approved: true,
    });

    if (!result.ok) {
      return NextResponse.json({ message: result.message }, { status: result.status });
    }

    return NextResponse.json({ ok: true });
  }

  const result = await applyAccessForApps({
    userId: resolved.userId,
    appKeys: supportedApps,
    approved: false,
  });

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
