type LoginBody = {
  email?: unknown;
  password?: unknown;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { url: url.replace(/\/$/, ""), anonKey };
}

function readSupabaseError(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const root = payload as Record<string, unknown>;
  const candidate = root.msg ?? root.error_description ?? root.message ?? root.error;
  return typeof candidate === "string" ? candidate : null;
}

export async function POST(request: Request) {
  const config = getSupabaseConfig();

  if (!config) {
    return Response.json(
      { message: "Auth servisi konfiguruasyonunda eksik degisken var." },
      { status: 500 },
    );
  }

  let body: LoginBody;

  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return Response.json({ message: "Gecersiz istek govdesi." }, { status: 400 });
  }

  const email = asText(body.email).toLowerCase();
  const password = asText(body.password);

  if (!email || !password) {
    return Response.json({ message: "E-posta ve sifre zorunludur." }, { status: 400 });
  }

  const response = await fetch(`${config.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
    },
    body: JSON.stringify({ email, password }),
  });

  const payload = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    return Response.json(
      { message: readSupabaseError(payload) ?? "Giris islemi basarisiz." },
      { status: response.status },
    );
  }

  const token =
    payload && typeof payload === "object" && typeof (payload as Record<string, unknown>).access_token === "string"
      ? ((payload as Record<string, unknown>).access_token as string)
      : null;

  if (!token) {
    return Response.json({ message: "Token olusturulamadi." }, { status: 502 });
  }

  return Response.json({ token });
}
