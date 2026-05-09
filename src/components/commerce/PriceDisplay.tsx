import { formatPrice } from "@/data/products";
import { cn } from "@/lib/utils";

export function PriceDisplay({
  price,
  compareAt,
  size = "md",
}: {
  price: number;
  compareAt?: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = { sm: "text-sm", md: "text-base", lg: "text-xl" };
  return (
    <div className={cn("flex items-baseline gap-2.5", sizes[size])}>
      <span className="font-medium text-espresso">{formatPrice(price)}</span>
      {compareAt && compareAt > price && (
        <>
          <span className="line-through text-muted-foreground text-[0.85em]">
            {formatPrice(compareAt)}
          </span>
          <span className="text-[10px] tracking-[0.18em] uppercase text-rose-taupe">
            -{Math.round(((compareAt - price) / compareAt) * 100)}%
          </span>
        </>
      )}
    </div>
  );
}
