import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-3.5-3.5" />
    </BaseIcon>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </BaseIcon>
  );
}

export function RadarIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3a9 9 0 1 0 9 9" />
      <path d="M12 7a5 5 0 1 0 5 5" />
      <path d="M12 11a1 1 0 1 0 1 1" />
      <path d="M12 12 18 6" />
    </BaseIcon>
  );
}

export function MapIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
      <path d="M9 3v15" />
      <path d="M15 6v15" />
    </BaseIcon>
  );
}

export function CalculatorIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8" />
      <path d="M8 12h2" />
      <path d="M14 12h2" />
      <path d="M8 16h2" />
      <path d="M14 16h2" />
    </BaseIcon>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 21V7l8-4 8 4v14" />
      <path d="M9 21v-4h6v4" />
      <path d="M8 10h.01" />
      <path d="M16 10h.01" />
      <path d="M8 14h.01" />
      <path d="M16 14h.01" />
    </BaseIcon>
  );
}

export function MegaphoneIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m3 11 12-5v12L3 13v-2Z" />
      <path d="M15 9h2a4 4 0 0 1 0 8h-2" />
      <path d="m6 13 2 6" />
    </BaseIcon>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M10 21v-6h4v6" />
    </BaseIcon>
  );
}

export function DatabaseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" />
    </BaseIcon>
  );
}

export function NetworkIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M8 6h8" />
      <path d="M7.7 7.3 10.5 15" />
      <path d="M16.3 7.3 13.5 15" />
    </BaseIcon>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3 5 6v6c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </BaseIcon>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </BaseIcon>
  );
}

export function CpuIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9 1v3" />
      <path d="M15 1v3" />
      <path d="M9 20v3" />
      <path d="M15 20v3" />
      <path d="M20 9h3" />
      <path d="M20 15h3" />
      <path d="M1 9h3" />
      <path d="M1 15h3" />
    </BaseIcon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </BaseIcon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m9 6 6 6-6 6" />
    </BaseIcon>
  );
}

export function getProductIcon(slug: string) {
  const iconMap = {
    "ihale-radar": SearchIcon,
    "hibe-radar": TargetIcon,
    "rakip-radar": RadarIcon,
    "mapeg-radar": MapIcon,
    "muhasebe-radar": CalculatorIcon,
    "sahibinden-radar": BuildingIcon,
    "ajans-radar": MegaphoneIcon,
    "emlak-radar": HomeIcon,
  } as const;

  return iconMap[slug as keyof typeof iconMap] ?? RadarIcon;
}

export function ProductIcon({
  slug,
  ...props
}: IconProps & {
  slug: string;
}) {
  switch (slug) {
    case "ihale-radar":
      return <SearchIcon {...props} />;
    case "hibe-radar":
      return <TargetIcon {...props} />;
    case "rakip-radar":
      return <RadarIcon {...props} />;
    case "mapeg-radar":
      return <MapIcon {...props} />;
    case "muhasebe-radar":
      return <CalculatorIcon {...props} />;
    case "sahibinden-radar":
      return <BuildingIcon {...props} />;
    case "ajans-radar":
      return <MegaphoneIcon {...props} />;
    case "emlak-radar":
      return <HomeIcon {...props} />;
    default:
      return <RadarIcon {...props} />;
  }
}
