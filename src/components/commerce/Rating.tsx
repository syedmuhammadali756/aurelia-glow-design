import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({ value, count, size = "sm" }: { value: number; count?: number; size?: "xs" | "sm" | "md" }) {
  const sizes = { xs: 10, sm: 12, md: 14 };
  const s = sizes[size];
  return (
    <div className="inline-flex items-center gap-2 text-rose-taupe">
      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            width={s}
            height={s}
            strokeWidth={1.5}
            className={cn(i < Math.round(value) ? "fill-current" : "fill-transparent")}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-[11px] tracking-wider uppercase text-muted-foreground">
          {value.toFixed(1)} · {count}
        </span>
      )}
    </div>
  );
}
