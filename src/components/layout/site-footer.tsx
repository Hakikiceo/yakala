import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getHomepageContent } from "@/data/homepage";
import { getMessages } from "@/data/messages";
import { getAllProducts } from "@/lib/products";
import { siteConfig } from "@/data/site";
import { getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const content = getHomepageContent(locale);
  const dictionary = getMessages(locale);
  const featuredProducts = getAllProducts().slice(0, 4);

  const platformLinks = [
    { href: getLocalizedPath(locale, "/"), label: content.shell.platform },
    { href: getLocalizedPath(locale, "/products"), label: content.shell.ecosystem },
    { href: getLocalizedPath(locale, "/solutions"), label: content.shell.solutions },
    { href: getLocalizedPath(locale, "/about"), label: content.shell.institution },
  ];

  const companyLinks = [
    { href: getLocalizedPath(locale, "/about"), label: dictionary.nav.about },
    { href: getLocalizedPath(locale, "/contact"), label: content.shell.contact },
    { href: getLocalizedPath(locale, "/demo"), label: content.shell.requestAccess },
  ];

  return (
    <footer className="border-t border-[var(--color-border)] bg-[linear-gradient(180deg,var(--color-panel),var(--color-bg-elevated))] px-6 pb-16 pt-28 md:px-12">
      <Container className="grid gap-16 md:grid-cols-6">
        <div className="space-y-4 md:col-span-2">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-5 w-5 rounded-sm bg-[var(--color-accent-bg)]" />
            <div className="text-lg font-semibold uppercase tracking-[0.2em] text-[var(--color-text)]">
              YAKALA<span className="font-light text-[var(--color-subtle)]">.IO</span>
            </div>
          </div>
          <p className="max-w-sm text-base font-light leading-relaxed text-[var(--color-muted)]">
            {content.shell.footerDescription}
          </p>
        </div>

        <div>
          <div className="mb-8 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-text)]">
            {content.shell.platform}
          </div>
          <div className="space-y-4 text-sm font-light text-[var(--color-muted)]">
            {platformLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block transition-colors hover:text-[var(--color-text)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-8 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-text)]">
            {content.shell.ecosystem}
          </div>
          <div className="space-y-4 text-sm font-light text-[var(--color-muted)]">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={getLocalizedPath(locale, `/products/${product.slug}`)}
                className="block transition-colors hover:text-[var(--color-text)]"
              >
                {product.name[locale]}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-8 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-text)]">
            {content.shell.footerCompany}
          </div>
          <div className="space-y-4 text-sm font-light text-[var(--color-muted)]">
            {companyLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block transition-colors hover:text-[var(--color-text)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-8 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-text)]">
            {dictionary.footer.legal}
          </div>
          <div className="space-y-4 text-sm font-light text-[var(--color-muted)]">
            <Link
              href={getLocalizedPath(locale, "/legal/privacy")}
              className="block transition-colors hover:text-[var(--color-text)]"
            >
              {dictionary.legalPage.privacyTitle}
            </Link>
            <Link
              href={getLocalizedPath(locale, "/legal/terms")}
              className="block transition-colors hover:text-[var(--color-text)]"
            >
              {dictionary.legalPage.termsTitle}
            </Link>
            <div className="pt-2 leading-7 text-[var(--color-control-text-muted)]">
              {siteConfig.email}
              <br />
              {siteConfig.phone}
            </div>
          </div>
        </div>
      </Container>

      <Container className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-[var(--color-border)] pt-8 md:flex-row">
        <div className="text-xs font-light text-[var(--color-subtle)]">
          {siteConfig.name} © 2026. {dictionary.footer.rights}
        </div>
        <div className="flex gap-8 text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--color-subtle)]">
          {content.shell.locations.map((location) => (
            <span key={location}>{location}</span>
          ))}
        </div>
      </Container>
    </footer>
  );
}
