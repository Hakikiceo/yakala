type SupabaseConfig = {
  url: string;
  serviceRoleKey: string;
};

export type AdminUserAccessRecord = {
  id: string;
  email: string | null;
  createdAt: string | null;
  appAccess: string[];
  accessRequests: string[];
  notifyChannel: string | null;
  notifyTarget: string | null;
  rawMetadata: Record<string, unknown>;
};

function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return { url: url.replace(/\/$/, ""), serviceRoleKey };
}

function asStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    return entries
      .filter(([, enabled]) => enabled === true)
      .map(([appKey]) => appKey);
  }

  return [];
}

function unique(values: string[]) {
  return Array.from(new Set(values));
}

function normalizeUser(user: Record<string, unknown>): AdminUserAccessRecord {
  const metadata =
    user.user_metadata && typeof user.user_metadata === "object"
      ? (user.user_metadata as Record<string, unknown>)
      : {};

  return {
    id: typeof user.id === "string" ? user.id : "",
    email: typeof user.email === "string" ? user.email : null,
    createdAt: typeof user.created_at === "string" ? user.created_at : null,
    appAccess: unique(asStringList(metadata.app_access)),
    accessRequests: unique(asStringList(metadata.access_requests)),
    notifyChannel: typeof metadata.notify_channel === "string" ? metadata.notify_channel : null,
    notifyTarget: typeof metadata.notify_target === "string" ? metadata.notify_target : null,
    rawMetadata: metadata,
  };
}

async function fetchSupabaseAdmin(path: string, init: RequestInit = {}) {
  const config = getSupabaseConfig();
  if (!config) {
    return {
      ok: false as const,
      status: 500,
      message: "Supabase admin ayarlari eksik.",
      payload: null as unknown,
    };
  }

  const response = await fetch(`${config.url}${path}`, {
    ...init,
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    return {
      ok: false as const,
      status: response.status,
      message: "Supabase admin istegi basarisiz.",
      payload,
    };
  }

  return {
    ok: true as const,
    status: 200,
    message: "",
    payload,
  };
}

export async function listAdminUsers() {
  const result = await fetchSupabaseAdmin("/auth/v1/admin/users?page=1&per_page=200");

  if (!result.ok) {
    return result;
  }

  const root = result.payload as { users?: unknown } | null;
  const usersRaw = Array.isArray(root?.users) ? root?.users : [];
  const users = usersRaw
    .filter((user): user is Record<string, unknown> => Boolean(user && typeof user === "object"))
    .map((user) => normalizeUser(user))
    .filter((user) => user.id.length > 0);

  return {
    ok: true as const,
    status: 200,
    message: "",
    users,
  };
}

export async function updateUserAccessMetadata({
  userId,
  appKey,
  approved,
}: {
  userId: string;
  appKey: string;
  approved: boolean;
}) {
  const usersResult = await listAdminUsers();

  if (!usersResult.ok) {
    return usersResult;
  }

  const user = usersResult.users.find((candidate) => candidate.id === userId);

  if (!user) {
    return {
      ok: false as const,
      status: 404,
      message: "Kullanici bulunamadi.",
    };
  }

  const nextAppAccess = approved
    ? unique([...user.appAccess, appKey])
    : user.appAccess.filter((item) => item !== appKey);
  const nextAccessRequests = user.accessRequests.filter((item) => item !== appKey);

  const updateResult = await fetchSupabaseAdmin(`/auth/v1/admin/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify({
      user_metadata: {
        ...user.rawMetadata,
        app_access: nextAppAccess,
        access_requests: nextAccessRequests,
      },
    }),
  });

  if (!updateResult.ok) {
    return updateResult;
  }

  return {
    ok: true as const,
    status: 200,
    message: "",
    user,
  };
}
