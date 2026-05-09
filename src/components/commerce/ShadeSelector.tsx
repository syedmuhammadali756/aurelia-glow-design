import type { Product, Variant } from "@/data/products";
import { ShadeSwatch } from "./ShadeSwatch";
import { SHADE_BY_NAME } from "@/data/shades";

export function ShadeSelector({
  product,
  value,
  onChange,
}: {
  product: Product;
  value: Variant;
  onChange: (v: Variant) => void;
}) {
  const isShade = product.options[0]?.name === "Shade";
  const undertone = isShade ? SHADE_BY_NAME[value.title]?.undertone : undefined;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <div className="text-[11px] tracking-[0.18em] uppercase text-rose-taupe">
          {product.options[0]?.name ?? "Variant"} · <span className="text-espresso">{value.title}</span>
          {undertone && <span className="text-muted-foreground"> · {undertone}</span>}
        </div>
        {isShade && (
          <a href="/shades" className="text-[11px] tracking-[0.18em] uppercase link-underline text-rose-taupe">
            Shade guide
          </a>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {product.variants.map((v) =>
          isShade ? (
            <ShadeSwatch
              key={v.id}
              shade={v.title}
              size="md"
              selected={v.id === value.id}
              unavailable={!v.available}
              onClick={() => v.available && onChange(v)}
            />
          ) : (
            <button
              key={v.id}
              type="button"
              onClick={() => v.available && onChange(v)}
              disabled={!v.available}
              className={`px-4 h-10 text-sm border transition-all ${
                v.id === value.id ? "border-espresso bg-espresso text-ivory" : "border-border hover:border-espresso"
              } ${!v.available ? "opacity-40" : ""}`}
            >
              {v.title}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
