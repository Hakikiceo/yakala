import { listAdminUsers } from "@/lib/supabase-admin-users";

const defaultBase = 457;

function resolveBaseCount() {
  const parsed = Number.parseInt(process.env.EARLY_ACCESS_BASE ?? "", 10);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return defaultBase;
  }

  return parsed;
}

export async function getEarlyAccessCount() {
  const base = resolveBaseCount();
  const usersResult = await listAdminUsers();

  if (!usersResult.ok) {
    return base;
  }

  // Supabase Auth'ta e-posta sahibi her kayit on-erisim sayacina dahil edilir.
  const registeredUsers = usersResult.users.filter((user) => Boolean(user.email)).length;
  return base + registeredUsers;
}

export async function incrementEarlyAccessCount() {
  // Counter artik canli kullanici sayisindan turetiliyor.
  // Register sonrasi anlik deger donmek icin ayni hesabi tekrar okuyoruz.
  return getEarlyAccessCount();
}
