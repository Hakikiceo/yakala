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

type FormState = "idle" | "submitting" | "error" | "success";
type NotifyChannel = "email" | "whatsapp" | "telegram";

type AuthCopy = {
  title: string;
  description: string;
  email: string;
  password: string;
  passwordAgain: string;
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
  passwordMismatch: string;
  networkError: string;
  registerPendingSuccess: string;
  googleCta: string;
  notifyPreferenceLabel: string;
  notifyOptions: Record<NotifyChannel, string>;
  notifyTargetLabel: string;
  notifyTargetPlaceholder: Record<NotifyChannel, string>;
  notifyTargetRequired: string;
};

function getCopy(locale: Locale, mode: AuthMode): AuthCopy {
  if (locale === "tr") {
    const isLogin = mode === "login";

    return {
      title: isLogin ? "Merkezi Giris" : "Merkezi Kayit",
      description: isLogin
        ? "Merkezi hesabinizla giris yapin ve onayli uygulamalariniza erisin."
        : "Hesabinizi olusturun. Erisim talebiniz admin onayindan sonra aktif edilir.",
      email: "E-posta",
      password: "Sifre",
      passwordAgain: "Sifre (Tekrar)",
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
      passwordMismatch: "Sifreler ayni olmali.",
      networkError: "Baglanti hatasi olustu.",
      registerPendingSuccess:
        "Kaydiniz alindi. Erisim talebiniz onaylandiginda secilen kanal uzerinden bilgilendirileceksiniz.",
      googleCta: "Google ile Devam Et",
      notifyPreferenceLabel: "Onay bildirimi tercihi",
      notifyOptions: {
        email: "Email",
        whatsapp: "WhatsApp",
        telegram: "Telegram",
      },
      notifyTargetLabel: "Iletisim bilgisi",
      notifyTargetPlaceholder: {
        email: "",
        whatsapp: "+90 5xx xxx xx xx",
        telegram: "@kullaniciadi",
      },
      notifyTargetRequired: "Secilen bildirim kanali icin iletisim bilgisi zorunlu.",
    };
  }

  const isLogin = mode === "login";

  return {
    title: isLogin ? "Central Sign In" : "Central Register",
    description: isLogin
      ? "Sign in with your central account and access your approved applications."
      : "Create your account and continue after access approval is granted.",
    email: "Email",
    password: "Password",
    passwordAgain: "Password (Confirm)",
    fullName: "Full Name",
    submit: isLogin ? "Sign In" : "Register",
    loading: isLogin ? "Signing in" : "Creating account",
    switchLabel: isLogin ? "No account yet? Register" : "Already have an account? Sign in",
    switchHref: isLogin ? "/register" : "/login",
    invalidReturnTo: "The return_to address is not in the allowlist.",
    missingReturnTo: "The return_to parameter is required.",
    invalidApp: "Invalid app parameter. Only app=ihaleradar is supported.",
    tokenError: "Token was not returned by API.",
    missingApiUrl: "IHALERADAR_API_BASE_URL is not configured.",
    passwordMismatch: "Passwords must match.",
    networkError: "A network error occurred.",
    registerPendingSuccess:
      "Your registration has been received. We will notify you via your selected channel once access is approved.",
    googleCta: "Continue with Google",
    notifyPreferenceLabel: "Approval notification preference",
    notifyOptions: {
      email: "Email",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
    },
    notifyTargetLabel: "Contact detail",
    notifyTargetPlaceholder: {
      email: "",
      whatsapp: "+90 5xx xxx xx xx",
      telegram: "@username",
    },
    notifyTargetRequired: "Contact detail is required for the selected notification channel.",
  };
}

function buildAuthEndpoint(apiBaseUrl: string, mode: AuthMode) {
  const normalizedBase = apiBaseUrl.replace(/\/+$/, "");

  if (normalizedBase.endsWith("/api/ihaleradar-auth")) {
    return `${normalizedBase}/${mode}`;
  }

  return `${normalizedBase}/auth/${mode}`;
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
  const [passwordAgain, setPasswordAgain] = useState("");
  const [fullName, setFullName] = useState("");
  const [notifyChannel, setNotifyChannel] = useState<NotifyChannel>("email");
  const [notifyTarget, setNotifyTarget] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const switchHref = useMemo(() => {
    const url = new URL(getLocalizedPath(locale, copy.switchHref), "https://yakala.io");

    if (appParam) {
      url.searchParams.set("app", appParam);
    }

    if (returnToParam) {
      url.searchParams.set("return_to", returnToParam);
    }

    return `${url.pathname}${url.search}`;
  }, [appParam, copy.switchHref, locale, returnToParam]);

  const googleStartHref = useMemo(() => {
    const params = new URLSearchParams({ locale });
    return `/api/auth/google/start?${params.toString()}`;
  }, [locale]);

  function resolvePostLoginPath(localeValue: Locale) {
    return localeValue === "en" ? "/en" : "/";
  }

  async function handleCentralSessionWithToken(token: string) {
    const response = await fetch("/api/central/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error("CENTRAL_SESSION_FAILED");
    }

    await response.json().catch(() => null);
    window.location.assign(resolvePostLoginPath(locale));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!apiBaseUrl) {
      setErrorMessage(copy.missingApiUrl);
      return;
    }

    if (mode === "register" && password !== passwordAgain) {
      setErrorMessage(copy.passwordMismatch);
      return;
    }

    if (mode === "register" && notifyChannel !== "email" && notifyTarget.trim().length === 0) {
      setErrorMessage(copy.notifyTargetRequired);
      return;
    }

    setFormState("submitting");

    try {
      const endpoint = buildAuthEndpoint(apiBaseUrl, mode);
      const payload =
        mode === "login"
          ? { email, password }
          : {
              email,
              password,
              passwordConfirm: passwordAgain,
              name: fullName,
              fullName,
              notifyChannel,
              notifyTarget: notifyTarget.trim(),
            };

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

      if (mode === "register") {
        if (token && returnToParam) {
          window.location.assign(buildReturnToWithToken(returnToParam, token));
          return;
        }

        setFormState("success");
        setSuccessMessage(readErrorMessage(json) ?? copy.registerPendingSuccess);
        return;
      }

      if (!token) {
        setErrorMessage(copy.tokenError);
        setFormState("error");
        return;
      }

      if (returnToParam || appParam) {
        if (!returnToParam) {
          setErrorMessage(copy.missingReturnTo);
          setFormState("error");
          return;
        }

        if (targetApp !== "ihaleradar") {
          setErrorMessage(copy.invalidApp);
          setFormState("error");
          return;
        }

        if (!isAllowedReturnTo(returnToParam, allowedReturnTo)) {
          setErrorMessage(copy.invalidReturnTo);
          setFormState("error");
          return;
        }

        window.location.assign(buildReturnToWithToken(returnToParam, token));
        return;
      }

      await handleCentralSessionWithToken(token);
    } catch {
      setErrorMessage(copy.networkError);
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

            {mode === "register" ? (
              <>
                <label className="grid gap-2 text-sm">
                  <span className="text-[var(--color-subtle)]">{copy.passwordAgain}</span>
                  <input
                    type="password"
                    value={passwordAgain}
                    onChange={(event) => setPasswordAgain(event.target.value)}
                    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-control-bg)] px-4 py-3 text-[var(--color-control-text)] outline-none transition focus:border-[var(--color-border-strong)]"
                    required
                  />
                </label>

                <fieldset className="grid gap-2 text-sm">
                  <legend className="text-[var(--color-subtle)]">{copy.notifyPreferenceLabel}</legend>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {(Object.keys(copy.notifyOptions) as NotifyChannel[]).map((option) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-control-bg)] px-3 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-control-text)]"
                      >
                        <input
                          type="radio"
                          name="notifyChannel"
                          value={option}
                          checked={notifyChannel === option}
                          onChange={() => setNotifyChannel(option)}
                          className="accent-emerald-500"
                        />
                        {copy.notifyOptions[option]}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {notifyChannel !== "email" ? (
                  <label className="grid gap-2 text-sm">
                    <span className="text-[var(--color-subtle)]">{copy.notifyTargetLabel}</span>
                    <input
                      type="text"
                      value={notifyTarget}
                      onChange={(event) => setNotifyTarget(event.target.value)}
                      placeholder={copy.notifyTargetPlaceholder[notifyChannel]}
                      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-control-bg)] px-4 py-3 text-[var(--color-control-text)] outline-none transition focus:border-[var(--color-border-strong)]"
                      required
                    />
                  </label>
                ) : null}
              </>
            ) : null}

            <button
              type="submit"
              disabled={formState === "submitting"}
              className="yakala-primary-action mt-2 inline-flex items-center justify-center rounded-sm px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] transition hover:scale-[1.02] disabled:cursor-wait disabled:opacity-70"
            >
              {formState === "submitting" ? copy.loading : copy.submit}
            </button>
          </form>

          <Link
            href={googleStartHref}
            className="yakala-secondary-action mt-4 inline-flex w-full items-center justify-center rounded-sm border px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] transition hover:scale-[1.02]"
          >
            {copy.googleCta}
          </Link>

          {errorMessage ? (
            <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </p>
          ) : null}

          {successMessage ? (
            <p className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              {successMessage}
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
