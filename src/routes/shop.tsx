import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/commerce/ProductCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { useShopifyProducts } from "@/hooks/use-shopify";
import { shopifyToProduct } from "@/lib/shopify";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Aurelia Glow" },
      { name: "description", content: "Shop the complete Aurelia Glow ritual: baked foundation, glow palettes, brushes, finishing powder and travel kits." },
      { property: "og:title", content: "Shop — Aurelia Glow" },
      { property: "og:description", content: "The complete Aurelia Glow ritual, in editorial detail." },
    ],
  }),
  component: ShopPage,
});

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price · Low to high" },
  { id: "price-desc", label: "Price · High to low" },
];

function ShopPage() {
  const [sort, setSort] = useState<string>("featured");
  const { data, isLoading } = useShopifyProducts();

  const products = useMemo(() => {
    const list = (data ?? []).map((p) => shopifyToProduct(p.node));
    if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [data, sort]);

  return (
    <>
      <PageHeader
        eyebrow="The Collection"
        title="Shop the ritual"
        subtitle="Considered pieces, designed to layer beautifully into one effortless glow routine."
      />
      <section className="container-luxe py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            {isLoading ? "Loading…" : `${products.length} product${products.length === 1 ? "" : "s"}`}
          </div>
          <div className="flex items-center gap-3">
            <label className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-9 bg-transparent border border-border px-3 text-sm focus:outline-none focus:border-espresso"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[4/5] bg-surface-warm animate-pulse" />
                <div className="h-3 bg-surface-warm animate-pulse w-2/3" />
                <div className="h-3 bg-surface-warm animate-pulse w-1/3" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="display-serif text-2xl mb-2">No products found</h3>
            <p className="text-sm text-muted-foreground">
              Add a product to your Shopify store to see it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  );
}
