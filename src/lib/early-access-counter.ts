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
  if (now < temporaryCampaignStart) {
    return 0;
  }

  // Kampanya bittikten sonra da son boost seviyesi korunur; sayaç geri düşmez.
  const effectiveNow = Math.min(now, temporaryCampaignEnd - 1);

  // Duzenli bot paterni gibi gorunmemesi icin deterministik ama daginik ritim.
  // Ortalama: ilk hizli akis (90sn) + 3-4dk arasi beklemeler + ara ara mini burst.
  let cursor = temporaryCampaignStart;
  let boost = 0;
  let state = 0x9e3779b9; // sabit tohum (deterministik)

  while (cursor <= effectiveNow && cursor < temporaryCampaignEnd) {
    // xorshift32
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    const rnd = Math.abs(state) % 100;

    // Cogunlukla +1, nadiren +2
    boost += rnd > 83 ? 2 : 1;

    // 0-24 => hizli (90-120sn), 25-74 => yavas (180-240sn), 75-99 => daha uzun duraklama (240-300sn)
    let stepSeconds = 90;
    if (rnd < 25) {
      stepSeconds = 90 + (rnd % 2) * 30;
    } else if (rnd < 75) {
      stepSeconds = 180 + (rnd % 3) * 30;
    } else {
      stepSeconds = 240 + (rnd % 3) * 30;
    }

    cursor += stepSeconds * 1000;
  }

  return Math.max(0, boost);
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
