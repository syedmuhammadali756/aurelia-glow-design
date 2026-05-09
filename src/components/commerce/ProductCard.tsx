import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, Check } from "lucide-react";
import type { Product } from "@/data/products";
import { PriceDisplay } from "./PriceDisplay";
import { Rating } from "./Rating";
import { Badge } from "./Badge";
import { ShadeSwatch } from "./ShadeSwatch";
import { WishlistButton } from "./WishlistButton";
import { useUIStore } from "@/store/ui";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

export function ProductCard({ product, eager }: { product: Product; eager?: boolean }) {
  const primary = product.images[0];
  const hover = product.images[1] ?? primary;
  const isShade = product.options[0]?.name === "Shade";
  const shadeValues = isShade ? product.variants.slice(0, 6) : [];
  const openQuickView = useUIStore((s) => s.openQuickView);
  const openCart = useUIStore((s) => s.openCart);
  const add = useCartStore((s) => s.add);
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isShade || product.variants.length > 1) {
      openQuickView(product.handle);
      return;
    }
    const v = product.variants[0];
    add({
      productId: product.id,
      productHandle: product.handle,
      variantId: v.id,
      title: product.title,
      variantTitle: v.title,
      price: v.price,
      image: primary.src,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
    setTimeout(() => openCart(), 200);
  };

  return (
    <Link
      to="/products/$handle"
      params={{ handle: product.handle }}
      className="group block card-lift"
    >
      <div className="relative overflow-hidden bg-surface-warm aspect-[4/5]">
        <img
          src={primary.src}
          alt={primary.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={hover.src}
          alt={hover.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.03]"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badges?.map((b) => <Badge key={b} kind={b} />)}
        </div>

        {/* Wishlist + quick view */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 transition-all">
          <WishlistButton productId={product.id} />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openQuickView(product.handle);
            }}
            aria-label="Quick view"
            className="h-9 w-9 grid place-items-center rounded-full bg-ivory/85 backdrop-blur border border-border/50 hover:bg-ivory transition-all opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0"
          >
            <Eye className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Quick add */}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            type="button"
            onClick={handleQuickAdd}
            className={cn(
              "w-full h-11 text-[11px] tracking-[0.18em] uppercase bg-ivory text-espresso border border-border hover:bg-espresso hover:text-ivory transition-all",
              added && "bg-espresso text-ivory",
            )}
          >
            {added ? (
              <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5" /> Added</span>
            ) : isShade ? "Quick Add" : "Add to Cart"}
          </button>
        </div>
      </div>

      <div className="pt-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[15px] font-medium tracking-wide text-espresso truncate">{product.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{product.subtitle}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <PriceDisplay price={product.price} compareAt={product.compareAtPrice} size="sm" />
          {product.rating && <Rating value={product.rating} size="xs" />}
        </div>
        {shadeValues.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5">
            {shadeValues.map((v) => <ShadeSwatch key={v.id} shade={v.title} size="xs" />)}
            {product.variants.length > 6 && (
              <span className="text-[10px] tracking-wider uppercase text-muted-foreground ml-1">
                +{product.variants.length - 6}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
