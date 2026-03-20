type RegisterBody = {
  name?: unknown;
  fullName?: unknown;
  email?: unknown;
  password?: unknown;
  notifyChannel?: unknown;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return { url: url.replace(/\/$/, ""), serviceRoleKey };
}

function readSupabaseError(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const root = payload as Record<string, unknown>;
  const candidate = root.msg ?? root.error_description ?? root.message ?? root.error;
  return typeof candidate === "string" ? candidate : null;
}

function normalizeNotifyChannel(value: unknown) {
  if (value === "whatsapp" || value === "telegram" || value === "email") {
    return value;
  }

  return "email" as const;
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
  const notifyChannel = normalizeNotifyChannel(body.notifyChannel);

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
      email_confirm: false,
      user_metadata: {
        name: fullName,
        fullName,
        app_access: [],
        access_requests: ["ihaleradar"],
        notify_channel: notifyChannel,
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

  return Response.json({
    ok: true,
    message:
      "Kaydiniz alindi. E-posta dogrulamasini tamamladiktan sonra erisim talebiniz admin onayina alinacaktir.",
  });
}
