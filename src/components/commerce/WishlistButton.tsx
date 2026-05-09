import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist";
import { cn } from "@/lib/utils";

export function WishlistButton({ productId, className }: { productId: string; className?: string }) {
  const has = useWishlistStore((s) => s.ids.includes(productId));
  const toggle = useWishlistStore((s) => s.toggle);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      aria-label={has ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "h-9 w-9 grid place-items-center rounded-full bg-ivory/85 backdrop-blur border border-border/50 hover:bg-ivory transition-all",
        className,
      )}
    >
      <Heart
        className={cn("h-4 w-4 transition-all", has ? "fill-espresso text-espresso scale-110" : "text-espresso")}
        strokeWidth={1.5}
      />
    </button>
  );
}
