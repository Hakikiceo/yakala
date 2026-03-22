type SupabaseConfig = {
  url: string;
  anonKey: string;
};

type SupabaseAdminConfig = {
  url: string;
  serviceRoleKey: string;
};

export type AppAccessResult =
  | { ok: true; userId: string; email: string | null; hasAccess: boolean }
  | { ok: false; status: number; message: string };

export type UserAccessProfileResult =
  | { ok: true; userId: string; email: string | null; appAccess: string[] }
  | { ok: false; status: number; message: string };

function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    anonKey,
  };
}

function getSupabaseAdminConfig(): SupabaseAdminConfig | null {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    serviceRoleKey,
  };
}

function readErrorMessage(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const root = payload as Record<string, unknown>;
  const candidate = root.message ?? root.msg ?? root.error_description ?? root.error;
  return typeof candidate === "string" ? candidate : null;
}

type SupabaseUserPayload = {
  id?: unknown;
  email?: unknown;
  user_metadata?: unknown;
};

type SupabaseUserMetadata = {
  app_access?: unknown;
};

async function getSupabaseUserByToken(config: SupabaseConfig, token: string) {
  let response: Response;

  try {
    response = await fetch(`${config.url}/auth/v1/user`, {
      method: "GET",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
  } catch {
    return {
      ok: false as const,
      status: 502,
      message: "Kimlik servisine baglanilamadi.",
    };
  }

  const payload = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    return {
      ok: false as const,
      status: response.status,
      message: readErrorMessage(payload) ?? "Token gecersiz.",
    };
  }

  const user = payload as SupabaseUserPayload;
  const userId = typeof user.id === "string" ? user.id : "";
  const email = typeof user.email === "string" ? user.email : null;
  const metadata =
    user.user_metadata && typeof user.user_metadata === "object"
      ? (user.user_metadata as SupabaseUserMetadata)
      : {};

  if (!userId) {
    return {
      ok: false as const,
      status: 401,
      message: "Kullanici dogrulanamadi.",
    };
  }

  return {
    ok: true as const,
    userId,
    email,
    metadata,
  };
}

async function getAdminUserMetadata(userId: string): Promise<SupabaseUserMetadata | null> {
  const adminConfig = getSupabaseAdminConfig();
  if (!adminConfig) return null;

  try {
    const response = await fetch(`${adminConfig.url}/auth/v1/admin/users/${userId}`, {
      method: "GET",
      headers: {
        apikey: adminConfig.serviceRoleKey,
        Authorization: `Bearer ${adminConfig.serviceRoleKey}`,
      },
      cache: "no-store",
    });

    const payload = (await response.json().catch(() => null)) as unknown;
    if (!response.ok || !payload || typeof payload !== "object") {
      return null;
    }

    const root = payload as Record<string, unknown>;
    const user =
      root.user && typeof root.user === "object"
        ? (root.user as Record<string, unknown>)
        : (payload as Record<string, unknown>);

    const metadata =
      user.user_metadata && typeof user.user_metadata === "object"
        ? (user.user_metadata as SupabaseUserMetadata)
        : null;

    return metadata;
  } catch {
    return null;
  }
}

function hasAppAccessFromMetadata(metadata: SupabaseUserMetadata, appKey: string) {
  const raw = metadata.app_access;

  if (Array.isArray(raw)) {
    return raw.some((value) => typeof value === "string" && value === appKey);
  }

  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .includes(appKey);
  }

  if (raw && typeof raw === "object") {
    const map = raw as Record<string, unknown>;
    return map[appKey] === true;
  }

  return false;
}

function getAppAccessListFromMetadata(metadata: SupabaseUserMetadata) {
  const raw = metadata.app_access;

  if (Array.isArray(raw)) {
    return raw.filter((value): value is string => typeof value === "string");
  }

  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (raw && typeof raw === "object") {
    return Object.entries(raw as Record<string, unknown>)
      .filter(([, enabled]) => enabled === true)
      .map(([appKey]) => appKey);
  }

  return [];
}

export async function resolveUserAccessByToken(token: string, appKey: string): Promise<AppAccessResult> {
  const config = getSupabaseConfig();

  if (!config) {
    return {
      ok: false,
      status: 500,
      message: "Auth servis degiskenleri eksik.",
    };
  }

  const userResult = await getSupabaseUserByToken(config, token);

  if (!userResult.ok) {
    return userResult;
  }

  const adminMetadata = await getAdminUserMetadata(userResult.userId);
  const effectiveMetadata = adminMetadata ?? userResult.metadata;

  return {
    ok: true,
    userId: userResult.userId,
    email: userResult.email,
    hasAccess: hasAppAccessFromMetadata(effectiveMetadata, appKey),
  };
}

export async function resolveUserAccessProfileByToken(
  token: string,
): Promise<UserAccessProfileResult> {
  const config = getSupabaseConfig();

  if (!config) {
    return {
      ok: false,
      status: 500,
      message: "Auth servis degiskenleri eksik.",
    };
  }

  const userResult = await getSupabaseUserByToken(config, token);

  if (!userResult.ok) {
    return userResult;
  }

  const adminMetadata = await getAdminUserMetadata(userResult.userId);
  const effectiveMetadata = adminMetadata ?? userResult.metadata;

  return {
    ok: true,
    userId: userResult.userId,
    email: userResult.email,
    appAccess: getAppAccessListFromMetadata(effectiveMetadata),
  };
}
