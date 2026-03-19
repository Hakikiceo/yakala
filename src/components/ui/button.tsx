import Link from "next/link";

import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-sm px-6 py-4 text-[11px] font-bold uppercase tracking-[0.24em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-strong)]",
        variant === "primary" &&
          "yakala-primary-action shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:scale-[1.02]",
        variant === "secondary" &&
          "yakala-secondary-action border",
        variant === "ghost" &&
          "yakala-muted-action hover:bg-[var(--color-control-bg)] hover:text-[var(--color-control-text)]",
        className,
      )}
    >
      {children}
    </Link>
  );
}
