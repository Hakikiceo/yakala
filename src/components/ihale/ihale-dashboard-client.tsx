"use client";

import { useEffect } from "react";
import Link from "next/link";

import type { Locale } from "@/types/i18n";

type IhaleDashboardClientProps = {
  locale: Locale;
  tokenFromQuery?: string;
};

const SESSION_KEY = "yakala_ihale_token";

const content = {
  tr: {
    badge: "Ihale Radar // Dashboard Girisi",
    title: "Oturum hazir",
    description:
      "Token handoff alindiysa oturum depolanir ve URL temizlenir. Bir sonraki fazda bu noktaya urun ici dashboard baglanir.",
    stateLabel: "Oturum durumu",
    stateTokenReceived: "Token alindi",
    stateSessionPresent: "Aktif oturum mevcut",
    stateMissing: "Token bulunamadi",
    tokenLabel: "Token ozeti",
    tokenHidden: "Guvenlik nedeniyle tam token gosterilmiyor.",
    actionsTitle: "Hizli islemler",
    loginAgain: "Tekrar Giris",
    register: "Yeni Kayit",
  },
  en: {
    badge: "Ihale Radar // Dashboard Access",
    title: "Session ready",
    description:
      "If token handoff is received, the session is stored and the URL is cleaned. In the next phase, the in-product dashboard will be connected here.",
    stateLabel: "Session status",
    stateTokenReceived: "Token received",
    stateSessionPresent: "Existing session found",
    stateMissing: "No token found",
    tokenLabel: "Token summary",
    tokenHidden: "Full token is hidden for security reasons.",
    actionsTitle: "Quick actions",
    loginAgain: "Sign In Again",
    register: "Create Account",
  },
} as const;

function maskToken(token: string) {
  if (token.length < 20) {
    return "********";
  }

  return `${token.slice(0, 10)}...${token.slice(-10)}`;
}

export function IhaleDashboardClient({ locale, tokenFromQuery }: IhaleDashboardClientProps) {
  const t = content[locale];

  useEffect(() => {
    if (tokenFromQuery) {
      window.sessionStorage.setItem(SESSION_KEY, tokenFromQuery);
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      window.history.replaceState({}, "", url.toString());
    }
  }, [tokenFromQuery]);

  const statusText = tokenFromQuery ? t.stateTokenReceived : t.stateMissing;
  const tokenPreview = tokenFromQuery ? maskToken(tokenFromQuery) : null;

  const loginHref =
    locale === "en" ? "/en/ihale/login" : "/ihale/login";
  const registerHref =
    locale === "en" ? "/en/ihale/register" : "/ihale/register";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--color-glow-1),transparent_36%),radial-gradient(circle_at_top_right,var(--color-glow-2),transparent_30%),linear-gradient(180deg,var(--color-bg)_0%,var(--color-bg-elevated)_100%)]" />
      <div className="mx-auto flex min-h-screen w-full max-w-[90rem] items-center px-6 py-14 md:px-12">
        <section className="mx-auto w-full max-w-4xl rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-2xl md:p-12">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">{t.badge}</p>
          <h1 className="mt-4 text-4xl font-light tracking-[-0.05em] md:text-6xl">{t.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--color-muted)]">{t.description}</p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-subtle)]">{t.stateLabel}</p>
              <p className="mt-3 text-2xl font-medium">{statusText}</p>
            </article>
            <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-subtle)]">{t.tokenLabel}</p>
              <p className="mt-3 break-all text-sm text-[var(--color-muted)]">{tokenPreview ?? t.tokenHidden}</p>
            </article>
          </div>

          <div className="mt-10 border-t border-[var(--color-border)] pt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-subtle)]">{t.actionsTitle}</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link
                href={loginHref}
                className="yakala-primary-action inline-flex items-center justify-center rounded-sm px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] transition hover:scale-[1.02]"
              >
                {t.loginAgain}
              </Link>
              <Link
                href={registerHref}
                className="yakala-secondary-action inline-flex items-center justify-center rounded-sm border px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] transition hover:scale-[1.02]"
              >
                {t.register}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
