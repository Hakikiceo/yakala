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
  appKey?: unknown;
  action?: unknown;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export async function GET(request: Request) {
  const authorized = await isAdminSessionActive();

  if (!authorized) {
    return NextResponse.json({ message: "Yetkisiz istek." }, { status: 401 });
  }

  const supportedApps = parseSupportedApps();
  const requestUrl = new URL(request.url);
  const requestedAppKey = asText(requestUrl.searchParams.get("appKey"));
  const appKey = requestedAppKey || supportedApps[0] || "ihaleradar";

  if (!supportedApps.includes(appKey)) {
    return NextResponse.json({ message: "Gecersiz appKey." }, { status: 400 });
  }

  const usersResult = await listAdminUsers();

  if (!usersResult.ok) {
    return NextResponse.json({ message: usersResult.message }, { status: usersResult.status });
  }

  const approved = usersResult.users
    .filter((user) => user.appAccess.includes(appKey))
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });

  const pending = usersResult.users
    .filter((user) => {
      if (!user.email) return false;
      if (user.appAccess.includes(appKey)) return false;
      if (user.accessRequests.includes(appKey)) return true;
      return true;
    })
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });

  const recent = usersResult.users
    .filter((user) => Boolean(user.email))
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 10)
    .map((user) => ({
      ...user,
      state: user.appAccess.includes(appKey)
        ? "approved"
        : user.accessRequests.includes(appKey)
          ? "pending"
          : "new",
    }));

  return NextResponse.json({
    appKey,
    supportedApps,
    pending,
    approved,
    recent,
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
  const requestedAppKey = asText(payload?.appKey);
  const appKey = requestedAppKey || supportedApps[0] || "ihaleradar";
  const action = asText(payload?.action);

  if (!supportedApps.includes(appKey)) {
    return NextResponse.json({ message: "Gecersiz appKey." }, { status: 400 });
  }

  if (action !== "approve" && action !== "revoke") {
    return NextResponse.json({ message: "Gecersiz action." }, { status: 400 });
  }

  let resolvedUserId = userId;

  if (!resolvedUserId) {
    if (!email) {
      return NextResponse.json({ message: "userId veya email zorunludur." }, { status: 400 });
    }

    const usersResult = await listAdminUsers();
    if (!usersResult.ok) {
      return NextResponse.json({ message: usersResult.message }, { status: usersResult.status });
    }

    const matched = usersResult.users.find((user) => (user.email ?? "").toLowerCase() === email);
    if (!matched) {
      return NextResponse.json({ message: "Kullanici bulunamadi." }, { status: 404 });
    }

    resolvedUserId = matched.id;
  }

  const result = await updateUserAccessMetadata({
    userId: resolvedUserId,
    appKey,
    approved: action === "approve",
  });

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  if (action === "approve" && "user" in result && result.user) {
    const notificationResult = await notifyAccessApproved({
      appKey,
      email: result.user.email,
      notifyChannel: result.user.notifyChannel,
      notifyTarget: result.user.notifyTarget,
    });

    if (!notificationResult.ok) {
      return NextResponse.json({
        ok: true,
        notification: {
          ok: false,
          reason: notificationResult.reason,
        },
      });
    }
  }

  return NextResponse.json({
    ok: true,
    notification: {
      ok: true,
    },
  });
}
