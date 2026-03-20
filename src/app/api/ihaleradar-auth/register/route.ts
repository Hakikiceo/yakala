type RegisterBody = {
  name?: unknown;
  fullName?: unknown;
  email?: unknown;
  password?: unknown;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anonKey || !serviceRoleKey) {
    return null;
  }

  return { url: url.replace(/\/$/, ""), anonKey, serviceRoleKey };
}

function readSupabaseError(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const root = payload as Record<string, unknown>;
  const candidate = root.msg ?? root.error_description ?? root.message ?? root.error;
  return typeof candidate === "string" ? candidate : null;
}

async function fetchPasswordToken(url: string, anonKey: string, email: string, password: string) {
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
    body: JSON.stringify({ email, password }),
  });

  const payload = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    return {
      ok: false as const,
      message: readSupabaseError(payload) ?? "Token olusturma hatasi.",
      status: response.status,
    };
  }

  const token =
    payload && typeof payload === "object" && typeof (payload as Record<string, unknown>).access_token === "string"
      ? ((payload as Record<string, unknown>).access_token as string)
      : null;

  if (!token) {
    return {
      ok: false as const,
      message: "Token olusturulamadi.",
      status: 502,
    };
  }

  return {
    ok: true as const,
    token,
  };
}

export async function POST(request: Request) {
  const config = getSupabaseConfig();

  if (!config) {
    return Response.json(
      { message: "Auth servisi konfiguruasyonunda eksik degisken var." },
      { status: 500 },
    );
  }

  let body: RegisterBody;

  try {
    body = (await request.json()) as RegisterBody;
  } catch {
    return Response.json({ message: "Gecersiz istek govdesi." }, { status: 400 });
  }

  const email = asText(body.email).toLowerCase();
  const password = asText(body.password);
  const fullName = asText(body.fullName || body.name);

  if (!email || !password || !fullName) {
    return Response.json({ message: "Ad soyad, e-posta ve sifre zorunludur." }, { status: 400 });
  }

  const signupResponse = await fetch(`${config.url}/auth/v1/admin/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
    },
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name: fullName,
        fullName,
        app_access: [],
        access_requests: ["ihaleradar"],
      },
    }),
  });

  const signupPayload = (await signupResponse.json().catch(() => null)) as unknown;

  if (!signupResponse.ok) {
    return Response.json(
      { message: readSupabaseError(signupPayload) ?? "Kayit islemi basarisiz." },
      { status: signupResponse.status },
    );
  }

  const tokenResult = await fetchPasswordToken(config.url, config.anonKey, email, password);

  if (!tokenResult.ok) {
    return Response.json({ message: tokenResult.message }, { status: tokenResult.status });
  }

  return Response.json({ token: tokenResult.token });
}
