"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";

import type { Locale } from "@/types/i18n";

type AccessUser = {
  id: string;
  email: string | null;
  createdAt: string | null;
  appAccess: string[];
  accessRequests: string[];
  notifyChannel: string | null;
  notifyTarget: string | null;
};

type ApprovedUser = AccessUser & {
  fullAccessEnabled?: boolean;
};

type AccessResponse = {
  supportedApps: string[];
  pending: AccessUser[];
  approved: ApprovedUser[];
};

type AdminAccessPanelProps = {
  locale: Locale;
  configured: boolean;
  initialAuthenticated: boolean;
};

const content = {
  tr: {
    title: "Merkezi Erişim Paneli",
    subtitle: "Onayladığınız kullanıcıların full erişimini tek yerden açıp kapatın.",
    keyLabel: "Admin anahtarı",
    keyPlaceholder: "CENTRAL_ADMIN_PANEL_KEY",
    login: "Paneli Aç",
    logout: "Çıkış Yap",
    refresh: "Yenile",
    pending: "Erişim Talep Edenler",
    approved: "Erişim Yetkisi Olanlar",
    approve: "Onayla + Full Erişim Aç",
    fullOn: "Full Erişim Aç",
    fullOff: "Full Erişim Kapat",
    searchLabel: "E-posta Ara",
    searchPlaceholder: "ornek@firma.com",
    quickGrantTitle: "E-posta ile Hızlı Yetki",
    quickGrantHint: "Kullanıcı listede görünmese bile e-posta ile full erişim açabilirsiniz.",
    quickGrantEmailLabel: "E-posta",
    quickGrantApprove: "Full Erişim Aç",
    emptyPending: "Bekleyen kullanıcı yok.",
    emptyApproved: "Yetkili kullanıcı yok.",
    notConfigured: "Admin panel anahtarı sunucuda ayarlanmamış.",
    unauthorized: "Admin anahtarı hatalı.",
    genericError: "İşlem başarısız oldu.",
    notifyLabel: "Bildirim",
    notifyMissing: "Bilgi yok",
    fullStatus: "Full erişim",
    on: "Açık",
    off: "Kapalı",
  },
  en: {
    title: "Central Access Panel",
    subtitle: "Open/close full access for approved users from one place.",
    keyLabel: "Admin key",
    keyPlaceholder: "CENTRAL_ADMIN_PANEL_KEY",
    login: "Unlock Panel",
    logout: "Sign Out",
    refresh: "Refresh",
    pending: "Pending Requests",
    approved: "Users With Access",
    approve: "Approve + Full Access ON",
    fullOn: "Full Access ON",
    fullOff: "Full Access OFF",
    searchLabel: "Search Email",
    searchPlaceholder: "example@company.com",
    quickGrantTitle: "Quick Grant by Email",
    quickGrantHint: "Grant full access by email even if user is not visible in list.",
    quickGrantEmailLabel: "Email",
    quickGrantApprove: "Enable Full Access",
    emptyPending: "No pending users.",
    emptyApproved: "No approved users.",
    notConfigured: "Admin panel key is not configured on server.",
    unauthorized: "Invalid admin key.",
    genericError: "Operation failed.",
    notifyLabel: "Notification",
    notifyMissing: "Not provided",
    fullStatus: "Full access",
    on: "ON",
    off: "OFF",
  },
} as const;

function formatDate(value: string | null) {
  if (!value) return "-";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export function AdminAccessPanel({ locale, configured, initialAuthenticated }: AdminAccessPanelProps) {
  const t = content[locale];
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [key, setKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AccessResponse>({ supportedApps: [], pending: [], approved: [] });
  const [searchEmail, setSearchEmail] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingAction, startTransition] = useTransition();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/access-requests", { method: "GET", cache: "no-store" });
      const payload = (await response.json().catch(() => null)) as AccessResponse | { message?: string } | null;

      if (!response.ok) {
        setError((payload as { message?: string } | null)?.message ?? t.genericError);
        return;
      }

      setData(payload as AccessResponse);
    } catch {
      setError(t.genericError);
    } finally {
      setLoading(false);
    }
  }, [t.genericError]);

  useEffect(() => {
    if (authenticated) {
      void fetchData();
    }
  }, [authenticated, fetchData]);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      if (!response.ok) {
        setError(payload?.message ?? t.unauthorized);
        return;
      }

      setAuthenticated(true);
      setKey("");
      await fetchData();
    } catch {
      setError(t.genericError);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" }).catch(() => null);
    setAuthenticated(false);
    setData({ supportedApps: [], pending: [], approved: [] });
  }

  function callAction(params: { userId?: string; email?: string; action: "approve" | "full_access_on" | "full_access_off" }) {
    startTransition(async () => {
      setError(null);
      try {
        const response = await fetch("/api/admin/access-requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
        });
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        if (!response.ok) {
          setError(payload?.message ?? t.genericError);
          return;
        }

        if (params.email) {
          setManualEmail("");
        }

        await fetchData();
      } catch {
        setError(t.genericError);
      }
    });
  }

  const q = searchEmail.trim().toLowerCase();
  const filteredPending = useMemo(() => {
    if (!q) return data.pending;
    return data.pending.filter((u) => (u.email ?? "").toLowerCase().includes(q));
  }, [data.pending, q]);

  const filteredApproved = useMemo(() => {
    if (!q) return data.approved;
    return data.approved.filter((u) => (u.email ?? "").toLowerCase().includes(q));
  }, [data.approved, q]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--color-glow-1),transparent_38%),radial-gradient(circle_at_top_right,var(--color-glow-2),transparent_32%),linear-gradient(180deg,var(--color-bg)_0%,var(--color-bg-elevated)_100%)]" />
      <div className="mx-auto w-full max-w-[90rem] px-6 py-12 md:px-12">
        <section className="rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-2xl md:p-10">
          <h1 className="text-3xl font-light tracking-[-0.04em] md:text-5xl">{t.title}</h1>
          <p className="mt-3 text-sm text-[var(--color-muted)] md:text-base">{t.subtitle}</p>

          {!configured ? (
            <p className="mt-6 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">{t.notConfigured}</p>
          ) : null}

          {error ? (
            <p className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
          ) : null}

          {!authenticated ? (
            <form className="mt-8 max-w-lg space-y-3" onSubmit={handleLogin}>
              <label className="grid gap-2 text-sm">
                <span className="text-[var(--color-subtle)]">{t.keyLabel}</span>
                <input
                  type="password"
                  value={key}
                  onChange={(event) => setKey(event.target.value)}
                  placeholder={t.keyPlaceholder}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-control-bg)] px-4 py-3 text-[var(--color-control-text)] outline-none transition focus:border-[var(--color-border-strong)]"
                  required
                />
              </label>
              <button type="submit" className="yakala-primary-action inline-flex items-center justify-center rounded-sm px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:scale-[1.02]">
                {t.login}
              </button>
            </form>
          ) : (
            <div className="mt-8">
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => void fetchData()} disabled={loading || pendingAction} className="yakala-secondary-action inline-flex items-center justify-center rounded-sm border px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:scale-[1.02] disabled:opacity-60">
                  {t.refresh}
                </button>
                <button type="button" onClick={() => void handleLogout()} className="yakala-secondary-action inline-flex items-center justify-center rounded-sm border px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:scale-[1.02]">
                  {t.logout}
                </button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="text-[var(--color-subtle)]">{t.searchLabel}</span>
                  <input type="text" value={searchEmail} onChange={(event) => setSearchEmail(event.target.value)} placeholder={t.searchPlaceholder} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-control-bg)] px-4 py-3 text-[var(--color-control-text)] outline-none" />
                </label>

                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4">
                  <p className="text-sm font-medium">{t.quickGrantTitle}</p>
                  <p className="mt-1 text-xs text-[var(--color-muted)]">{t.quickGrantHint}</p>
                  <div className="mt-3 flex gap-2">
                    <input type="email" value={manualEmail} onChange={(event) => setManualEmail(event.target.value)} placeholder={t.quickGrantEmailLabel} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-control-bg)] px-4 py-2 text-[var(--color-control-text)] outline-none" />
                    <button type="button" onClick={() => callAction({ email: manualEmail, action: "full_access_on" })} disabled={pendingAction || manualEmail.trim().length === 0} className="yakala-primary-action inline-flex items-center justify-center rounded-sm px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] disabled:opacity-60">
                      {t.quickGrantApprove}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
                  <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--color-subtle)]">{t.pending}</h2>
                  <div className="mt-4 space-y-3">
                    {filteredPending.length === 0 ? (
                      <p className="text-sm text-[var(--color-muted)]">{t.emptyPending}</p>
                    ) : (
                      filteredPending.map((user) => (
                        <div key={user.id} className="rounded-xl border border-[var(--color-border)] p-3">
                          <p className="text-sm font-medium">{user.email ?? user.id}</p>
                          <p className="mt-1 text-xs text-[var(--color-subtle)]">{formatDate(user.createdAt)}</p>
                          <p className="mt-1 text-xs text-[var(--color-subtle)]">
                            {t.notifyLabel}: {user.notifyChannel ?? t.notifyMissing}
                            {user.notifyTarget ? ` - ${user.notifyTarget}` : ""}
                          </p>
                          <button type="button" onClick={() => callAction({ userId: user.id, action: "approve" })} disabled={pendingAction} className="yakala-primary-action mt-3 inline-flex items-center justify-center rounded-sm px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] disabled:opacity-60">
                            {t.approve}
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </article>

                <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
                  <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--color-subtle)]">{t.approved}</h2>
                  <div className="mt-4 space-y-3">
                    {filteredApproved.length === 0 ? (
                      <p className="text-sm text-[var(--color-muted)]">{t.emptyApproved}</p>
                    ) : (
                      filteredApproved.map((user) => {
                        const fullOn = Boolean(user.fullAccessEnabled);
                        return (
                          <div key={user.id} className="rounded-xl border border-[var(--color-border)] p-3">
                            <p className="text-sm font-medium">{user.email ?? user.id}</p>
                            <p className="mt-1 text-xs text-[var(--color-subtle)]">{formatDate(user.createdAt)}</p>
                            <p className="mt-1 text-xs text-[var(--color-subtle)]">
                              {t.fullStatus}: <strong>{fullOn ? t.on : t.off}</strong>
                            </p>
                            <div className="mt-3 flex gap-2">
                              <button type="button" onClick={() => callAction({ userId: user.id, action: "full_access_on" })} disabled={pendingAction || fullOn} className="yakala-primary-action inline-flex items-center justify-center rounded-sm px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] disabled:opacity-60">
                                {t.fullOn}
                              </button>
                              <button type="button" onClick={() => callAction({ userId: user.id, action: "full_access_off" })} disabled={pendingAction || !fullOn} className="yakala-secondary-action inline-flex items-center justify-center rounded-sm border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] disabled:opacity-60">
                                {t.fullOff}
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </article>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
