import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
