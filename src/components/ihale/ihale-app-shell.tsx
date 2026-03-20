import Link from "next/link";

import type { Locale } from "@/types/i18n";

type IhaleAppShellProps = {
  locale: Locale;
};

const content = {
  tr: {
    badge: "Ihale Radar // Uygulama",
    title: "Ihale Radar uygulama katmani",
    description:
      "Merkezi auth handoff tamamlandi. Bu ekran urun ici dashboard'un guvenli giris katmani olarak hazirlandi.",
    note: "Bir sonraki sprintte listeleme, filtre, bildirim ve ekip alanlari bu katmana baglanacak.",
    back: "Dashboard Girisine Don",
  },
  en: {
    badge: "Ihale Radar // Application",
    title: "Ihale Radar application layer",
    description:
      "Central auth handoff is complete. This screen is prepared as the secure entry layer for the in-product dashboard.",
    note: "In the next sprint, listing, filtering, notifications, and team areas will be connected here.",
    back: "Back to Dashboard Access",
  },
} as const;

export function IhaleAppShell({ locale }: IhaleAppShellProps) {
  const t = content[locale];
  const backHref = locale === "en" ? "/en/ihale/dashboard" : "/ihale/dashboard";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--color-glow-1),transparent_38%),radial-gradient(circle_at_top_right,var(--color-glow-2),transparent_32%),linear-gradient(180deg,var(--color-bg)_0%,var(--color-bg-elevated)_100%)]" />
      <div className="mx-auto flex min-h-screen w-full max-w-[90rem] items-center px-6 py-14 md:px-12">
        <section className="mx-auto w-full max-w-4xl rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-2xl md:p-12">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">{t.badge}</p>
          <h1 className="mt-4 text-4xl font-light tracking-[-0.05em] md:text-6xl">{t.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--color-muted)]">{t.description}</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-subtle)]">{t.note}</p>

          <div className="mt-10 border-t border-[var(--color-border)] pt-8">
            <Link
              href={backHref}
              className="yakala-secondary-action inline-flex items-center justify-center rounded-sm border px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] transition hover:scale-[1.02]"
            >
              {t.back}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
