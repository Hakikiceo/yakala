import { incrementEarlyAccessCount } from "@/lib/early-access-counter";

type RegisterBody = {
  name?: unknown;
  fullName?: unknown;
  email?: unknown;
  password?: unknown;
  notifyChannel?: unknown;
  notifyTarget?: unknown;
};

const registerAttemptWindowMs = 60_000;
const registerAttemptByEmail = new Map<string, number>();

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anonKey) {
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

function mapRegisterErrorMessage(rawMessage: string | null, status: number) {
  const normalized = (rawMessage ?? "").toLowerCase();

  if (status === 429 || normalized.includes("rate limit")) {
    return "E-posta gonderim limiti gecici olarak doldu. Lutfen kisa bir sure sonra tekrar deneyin veya Google ile devam edin.";
  }

  if (normalized.includes("already registered")) {
    return "Bu e-posta ile zaten kayit var. Lutfen giris yapin.";
  }

  if (normalized.includes("invalid email")) {
    return "E-posta formati gecersiz.";
  }

  if (normalized.includes("password")) {
    return "Sifre kurali saglanmiyor. Daha guclu bir sifre deneyin.";
  }

  return rawMessage ?? "Kayit islemi basarisiz.";
}

function canAttemptRegister(email: string) {
  const now = Date.now();
  const lastAttempt = registerAttemptByEmail.get(email) ?? 0;

  if (now - lastAttempt < registerAttemptWindowMs) {
    return false;
  }

  registerAttemptByEmail.set(email, now);

  if (registerAttemptByEmail.size > 1000) {
    // Basit hafiza korumasi
    const oldestEntries = Array.from(registerAttemptByEmail.entries())
      .sort((a, b) => a[1] - b[1])
      .slice(0, 200);

    for (const [key] of oldestEntries) {
      registerAttemptByEmail.delete(key);
    }
  }

  return true;
}

async function emailAlreadyExists({
  url,
  serviceRoleKey,
  email,
}: {
  url: string;
  serviceRoleKey: string;
  email: string;
}) {
  const perPage = 200;

  for (let page = 1; page <= 20; page += 1) {
    const response = await fetch(`${url}/auth/v1/admin/users?page=${page}&per_page=${perPage}`, {
      method: "GET",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return false;
    }

    const payload = (await response.json().catch(() => null)) as { users?: unknown } | null;
    const users = Array.isArray(payload?.users) ? payload.users : [];

    const found = users.some((user) => {
      if (!user || typeof user !== "object") {
        return false;
      }

      const candidate = (user as Record<string, unknown>).email;
      return typeof candidate === "string" && candidate.toLowerCase() === email;
    });

    if (found) {
      return true;
    }

    if (users.length < perPage) {
      break;
    }
  }

  return false;
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
  const notifyTarget = asText(body.notifyTarget);

  if (!email || !password || !fullName) {
    return Response.json({ message: "Ad soyad, e-posta ve sifre zorunludur." }, { status: 400 });
  }

  if (notifyChannel !== "email" && !notifyTarget) {
    return Response.json(
      { message: "Secilen bildirim kanali icin iletisim bilgisi zorunludur." },
      { status: 400 },
    );
  }

  if (!canAttemptRegister(email)) {
    return Response.json(
      {
        code: "REGISTER_COOLDOWN",
        message:
          "Kisa surede tekrar kayit denemesi algilandi. Lutfen 1 dakika bekleyin veya Google ile devam edin.",
      },
      { status: 429 },
    );
  }

  if (config.serviceRoleKey) {
    const exists = await emailAlreadyExists({
      url: config.url,
      serviceRoleKey: config.serviceRoleKey,
      email,
    }).catch(() => false);

    if (exists) {
      return Response.json(
        {
          code: "EMAIL_EXISTS",
          message: "Bu e-posta ile zaten kayit var. Lutfen giris yapin.",
        },
        { status: 409 },
      );
    }
  }

  const signupResponse = await fetch(`${config.url}/auth/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
    },
    body: JSON.stringify({
      email,
      password,
      data: {
        name: fullName,
        fullName,
        app_access: [],
        access_requests: ["ihaleradar"],
        notify_channel: notifyChannel,
        notify_target: notifyTarget || null,
      },
    }),
  });

  const signupPayload = (await signupResponse.json().catch(() => null)) as unknown;

  if (!signupResponse.ok) {
    const rawError = readSupabaseError(signupPayload);
    const mapped = mapRegisterErrorMessage(rawError, signupResponse.status);
    const normalized = (rawError ?? "").toLowerCase();
    const code =
      signupResponse.status === 429 || normalized.includes("rate limit")
        ? "RATE_LIMIT_EMAIL"
        : undefined;

    return Response.json(
      { message: mapped, ...(code ? { code } : {}) },
      { status: signupResponse.status },
    );
  }

  await incrementEarlyAccessCount().catch(() => null);

  return Response.json({
    ok: true,
    message:
      "Kaydiniz alindi. E-posta dogrulamasini tamamladiktan sonra erisim talebiniz admin onayina alinacaktir.",
  });
}
