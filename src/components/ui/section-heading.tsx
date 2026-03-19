import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <Badge className="mb-4">{eyebrow}</Badge> : null}
      <h2 className="text-balance text-4xl font-light tracking-[-0.06em] text-[var(--color-text)] md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg font-light leading-8 text-[var(--color-muted)]">{description}</p>
      ) : null}
    </div>
  );
}
