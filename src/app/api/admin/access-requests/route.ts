import { NextResponse } from "next/server";

import { isAdminSessionActive } from "@/lib/admin-panel";
import { notifyAccessApproved } from "@/lib/access-approval-notifier";
import { listAdminUsers, updateUserAccessMetadata } from "@/lib/supabase-admin-users";

const IHALE_APP_KEY = "ihaleradar";

type UpdatePayload = {
  userId?: unknown;
  appKey?: unknown;
  action?: unknown;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isAllowedAppKey(value: string) {
  return value === IHALE_APP_KEY;
}

export async function GET() {
  const authorized = await isAdminSessionActive();

  if (!authorized) {
    return NextResponse.json({ message: "Yetkisiz istek." }, { status: 401 });
  }

  const usersResult = await listAdminUsers();

  if (!usersResult.ok) {
    return NextResponse.json({ message: usersResult.message }, { status: usersResult.status });
  }

  const pending = usersResult.users.filter((user) => user.accessRequests.includes(IHALE_APP_KEY));
  const approved = usersResult.users.filter((user) => user.appAccess.includes(IHALE_APP_KEY));

  return NextResponse.json({
    pending,
    approved,
  });
}

export async function POST(request: Request) {
  const authorized = await isAdminSessionActive();

  if (!authorized) {
    return NextResponse.json({ message: "Yetkisiz istek." }, { status: 401 });
  }

  const payload = (await request.json().catch(() => null)) as UpdatePayload | null;
  const userId = asText(payload?.userId);
  const appKey = asText(payload?.appKey || IHALE_APP_KEY);
  const action = asText(payload?.action);

  if (!userId) {
    return NextResponse.json({ message: "userId zorunludur." }, { status: 400 });
  }

  if (!isAllowedAppKey(appKey)) {
    return NextResponse.json({ message: "Gecersiz appKey." }, { status: 400 });
  }

  if (action !== "approve" && action !== "revoke") {
    return NextResponse.json({ message: "Gecersiz action." }, { status: 400 });
  }

  const result = await updateUserAccessMetadata({
    userId,
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
