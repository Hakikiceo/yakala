"use client";

import { useEffect, useState } from "react";

import { getLocalizedPath } from "@/lib/i18n";
import { isPendingAccessMessage, markPendingAccess } from "@/lib/pending-access";
import type { Locale } from "@/types/i18n";

type GoogleCallbackClientProps = {
  locale: Locale;
};

const content = {
  tr: {
    loading: "Google oturumu tamamlanıyor...",
    error: "Google oturumu tamamlanamadi. Lutfen tekrar deneyin.",
  },
  en: {
    loading: "Completing Google sign-in...",
    error: "Google sign-in could not be completed. Please try again.",
  },
} as const;

function readTokenFromCallbackUrl() {
  const hash = window.location.hash.replace(/^#/, "");
  const hashParams = new URLSearchParams(hash);
  const queryParams = new URLSearchParams(window.location.search);
  return hashParams.get("access_token") ?? queryParams.get("access_token");
}

export function GoogleCallbackClient({ locale }: GoogleCallbackClientProps) {
  const t = content[locale];
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function completeGoogleSession() {
      const token = readTokenFromCallbackUrl();

      if (!token) {
        if (active) {
          setError(true);
        }
        return;
      }

      try {
        const response = await fetch("/api/central/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as { message?: unknown } | null;
          const message = typeof payload?.message === "string" ? payload.message : null;
          if (isPendingAccessMessage(message)) {
            markPendingAccess();
            window.location.assign(getLocalizedPath(locale, "/"));
            return;
          }
          if (active) {
            setError(true);
          }
          return;
        }

        await response.json().catch(() => null);
        window.location.assign(locale === "en" ? "/en" : "/");
      } catch {
        if (active) {
          setError(true);
        }
      }
    }

    void completeGoogleSession();

    return () => {
      active = false;
    };
  }, [locale]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[90rem] items-center justify-center px-6 py-14 md:px-12">
        <section className="w-full max-w-lg rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-2xl">
          <p className="text-base text-[var(--color-muted)]">{error ? t.error : t.loading}</p>
        </section>
      </div>
    </main>
  );
}
