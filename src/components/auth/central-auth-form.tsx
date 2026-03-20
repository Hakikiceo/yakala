"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  buildReturnToWithToken,
  extractToken,
  isAllowedReturnTo,
  readErrorMessage,
  resolveAuthApp,
  type AuthMode,
} from "@/lib/central-auth";
import { getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

type CentralAuthFormProps = {
  locale: Locale;
  mode: AuthMode;
  apiBaseUrl: string;
  allowedReturnTo: string[];
  appParam?: string;
  returnToParam?: string;
};

type FormState = "idle" | "submitting" | "error";

type AuthCopy = {
  title: string;
  description: string;
  email: string;
  password: string;
  fullName: string;
  submit: string;
  loading: string;
  switchLabel: string;
  switchHref: string;
  invalidReturnTo: string;
  missingReturnTo: string;
  invalidApp: string;
  tokenError: string;
  missingApiUrl: string;
  appLabel: string;
  appValue: string;
  returnToLabel: string;
};

function getCopy(locale: Locale, mode: AuthMode): AuthCopy {
  if (locale === "tr") {
    const isLogin = mode === "login";

    return {
      title: isLogin ? "Merkezi Giris" : "Merkezi Kayit",
      description: isLogin
        ? "Ihale Radar kimlik sunucusuna baglanip token handoff ile uygulamaya doneceksiniz."
        : "Hesap olusturulduktan sonra Ihale Radar tokeniyle uygulamaya yonlendirilirsiniz.",
      email: "E-posta",
      password: "Sifre",
      fullName: "Ad Soyad",
      submit: isLogin ? "Giris Yap" : "Kayit Ol",
      loading: isLogin ? "Giris yapiliyor" : "Kayit olusturuluyor",
      switchLabel: isLogin ? "Hesabin yok mu? Kayit ol" : "Hesabin var mi? Giris yap",
      switchHref: isLogin ? "/register" : "/login",
      invalidReturnTo: "return_to adresi allowlist disinda.",
      missingReturnTo: "return_to parametresi gerekli.",
      invalidApp: "app parametresi gecersiz. Sadece app=ihaleradar desteklenir.",
      tokenError: "Token alinamadi. API yanitini kontrol edin.",
      missingApiUrl: "IHALERADAR_API_BASE_URL tanimli degil.",
      appLabel: "Hedef uygulama",
      appValue: "Ihale Radar",
      returnToLabel: "Donus adresi",
    };
  }

  const isLogin = mode === "login";

  return {
    title: isLogin ? "Central Login" : "Central Register",
    description: isLogin
      ? "You will authenticate against the Ihale Radar identity API, then return with token handoff."
      : "After registration, you will be redirected back with an Ihale Radar token handoff.",
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    submit: isLogin ? "Sign In" : "Create Account",
    loading: isLogin ? "Signing in" : "Creating account",
    switchLabel: isLogin ? "No account yet? Register" : "Already have an account? Sign in",
    switchHref: isLogin ? "/register" : "/login",
    invalidReturnTo: "The return_to address is not in the allowlist.",
    missingReturnTo: "The return_to parameter is required.",
    invalidApp: "Invalid app parameter. Only app=ihaleradar is supported.",
    tokenError: "Token was not returned by API.",
    missingApiUrl: "IHALERADAR_API_BASE_URL is not configured.",
    appLabel: "Target app",
    appValue: "Ihale Radar",
    returnToLabel: "Return URL",
  };
}

export function CentralAuthForm({
  locale,
  mode,
  apiBaseUrl,
  allowedReturnTo,
  appParam,
  returnToParam,
}: CentralAuthFormProps) {
  const copy = getCopy(locale, mode);
  const targetApp = resolveAuthApp(appParam);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const switchHref = useMemo(() => {
    const url = new URL(getLocalizedPath(locale, copy.switchHref), "https://yakala.io");

    if (appParam) {
      url.searchParams.set("app", appParam);
    }

    if (returnToParam) {
      url.searchParams.set("return_to", returnToParam);
    }

    const localizedPrefix = locale === "en" ? "/en" : "";
    return `${localizedPrefix}${url.pathname}${url.search}`;
  }, [appParam, copy.switchHref, locale, returnToParam]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!apiBaseUrl) {
      setErrorMessage(copy.missingApiUrl);
      return;
    }

    if (!returnToParam) {
      setErrorMessage(copy.missingReturnTo);
      return;
    }

    if (targetApp !== "ihaleradar") {
      setErrorMessage(copy.invalidApp);
      return;
    }

    if (!isAllowedReturnTo(returnToParam, allowedReturnTo)) {
      setErrorMessage(copy.invalidReturnTo);
      return;
    }

    setFormState("submitting");

    try {
      const endpoint = `${apiBaseUrl.replace(/\/$/, "")}/auth/${mode}`;
      const payload =
        mode === "login"
          ? { email, password }
          : { email, password, name: fullName, fullName };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = (await response.json().catch(() => null)) as unknown;

      if (!response.ok) {
        setErrorMessage(readErrorMessage(json) ?? `${response.status} ${response.statusText}`);
        setFormState("error");
        return;
      }

      const token = extractToken(json);

      if (!token) {
        setErrorMessage(copy.tokenError);
        setFormState("error");
        return;
      }

      window.location.assign(buildReturnToWithToken(returnToParam, token));
    } catch {
      setErrorMessage(locale === "tr" ? "Baglanti hatasi olustu." : "A network error occurred.");
      setFormState("error");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--color-glow-1),transparent_35%),radial-gradient(circle_at_top_right,var(--color-glow-2),transparent_28%),linear-gradient(180deg,var(--color-bg)_0%,var(--color-bg-elevated)_100%)]" />
      <div className="mx-auto flex min-h-screen w-full max-w-[90rem] items-center px-6 py-14 md:px-12">
        <section className="mx-auto w-full max-w-xl rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-2xl md:p-10">
          <Link
            href={getLocalizedPath(locale, "/")}
            className="mb-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-[var(--color-subtle)] transition hover:text-[var(--color-text)]"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            YAKALA.IO
          </Link>

          <h1 className="text-4xl font-light tracking-[-0.06em] md:text-5xl">{copy.title}</h1>
          <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">{copy.description}</p>

          <div className="mt-8 grid gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel-strong)] p-5 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[var(--color-subtle)]">{copy.appLabel}</span>
              <span className="font-semibold text-[var(--color-text)]">
                {targetApp === "ihaleradar" ? copy.appValue : appParam ?? "unknown"}
              </span>
            </div>
            <div className="h-px bg-[var(--color-border)]" />
            <div className="grid gap-1">
              <span className="text-[var(--color-subtle)]">{copy.returnToLabel}</span>
              <span className="break-all text-xs text-[var(--color-text)]">
                {returnToParam ?? "-"}
              </span>
            </div>
          </div>

          <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
            {mode === "register" ? (
              <label className="grid gap-2 text-sm">
                <span className="text-[var(--color-subtle)]">{copy.fullName}</span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-control-bg)] px-4 py-3 text-[var(--color-control-text)] outline-none transition focus:border-[var(--color-border-strong)]"
                  required
                />
              </label>
            ) : null}

            <label className="grid gap-2 text-sm">
              <span className="text-[var(--color-subtle)]">{copy.email}</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-control-bg)] px-4 py-3 text-[var(--color-control-text)] outline-none transition focus:border-[var(--color-border-strong)]"
                required
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="text-[var(--color-subtle)]">{copy.password}</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-control-bg)] px-4 py-3 text-[var(--color-control-text)] outline-none transition focus:border-[var(--color-border-strong)]"
                required
              />
            </label>

            <button
              type="submit"
              disabled={formState === "submitting"}
              className="yakala-primary-action mt-2 inline-flex items-center justify-center rounded-sm px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] transition hover:scale-[1.02] disabled:cursor-wait disabled:opacity-70"
            >
              {formState === "submitting" ? copy.loading : copy.submit}
            </button>
          </form>

          {errorMessage ? (
            <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </p>
          ) : null}

          <div className="mt-8 border-t border-[var(--color-border)] pt-6">
            <Link
              href={switchHref}
              className="text-sm text-[var(--color-muted)] underline decoration-[var(--color-border-strong)] underline-offset-4 transition hover:text-[var(--color-text)]"
            >
              {copy.switchLabel}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
