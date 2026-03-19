"use client";

import type { CSSProperties, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getMessages } from "@/data/messages";
import { getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

type IconProps = {
  className?: string;
};

function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M4 6h16v12H4z" />
      <path d="m4 8 8 6 8-6" />
    </svg>
  );
}

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

function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.3 2.3 4.9-5.3" />
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
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("yakala-theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    if (!submitted) {
      return;
    }

    const timer = window.setTimeout(() => setSubmitted(false), 5000);
    return () => window.clearTimeout(timer);
  }, [submitted]);

  const isDark = theme === "dark";

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

  function handleNotify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubmitted(true);
    setEmail("");
  }

  return (
    <div className={isDark ? "dark" : undefined}>
      <div className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-50 font-sans text-zinc-900 selection:bg-zinc-200 dark:bg-[#010103] dark:text-white dark:selection:bg-white/10">
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

        <div className="pointer-events-none absolute inset-0 z-0 text-zinc-400 opacity-20 dark:text-white dark:opacity-40">
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
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-zinc-50/80 dark:from-[#010103] dark:via-transparent dark:to-[#010103]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-50 via-transparent to-zinc-50/30 dark:from-[#010103] dark:via-transparent dark:to-[#010103]/30" />
          <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_center,transparent_0%,#010103_100%)] opacity-80 dark:block" />
          <div className="yakala-coming-scan absolute inset-0 z-10 h-[40vh] w-full bg-gradient-to-b from-transparent via-blue-500/5 to-transparent opacity-30 dark:via-white/5" />
        </div>

        <Container className="relative z-50 flex items-center justify-between px-6 py-8 md:px-12">
          <div className="hidden w-24 md:block" />

          <div className="flex flex-col items-center">
            <div className="mb-2 h-4 w-4 animate-pulse rounded-sm bg-zinc-900 opacity-80 shadow-xl dark:bg-white" />
            <h2 className="text-xl font-bold uppercase leading-none tracking-[0.4em] text-zinc-900 dark:text-white">
              {content.logo}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              className="rounded-full border border-zinc-200 bg-white/40 p-2 text-zinc-500 backdrop-blur-md transition-all hover:scale-110 dark:border-white/5 dark:bg-white/5 dark:text-zinc-400"
              aria-label={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </button>

            <div className="flex rounded-full border border-zinc-200 bg-zinc-200/50 p-1 backdrop-blur-md dark:border-white/5 dark:bg-white/5">
              <Link
                href={getLocalizedPath("tr", "/")}
                className={`rounded-full px-3 py-1 text-[9px] font-bold tracking-[0.24em] transition-all ${
                  locale === "tr"
                    ? "bg-zinc-900 text-white shadow-lg dark:bg-white dark:text-zinc-950"
                    : "text-zinc-500"
                }`}
              >
                TR
              </Link>
              <Link
                href={getLocalizedPath("en", "/")}
                className={`rounded-full px-3 py-1 text-[9px] font-bold tracking-[0.24em] transition-all ${
                  locale === "en"
                    ? "bg-zinc-900 text-white shadow-lg dark:bg-white dark:text-zinc-950"
                    : "text-zinc-500"
                }`}
              >
                EN
              </Link>
            </div>
          </div>
        </Container>

        <Container className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="yakala-coming-text mx-auto max-w-4xl space-y-8">
            <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-white/50 px-4 py-1.5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-600 dark:text-white/60">
                {content.status}
              </span>
            </div>

            <p className="mx-auto max-w-2xl text-xl font-light leading-relaxed tracking-[0.1em] text-zinc-800 drop-shadow-2xl md:text-3xl dark:text-white/90">
              {content.slogan}
            </p>

            <div className="mx-auto max-w-lg w-full pt-12">
              {!submitted ? (
                <form
                  onSubmit={handleNotify}
                  className="flex flex-col gap-2 rounded-sm border border-zinc-200 bg-white/90 p-1.5 shadow-2xl backdrop-blur-3xl transition-all hover:border-zinc-300 dark:border-white/10 dark:bg-black/60 dark:hover:border-white/20 sm:flex-row"
                >
                  <div className="flex flex-1 items-center px-4 text-zinc-400">
                    <MailIcon className="h-[18px] w-[18px] opacity-50" />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={content.placeholder}
                      className="w-full bg-transparent px-3 py-4 font-light text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-white dark:placeholder:text-zinc-700"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-sm bg-zinc-900 px-10 py-4 text-xs font-bold uppercase tracking-[0.24em] text-white shadow-xl transition-all hover:scale-[1.02] active:scale-95 dark:bg-white dark:text-zinc-950"
                  >
                    {content.button}
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-center gap-3 rounded-sm border border-emerald-500/20 bg-emerald-500/5 px-8 py-6 text-emerald-600 duration-500 animate-in fade-in zoom-in dark:text-emerald-400">
                  <CheckCircleIcon className="h-6 w-6" />
                  <span className="font-medium tracking-wide">{content.success}</span>
                </div>
              )}
            </div>

            <div className="flex justify-center pt-20 opacity-20">
              <div className="h-px w-12 bg-zinc-900 dark:bg-white" />
            </div>
          </div>
        </Container>

        <div className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 opacity-10 transition-opacity hover:opacity-40">
          <p className="whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.8em] text-zinc-600 dark:text-white">
            {content.version}
          </p>
        </div>
      </div>
    </div>
  );
}
