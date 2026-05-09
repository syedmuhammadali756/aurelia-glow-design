import { Link } from "@tanstack/react-router";
import { MEGA_MENU } from "@/data/site";
import { PRODUCT_BY_HANDLE } from "@/data/products";

export function MegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[min(960px,90vw)] animate-fade-in"
      style={{ animationDuration: "180ms" }}
    >
      <div className="bg-ivory border border-border shadow-[var(--shadow-elevated)] p-8">
        <div className="grid grid-cols-3 gap-6">
          {MEGA_MENU.map((tile) => {
            const product = PRODUCT_BY_HANDLE[tile.handle];
            if (!product) return null;
            const img = product.images[0];
            return (
              <Link
                key={tile.title}
                to="/products/$handle"
                params={{ handle: product.handle }}
                onClick={onClose}
                className="group block"
              >
                <div className="aspect-[4/3] overflow-hidden bg-surface-warm">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-medium tracking-wide">{tile.title}</span>
                  <span className="text-[11px] tracking-[0.18em] uppercase text-rose-taupe link-underline">
                    Shop
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
