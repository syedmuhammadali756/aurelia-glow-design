import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/commerce/ProductCard";
import { PageHeader } from "@/components/layout/PageHeader";
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

const FILTERS = [
  { id: "all", label: "All" },
  { id: "Glow Kit", label: "Kits" },
  { id: "Foundation", label: "Foundation" },
  { id: "Palette", label: "Palettes" },
  { id: "Powder", label: "Powder" },
  { id: "Tool", label: "Brushes" },
];

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price · Low to high" },
  { id: "price-desc", label: "Price · High to low" },
  { id: "rating", label: "Top rated" },
];

function ShopPage() {
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<string>("featured");

  const products = useMemo(() => {
    let list = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.productType === filter || p.productType === "Kit" && filter === "Glow Kit");
    if (filter === "Glow Kit") list = PRODUCTS.filter((p) => p.productType === "Glow Kit" || p.productType === "Kit");
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [filter, sort]);

  return (
    <>
      <PageHeader
        eyebrow="The Collection"
        title="Shop the ritual"
        subtitle="Six considered pieces, designed to layer beautifully into one effortless glow routine."
      />
      <section className="container-luxe py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "px-4 h-9 text-[11px] tracking-[0.18em] uppercase border transition-colors",
                  filter === f.id
                    ? "bg-espresso text-ivory border-espresso"
                    : "bg-transparent text-espresso border-border hover:border-espresso",
                )}
              >
                {f.label}
              </button>
            ))}
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

        {products.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground">No products match your filter.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  );
}
