import { useState } from "react";
import type { ProductImage } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, eager }: { images: ProductImage[]; eager?: boolean }) {
  const [active, setActive] = useState(0);
  const main = images[active];

  return (
    <div className="grid grid-cols-[80px_1fr] gap-4 lg:gap-6">
      <div className="flex flex-col gap-2.5 order-2 lg:order-1">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={cn(
              "relative aspect-[4/5] overflow-hidden bg-surface-warm border transition-all",
              i === active ? "border-espresso" : "border-transparent hover:border-border",
            )}
          >
            <img src={img.src} alt={img.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <div className="order-1 lg:order-2">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-warm group">
          <img
            key={active}
            src={main.src}
            alt={main.alt}
            loading={eager ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
}
