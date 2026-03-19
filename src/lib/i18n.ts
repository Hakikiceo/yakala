import { defaultLocale, locales, type Locale } from "@/types/i18n";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocalizedPath(locale: Locale, path = "/") {
  if (locale === defaultLocale) {
    return path;
  }

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function switchLocalePath(pathname: string, locale: Locale) {
  const isEnglishPath = pathname === "/en" || pathname.startsWith("/en/");
  const normalized = isEnglishPath ? pathname.replace(/^\/en/, "") || "/" : pathname;

  return getLocalizedPath(locale, normalized);
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "tr" ? "en" : "tr";
}
