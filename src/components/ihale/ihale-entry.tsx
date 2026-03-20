import Link from "next/link";

import type { Locale } from "@/types/i18n";

type IhaleEntryProps = {
  locale: Locale;
  loginHref: string;
  registerHref: string;
};

const content = {
  tr: {
    badge: "YAKALA.IO // Ihale Radar Girisi",
    title: "Ihale Radar merkezi erisim",
    description:
      "Ihale Radar urunune tek alan adi mimarisiyle erisin. Giris ve kayit islemleri YAKALA merkezi kimlik akisi uzerinden token handoff ile tamamlanir.",
    login: "Giris Yap",
    register: "Kayit Ol",
    note: "Bu ekran gecis katmanidir. Urun ici dashboard modulleri bir sonraki fazda aktif edilir.",
  },
  en: {
    badge: "YAKALA.IO // Ihale Radar Access",
    title: "Ihale Radar central access",
    description:
      "Access Ihale Radar under a single-domain architecture. Sign in and registration are completed through YAKALA central identity with token handoff.",
    login: "Sign In",
    register: "Register",
    note: "This screen is a transition layer. In-product dashboard modules will be enabled in the next phase.",
  },
} as const;

export function IhaleEntry({ locale, loginHref, registerHref }: IhaleEntryProps) {
  const t = content[locale];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--color-glow-1),transparent_38%),radial-gradient(circle_at_top_right,var(--color-glow-2),transparent_32%),linear-gradient(180deg,var(--color-bg)_0%,var(--color-bg-elevated)_100%)]" />
      <div className="mx-auto flex min-h-screen w-full max-w-[90rem] items-center px-6 py-14 md:px-12">
        <section className="mx-auto w-full max-w-3xl rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-2xl md:p-12">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">{t.badge}</p>
          <h1 className="mt-4 text-4xl font-light tracking-[-0.05em] md:text-6xl">{t.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-muted)]">{t.description}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={loginHref}
              className="yakala-primary-action inline-flex items-center justify-center rounded-sm px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] transition hover:scale-[1.02]"
            >
              {t.login}
            </Link>
            <Link
              href={registerHref}
              className="yakala-secondary-action inline-flex items-center justify-center rounded-sm border px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] transition hover:scale-[1.02]"
            >
              {t.register}
            </Link>
          </div>

          <p className="mt-10 text-sm leading-6 text-[var(--color-subtle)]">{t.note}</p>
        </section>
      </div>
    </main>
  );
}
