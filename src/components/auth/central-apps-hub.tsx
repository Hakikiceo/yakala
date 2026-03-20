import Link from "next/link";

import type { Locale } from "@/types/i18n";

type CentralAppsHubProps = {
  locale: Locale;
  email: string | null;
  appAccess: string[];
};

const content = {
  tr: {
    title: "Uygulama Erisim Paneli",
    subtitle: "Onayli uygulamalariniza buradan erisebilirsiniz.",
    noAccess: "Henüz atanmis bir uygulama erisiminiz bulunmuyor.",
    signOut: "Cikis Yap",
    apps: {
      ihaleradar: {
        name: "Ihale Radar",
        description: "Ihale, teklif ve pazar sinyalleri izleme uygulamasi.",
        cta: "Uygulamayi Ac",
        href: "/api/apps/ihale/launch",
      },
    },
  },
  en: {
    title: "Application Access Panel",
    subtitle: "Access your approved applications from here.",
    noAccess: "No assigned application access was found yet.",
    signOut: "Sign Out",
    apps: {
      ihaleradar: {
        name: "Ihale Radar",
        description: "Tender, bid, and market signal monitoring application.",
        cta: "Open App",
        href: "/api/apps/ihale/launch",
      },
    },
  },
} as const;

const supportedApps = ["ihaleradar"] as const;
type SupportedApp = (typeof supportedApps)[number];

function isSupportedApp(value: string): value is SupportedApp {
  return supportedApps.includes(value as SupportedApp);
}

export function CentralAppsHub({ locale, email, appAccess }: CentralAppsHubProps) {
  const t = content[locale];
  const approvedApps = appAccess.filter(isSupportedApp);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--color-glow-1),transparent_35%),radial-gradient(circle_at_top_right,var(--color-glow-2),transparent_28%),linear-gradient(180deg,var(--color-bg)_0%,var(--color-bg-elevated)_100%)]" />
      <div className="mx-auto max-w-[90rem] px-6 py-14 md:px-12">
        <section className="rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-2xl md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-light tracking-[-0.06em] md:text-5xl">{t.title}</h1>
              <p className="mt-3 text-base text-[var(--color-muted)]">{t.subtitle}</p>
              {email ? <p className="mt-2 text-sm text-[var(--color-subtle)]">{email}</p> : null}
            </div>
            <button
              type="button"
              onClick={async () => {
                await fetch("/api/central/session", { method: "DELETE" }).catch(() => null);
                window.location.assign(locale === "en" ? "/en/login" : "/login");
              }}
              className="yakala-secondary-action inline-flex items-center justify-center rounded-sm border px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:scale-[1.02]"
            >
              {t.signOut}
            </button>
          </div>

          {approvedApps.length === 0 ? (
            <p className="mt-8 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
              {t.noAccess}
            </p>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {approvedApps.map((appKey) => (
                <article
                  key={appKey}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5"
                >
                  <h2 className="text-xl font-medium">{t.apps[appKey].name}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    {t.apps[appKey].description}
                  </p>
                  <Link
                    href={t.apps[appKey].href}
                    className="yakala-primary-action mt-4 inline-flex items-center justify-center rounded-sm px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:scale-[1.02]"
                  >
                    {t.apps[appKey].cta}
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
