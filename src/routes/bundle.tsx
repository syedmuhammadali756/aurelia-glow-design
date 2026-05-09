import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { PRODUCTS, formatPrice } from "@/data/products";
import { PageHeader } from "@/components/layout/PageHeader";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { cn } from "@/lib/utils";
import bundleVisual from "@/assets/bundle-builder-visual.jpg";

export const Route = createFileRoute("/bundle")({
  head: () => ({
    meta: [
      { title: "Build Your Bundle — Aurelia Glow" },
      { name: "description", content: "Build your own glow bundle. Save 10% with three pieces, 15% with four or more." },
      { property: "og:title", content: "Build Your Bundle — Aurelia Glow" },
      { property: "og:description", content: "Curate your own ritual. Save up to 15% on bundles." },
    ],
  }),
  component: BundlePage,
});

function BundlePage() {
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const add = useCartStore((s) => s.add);
  const openCart = useUIStore((s) => s.openCart);

  const items = PRODUCTS.filter((p) => p.productType !== "Glow Kit");
  const subtotal = useMemo(
    () => items.filter((p) => picked.has(p.id)).reduce((s, p) => s + p.price, 0),
    [picked, items],
  );
  const discountPct = picked.size >= 4 ? 0.15 : picked.size >= 3 ? 0.1 : 0;
  const discount = subtotal * discountPct;
  const total = subtotal - discount;

  const toggle = (id: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const addBundle = () => {
    items.filter((p) => picked.has(p.id)).forEach((p) => {
      const v = p.variants[0];
      add({
        productId: p.id,
        productHandle: p.handle,
        variantId: v.id,
        title: p.title,
        variantTitle: v.title,
        price: v.price,
        image: p.images[0].src,
      });
    });
    openCart();
  };

  return (
    <>
      <PageHeader
        eyebrow="Bundle Builder"
        title="Build your ritual"
        subtitle="Choose three or more pieces and save automatically. The more you add, the softer the price."
      />
      <section className="container-luxe py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-6">
              {items.map((p) => {
                const selected = picked.has(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => toggle(p.id)}
                    className={cn(
                      "group relative text-left bg-surface-warm border transition-all",
                      selected ? "border-espresso shadow-soft" : "border-border hover:border-espresso/60",
                    )}
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img src={p.images[0].src} alt={p.images[0].alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-[15px] font-medium text-espresso truncate">{p.title}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{formatPrice(p.price)}</p>
                        </div>
                        <span className={cn(
                          "h-6 w-6 rounded-full grid place-items-center border flex-shrink-0 transition-all",
                          selected ? "bg-espresso text-ivory border-espresso" : "border-border bg-ivory",
                        )}>
                          {selected && <Check className="h-3.5 w-3.5" />}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-ivory border border-border">
              <div className="aspect-[4/3] overflow-hidden bg-surface-warm">
                <img src={bundleVisual} alt="Bundle composition" className="h-full w-full object-cover" />
              </div>
              <div className="p-6 md:p-8">
                <div className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">Your bundle</div>
                <div className="mt-1 display-serif text-3xl text-espresso">{picked.size} {picked.size === 1 ? "piece" : "pieces"}</div>

                <div className="mt-6 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Bundle discount</span><span>{discountPct > 0 ? `– ${formatPrice(discount)}` : "—"}</span></div>
                  <div className="border-t border-border pt-3 flex justify-between text-espresso font-medium"><span>Total</span><span>{formatPrice(total)}</span></div>
                </div>

                <div className="mt-5 text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                  {picked.size < 3 ? `Add ${3 - picked.size} more for 10% off` : picked.size < 4 ? "Add 1 more for 15% off" : "Maximum savings unlocked"}
                </div>

                <button
                  onClick={addBundle}
                  disabled={picked.size === 0}
                  className="mt-6 w-full h-12 bg-espresso text-ivory text-[11px] tracking-[0.22em] uppercase hover:bg-espresso/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Add bundle to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
