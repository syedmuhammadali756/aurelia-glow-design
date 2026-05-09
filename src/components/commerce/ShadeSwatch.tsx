import { SHADE_BY_NAME } from "@/data/shades";
import { cn } from "@/lib/utils";

export function ShadeSwatch({
  shade,
  size = "md",
  selected,
  unavailable,
  onClick,
}: {
  shade: string;
  size?: "xs" | "sm" | "md" | "lg";
  selected?: boolean;
  unavailable?: boolean;
  onClick?: () => void;
}) {
  const def = SHADE_BY_NAME[shade];
  const bg = def?.hex ?? "#ddd";
  const sizes = { xs: "h-3 w-3", sm: "h-5 w-5", md: "h-8 w-8", lg: "h-14 w-14" };
  const cls = cn(
    "rounded-full transition-all",
    sizes[size],
    selected ? "ring-2 ring-offset-2 ring-offset-background ring-gold" : "ring-1 ring-border",
    unavailable && "opacity-40",
    onClick && "cursor-pointer hover:ring-2 hover:ring-rose-taupe",
  );
  const Tag = onClick ? "button" : "span";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      aria-label={shade}
      title={shade}
      className={cls}
      style={{
        backgroundColor: bg,
        backgroundImage: unavailable
          ? "linear-gradient(135deg, transparent 47%, oklch(0.4 0.02 50 / 0.7) 47%, oklch(0.4 0.02 50 / 0.7) 53%, transparent 53%)"
          : undefined,
      }}
    />
  );
}
