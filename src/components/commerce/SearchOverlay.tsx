import { useEffect, useState } from "react";
import { X, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useUIStore } from "@/store/ui";
import { PRODUCTS, formatPrice } from "@/data/products";

const TRENDING = ["glow kit", "baked foundation", "shade guide", "brush", "finishing powder"];

export function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!isSearchOpen) return;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => e.key === "Escape" && closeSearch();
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", k);
    };
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const results = q
    ? PRODUCTS.filter((p) => (p.title + " " + p.subtitle + " " + p.tags.join(" ")).toLowerCase().includes(q.toLowerCase()))
    : [];
  const popular = PRODUCTS.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-ivory/95 backdrop-blur-md animate-fade-in" style={{ animationDuration: "220ms" }}>
      <div className="container-luxe py-6">
        <div className="flex items-center gap-4 border-b border-border pb-4">
          <Search className="h-5 w-5 text-rose-taupe" strokeWidth={1.5} />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Aurelia Glow…"
            className="flex-1 bg-transparent text-2xl md:text-3xl display-serif focus:outline-none placeholder:text-muted-foreground"
          />
          <button onClick={closeSearch} aria-label="Close search" className="p-2"><X className="h-5 w-5" /></button>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 mt-10">
          <div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-rose-taupe mb-4">Trending</div>
            <ul className="space-y-2.5">
              {TRENDING.map((t) => (
                <li key={t}>
                  <button
                    onClick={() => setQ(t)}
                    className="text-base hover:text-rose-taupe transition-colors link-underline"
                  >
                    {t}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-rose-taupe mb-4">
              {q ? (results.length ? `${results.length} results` : "No matches found") : "Popular products"}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(q && results.length ? results : popular).slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  to="/products/$handle"
                  params={{ handle: p.handle }}
                  onClick={closeSearch}
                  className="group block"
                >
                  <div className="aspect-[4/5] bg-surface-warm overflow-hidden">
                    <img src={p.images[0].src} alt={p.images[0].alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div className="mt-2">
                    <div className="text-sm">{p.title}</div>
                    <div className="text-xs text-muted-foreground">{formatPrice(p.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
            {q && !results.length && (
              <p className="text-sm text-muted-foreground mt-6">
                Try one of the trending searches, or <Link to="/shop" onClick={closeSearch} className="link-underline">browse all products</Link>.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
