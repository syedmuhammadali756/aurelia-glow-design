import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useUIStore } from "@/store/ui";
import { useCartStore } from "@/store/cart";
import { PRODUCT_BY_HANDLE } from "@/data/products";
import { Button } from "@/components/ui/button";
import { PriceDisplay } from "./PriceDisplay";
import { ShadeSelector } from "./ShadeSelector";
import { QuantityStepper } from "./QuantityStepper";

export function QuickViewModal() {
  const { quickViewHandle, closeQuickView, openCart } = useUIStore();
  const add = useCartStore((s) => s.add);
  const product = quickViewHandle ? PRODUCT_BY_HANDLE[quickViewHandle] : null;
  const [variant, setVariant] = useState(product?.variants.find((v) => v.available) ?? product?.variants[0]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setVariant(product.variants.find((v) => v.available) ?? product.variants[0]);
      setQty(1);
      document.body.style.overflow = "hidden";
      const k = (e: KeyboardEvent) => e.key === "Escape" && closeQuickView();
      window.addEventListener("keydown", k);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", k);
      };
    }
  }, [product, closeQuickView]);

  if (!product || !variant) return null;

  const image = variant.image ?? product.images[0].src;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-espresso/45 animate-fade-in" onClick={closeQuickView} style={{ animationDuration: "200ms" }} />
      <div className="relative w-full max-w-4xl bg-ivory shadow-[var(--shadow-elevated)] grid md:grid-cols-2 max-h-[90vh] overflow-y-auto animate-fade-in" style={{ animationDuration: "220ms" }}>
        <button onClick={closeQuickView} aria-label="Close" className="absolute top-3 right-3 z-10 p-2 bg-ivory/85 backdrop-blur rounded-full"><X className="h-4 w-4" /></button>
        <div className="aspect-[4/5] md:aspect-auto bg-surface-warm">
          <img src={image} alt={product.title} className="h-full w-full object-cover" />
        </div>
        <div className="p-8 md:p-10 flex flex-col">
          <span className="eyebrow">{product.productType}</span>
          <h2 className="display-serif text-3xl mt-2">{product.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{product.subtitle}</p>
          <div className="mt-4">
            <PriceDisplay price={variant.price} compareAt={product.compareAtPrice} size="lg" />
          </div>
          <p className="mt-4 text-sm text-foreground/80 leading-relaxed line-clamp-3">{product.description}</p>
          {product.variants.length > 1 && (
            <div className="mt-6">
              <ShadeSelector product={product} value={variant} onChange={setVariant} />
            </div>
          )}
          <div className="mt-6 flex items-center gap-3">
            <QuantityStepper value={qty} onChange={setQty} />
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <Button
              variant="solid"
              size="lg"
              shape="sharp"
              disabled={!variant.available}
              onClick={() => {
                add(
                  {
                    productId: product.id,
                    productHandle: product.handle,
                    variantId: variant.id,
                    title: product.title,
                    variantTitle: variant.title,
                    price: variant.price,
                    image,
                  },
                  qty,
                );
                closeQuickView();
                setTimeout(openCart, 200);
              }}
            >
              {variant.available ? "Add to Cart" : "Sold out"}
            </Button>
            <Link
              to="/products/$handle"
              params={{ handle: product.handle }}
              onClick={closeQuickView}
              className="text-center text-[11px] tracking-[0.18em] uppercase link-underline"
            >
              View full details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
