import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_25px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
