import { listAdminUsers } from "@/lib/supabase-admin-users";

const defaultBase = 457;
const temporaryCampaignStart = new Date("2026-03-21T18:22:00+03:00").getTime();
const temporaryCampaignEnd = new Date("2026-03-22T00:00:00+03:00").getTime();
const temporaryCampaignStepMs = 90_000;

function resolveBaseCount() {
  const parsed = Number.parseInt(process.env.EARLY_ACCESS_BASE ?? "", 10);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return defaultBase;
  }

  return parsed;
}

function getTemporaryCampaignBoost(now = Date.now()) {
  if (now < temporaryCampaignStart || now >= temporaryCampaignEnd) {
    return 0;
  }

  const elapsed = now - temporaryCampaignStart;
  const steps = Math.floor(elapsed / temporaryCampaignStepMs) + 1;
  let boost = 0;

  for (let index = 0; index < steps; index += 1) {
    // 90 saniyede bir +1 / +2 dalgasi (gecici kampanya)
    boost += index % 2 === 0 ? 1 : 2;
  }

  return boost;
}

export async function getEarlyAccessCount() {
  const base = resolveBaseCount();
  const usersResult = await listAdminUsers();
  const temporaryBoost = getTemporaryCampaignBoost();

  if (!usersResult.ok) {
    return base + temporaryBoost;
  }

  // Supabase Auth'ta e-posta sahibi her kayit on-erisim sayacina dahil edilir.
  const registeredUsers = usersResult.users.filter((user) => Boolean(user.email)).length;
  return base + registeredUsers + temporaryBoost;
}

export async function incrementEarlyAccessCount() {
  // Counter artik canli kullanici sayisindan turetiliyor.
  // Register sonrasi anlik deger donmek icin ayni hesabi tekrar okuyoruz.
  return getEarlyAccessCount();
}
