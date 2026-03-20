"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getMessages } from "@/data/messages";
import { getLocalizedPath } from "@/lib/i18n";
import { hasPendingAccess } from "@/lib/pending-access";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/i18n";

type IconProps = {
  className?: string;
};

function SunIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5" />
      <path d="M12 19.5V22" />
      <path d="m4.93 4.93 1.77 1.77" />
      <path d="m17.3 17.3 1.77 1.77" />
      <path d="M2 12h2.5" />
      <path d="M19.5 12H22" />
      <path d="m4.93 19.07 1.77-1.77" />
      <path d="m17.3 6.7 1.77-1.77" />
    </svg>
  );
}

function MoonIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
    </svg>
  );
}

const earthImage =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=100&w=3500&auto=format&fit=crop";

const stars = Array.from({ length: 60 }, (_, index) => ({
  id: index,
  size: 0.8 + ((index * 7) % 8) / 10,
  left: (index * 17) % 100,
  top: (index * 29) % 100,
  duration: 2 + ((index * 11) % 30) / 10,
  delay: ((index * 13) % 50) / 10,
}));

export function ComingSoonScreen({ locale }: { locale: Locale }) {
  const dictionary = getMessages(locale);
  const content = dictionary.comingSoonPage;
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    return document.documentElement.dataset.theme === "light" ? "light" : "dark";
  });
  const [pendingAccess, setPendingAccess] = useState(false);
  const registerHref = locale === "en" ? "/en/ihale/register" : "/ihale/register";
  const loginHref = locale === "en" ? "/en/ihale/login" : "/ihale/login";
  const privacyHref = locale === "en" ? "/en/legal/privacy" : "/legal/privacy";
  const termsHref = locale === "en" ? "/en/legal/terms" : "/legal/terms";

  useEffect(() => {
    setPendingAccess(hasPendingAccess());
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("yakala-theme", theme);
    } catch {}
  }, [theme]);

  const isDark = theme === "dark";
  const earlyAccessPrimaryTextColor = isDark ? "#09090b" : "#ffffff";

  const heroStyle = useMemo(
    () => ({
      backgroundImage: `url('${earthImage}')`,
      backgroundPosition: "75% 65%",
      filter: isDark
        ? "brightness(0.7) contrast(1.1) saturate(0.9) blur(1px)"
        : "brightness(1.1) contrast(0.9) grayscale(0.8)",
      opacity: isDark ? 0.45 : 0.15,
    }),
    [isDark],
  );

  return (
    <div>
      <div
        className={cn(
          "relative flex min-h-screen flex-col overflow-hidden font-sans transition-colors duration-700",
          isDark
            ? "bg-[#010103] text-white selection:bg-white/10"
            : "bg-zinc-50 text-zinc-900 selection:bg-zinc-200",
        )}
      >
        <style>{`
          @keyframes iss-flyover {
            0% { transform: scale(1.1) translate(1%, 1%) rotate(0deg); }
            50% { transform: scale(1.2) translate(-2%, -1%) rotate(0.5deg); }
            100% { transform: scale(1.1) translate(1%, 1%) rotate(0deg); }
          }
          @keyframes scanning-beam {
            0% { transform: translateY(-100%) skewY(-5deg); opacity: 0; }
            50% { opacity: 0.1; }
            100% { transform: translateY(100%) skewY(-5deg); opacity: 0; }
          }
          @keyframes star-twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); filter: blur(10px); }
            to { opacity: 1; transform: translateY(0); filter: blur(0); }
          }
          .yakala-coming-orbit { animation: iss-flyover 120s ease-in-out infinite alternate; }
          .yakala-coming-scan { animation: scanning-beam 10s linear infinite; }
          .yakala-coming-text { animation: fade-in-up 2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .yakala-coming-star {
            position: absolute;
            background: currentColor;
            border-radius: 999px;
            pointer-events: none;
            animation: star-twinkle var(--duration) ease-in-out infinite;
            animation-delay: var(--delay);
          }
        `}</style>

        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-0",
            isDark ? "text-white opacity-40" : "text-zinc-400 opacity-20",
          )}
        >
          {stars.map((star) => (
            <div
              key={star.id}
              className="yakala-coming-star"
              style={
                {
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  "--duration": `${star.duration}s`,
                  "--delay": `${star.delay}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <div className="yakala-coming-orbit absolute h-[140vh] w-[140vw] bg-cover bg-no-repeat" style={heroStyle} />
          <div
            className={cn(
              "absolute inset-0",
              isDark
                ? "bg-gradient-to-t from-[#010103] via-transparent to-[#010103]/80"
                : "bg-gradient-to-t from-zinc-50 via-transparent to-zinc-50/80",
            )}
          />
          <div
            className={cn(
              "absolute inset-0",
              isDark
                ? "bg-gradient-to-r from-[#010103] via-transparent to-[#010103]/30"
                : "bg-gradient-to-r from-zinc-50 via-transparent to-zinc-50/30",
            )}
          />
          {isDark ? (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#010103_100%)] opacity-80" />
          ) : null}
          <div
            className={cn(
              "yakala-coming-scan absolute inset-0 z-10 h-[40vh] w-full bg-gradient-to-b from-transparent to-transparent opacity-30",
              isDark ? "via-white/5" : "via-blue-500/5",
            )}
          />
        </div>

        <Container className="relative z-50 flex items-center justify-between px-6 py-8 md:px-12">
          <div className="hidden w-24 md:block" />

          <div className="flex flex-col items-center">
            <div
              className={cn(
                "mb-2 h-4 w-4 animate-pulse rounded-sm opacity-80 shadow-xl",
                isDark ? "bg-white" : "bg-zinc-900",
              )}
            />
            <h2 className={cn("text-xl font-bold uppercase leading-none tracking-[0.4em]", isDark ? "text-white" : "text-zinc-900")}>
              {content.logo}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              className={cn(
                "rounded-full border p-2 backdrop-blur-md transition-all hover:scale-110",
                isDark
                  ? "border-white/5 bg-white/5 text-zinc-400"
                  : "border-zinc-200 bg-white/40 text-zinc-500",
              )}
              aria-label={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </button>

            <div
              className={cn(
                "flex rounded-full border p-1 text-[11px] font-bold uppercase tracking-[0.12em] backdrop-blur-md",
                isDark ? "border-white/5 bg-white/5" : "border-zinc-200 bg-zinc-200/50",
              )}
            >
              <Link
                href={getLocalizedPath("tr", "/")}
                aria-current={locale === "tr" ? "page" : undefined}
                className={`inline-flex min-w-12 items-center justify-center rounded-full px-3.5 py-1.5 transition-all ${
                  locale === "tr"
                    ? isDark
                      ? "bg-white !text-zinc-950 shadow-lg"
                      : "bg-zinc-900 !text-white shadow-lg"
                    : isDark
                      ? "text-zinc-300 hover:text-zinc-100"
                      : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                TR
              </Link>
              <Link
                href={getLocalizedPath("en", "/")}
                aria-current={locale === "en" ? "page" : undefined}
                className={`inline-flex min-w-12 items-center justify-center rounded-full px-3.5 py-1.5 transition-all ${
                  locale === "en"
                    ? isDark
                      ? "bg-white !text-zinc-950 shadow-lg"
                      : "bg-zinc-900 !text-white shadow-lg"
                    : isDark
                      ? "text-zinc-300 hover:text-zinc-100"
                      : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                EN
              </Link>
            </div>
          </div>
        </Container>

        <Container className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="yakala-coming-text mx-auto max-w-4xl space-y-8">
            <div
              className={cn(
                "mb-4 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 shadow-xl backdrop-blur-xl",
                isDark ? "border-white/10 bg-white/5" : "border-zinc-200 bg-white/50",
              )}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
              <span className={cn("font-mono text-[9px] uppercase tracking-[0.4em]", isDark ? "text-white/60" : "text-zinc-600")}>
                {content.status}
              </span>
            </div>

            <p
              className={cn(
                "mx-auto max-w-2xl text-xl font-light leading-relaxed tracking-[0.1em] drop-shadow-2xl md:text-3xl",
                isDark ? "text-white/90" : "text-zinc-800",
              )}
            >
              {content.slogan}
            </p>

            <div className="mx-auto max-w-lg w-full pt-12">
              <div
                className={cn(
                  "rounded-2xl border p-5 text-left",
                  isDark ? "border-white/10 bg-white/5" : "border-zinc-200 bg-white/70",
                )}
              >
                <h3 className={cn("text-sm uppercase tracking-[0.2em]", isDark ? "text-white/80" : "text-zinc-700")}>
                  {pendingAccess ? content.pendingTitle : content.earlyAccessTitle}
                </h3>
                <p className={cn("mt-3 text-sm leading-6", isDark ? "text-zinc-300" : "text-zinc-600")}>
                  {pendingAccess ? content.pendingDescription : content.earlyAccessDescription}
                </p>
                {pendingAccess ? (
                  <div className="mt-4">
                    <button
                      type="button"
                      disabled
                      className={cn(
                        "inline-flex w-full cursor-not-allowed items-center justify-center rounded-sm border px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] opacity-80",
                        isDark
                          ? "border-white/20 bg-white/10 text-zinc-200"
                          : "border-zinc-300 bg-zinc-100 text-zinc-700",
                      )}
                    >
                      {content.pendingButton}
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <Link
                      href={registerHref}
                      className={cn(
                        "inline-flex items-center justify-center rounded-sm px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:scale-[1.02]",
                        isDark ? "bg-white text-zinc-950" : "bg-zinc-900 text-white",
                      )}
                      style={{
                        color: earlyAccessPrimaryTextColor,
                        WebkitTextFillColor: earlyAccessPrimaryTextColor,
                      }}
                    >
                      {content.earlyAccessRegister}
                    </Link>
                    <Link
                      href={loginHref}
                      className={cn(
                        "inline-flex items-center justify-center rounded-sm border px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:scale-[1.02]",
                        isDark
                          ? "border-white/20 bg-transparent text-zinc-200"
                          : "border-zinc-300 bg-transparent text-zinc-700",
                      )}
                    >
                      {content.earlyAccessLogin}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center pt-20 opacity-20">
              <div className={cn("h-px w-12", isDark ? "bg-white" : "bg-zinc-900")} />
            </div>
          </div>
        </Container>

        <div className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 opacity-10 transition-opacity hover:opacity-40">
          <p className={cn("whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.8em]", isDark ? "text-white" : "text-zinc-600")}>
            {content.version}
          </p>
        </div>

        <div className="absolute bottom-6 right-6 z-20">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em]">
            <Link
              href={privacyHref}
              className={cn(
                "underline decoration-transparent underline-offset-4 transition hover:decoration-current",
                isDark ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-600 hover:text-zinc-800",
              )}
            >
              {locale === "en" ? "Privacy" : "Gizlilik"}
            </Link>
            <Link
              href={termsHref}
              className={cn(
                "underline decoration-transparent underline-offset-4 transition hover:decoration-current",
                isDark ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-600 hover:text-zinc-800",
              )}
            >
              {locale === "en" ? "Terms" : "Kosullar"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
