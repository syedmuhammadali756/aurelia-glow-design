import { useEffect } from "react";
import { X, ShoppingBag, Plus, Minus, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/products";
import { SITE } from "@/data/site";

export function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const updateQty = useCartStore((s) => s.updateQty);
  const remove = useCartStore((s) => s.remove);
  const checkoutUrl = useCartStore((s) => s.checkoutUrl);
  const isLoading = useCartStore((s) => s.isLoading);
  const isSyncing = useCartStore((s) => s.isSyncing);
  const syncCart = useCartStore((s) => s.syncCart);

  useEffect(() => {
    if (!isCartOpen) return;
    syncCart();
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", k);
    };
  }, [isCartOpen, closeCart, syncCart]);

  const handleCheckout = () => {
    if (!checkoutUrl) return;
    window.open(checkoutUrl, "_blank");
    closeCart();
  };

  if (!isCartOpen) return null;

  const threshold = SITE.freeShippingThreshold;
  const progress = Math.min(100, (subtotal / threshold) * 100);
  const remaining = Math.max(0, threshold - subtotal);
  const recommended = PRODUCTS.find((p) => !items.some((i) => i.productId === p.id)) ?? PRODUCTS[3];

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-espresso/40 animate-fade-in" onClick={closeCart} style={{ animationDuration: "200ms" }} />
      <aside
        className="absolute right-0 top-0 h-full w-full sm:w-[440px] bg-ivory shadow-[var(--shadow-elevated)] flex flex-col"
        style={{ animation: "fade-in 300ms ease-out, slide-in 300ms cubic-bezier(0.22,1,0.36,1)" }}
      >
        <header className="flex items-center justify-between px-6 h-16 border-b border-border">
          <h2 className="display-serif text-xl">Your Cart {items.length > 0 && <span className="text-rose-taupe">({items.length})</span>}</h2>
          <button onClick={closeCart} aria-label="Close cart" className="p-2 -mr-2"><X className="h-5 w-5" /></button>
        </header>

        {/* Free shipping bar */}
        <div className="px-6 py-4 bg-surface-warm border-b border-border">
          <div className="flex items-baseline justify-between text-xs tracking-[0.12em] uppercase text-rose-taupe mb-2">
            <span>{remaining > 0 ? `${formatPrice(remaining)} from free shipping` : "Free shipping unlocked ✓"}</span>
            <span className="text-espresso">{progress.toFixed(0)}%</span>
          </div>
          <div className="h-1 bg-border overflow-hidden">
            <div className="h-full bg-champagne transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 grid place-items-center px-8 text-center">
            <div>
              <div className="h-16 w-16 mx-auto rounded-full bg-surface-warm grid place-items-center mb-6">
                <ShoppingBag className="h-6 w-6 text-rose-taupe" strokeWidth={1.5} />
              </div>
              <h3 className="display-serif text-2xl mb-2">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mb-6">Begin with the Signature Glow Trio.</p>
              <Button variant="solid" size="lg" shape="sharp" onClick={closeCart} asChild>
                <Link to="/shop">Shop the kit</Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-border">
              {items.map((i) => (
                <li key={i.key} className="px-6 py-5 flex gap-4">
                  <div className="h-24 w-20 bg-surface-warm overflow-hidden flex-shrink-0">
                    <img src={i.image} alt={i.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex justify-between gap-2">
                      <h3 className="text-sm font-medium truncate">{i.title}</h3>
                      <span className="text-sm">{formatPrice(i.price * i.qty)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{i.variantTitle}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center border border-border">
                        <button onClick={() => updateQty(i.key, i.qty - 1)} className="h-8 w-8 grid place-items-center" aria-label="Decrease"><Minus className="h-3 w-3" /></button>
                        <span className="h-8 w-8 grid place-items-center text-xs">{i.qty}</span>
                        <button onClick={() => updateQty(i.key, i.qty + 1)} className="h-8 w-8 grid place-items-center" aria-label="Increase"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button onClick={() => remove(i.key)} className="text-[11px] tracking-[0.18em] uppercase text-rose-taupe link-underline">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
              {/* Recommended */}
              <li className="px-6 py-5 bg-surface-soft">
                <div className="text-[11px] tracking-[0.18em] uppercase text-rose-taupe mb-3">Pairs well with</div>
                <div className="flex gap-4">
                  <div className="h-20 w-16 bg-surface-warm overflow-hidden">
                    <img src={recommended.images[0].src} alt={recommended.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="text-sm font-medium">{recommended.title}</p>
                    <p className="text-xs text-muted-foreground mb-2">{formatPrice(recommended.price)}</p>
                    <Link
                      to="/products/$handle"
                      params={{ handle: recommended.handle }}
                      onClick={closeCart}
                      className="text-[11px] tracking-[0.18em] uppercase link-underline self-start"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </li>
            </ul>

            <footer className="border-t border-border px-6 py-5 space-y-4">
              <details className="text-xs">
                <summary className="cursor-pointer text-[11px] tracking-[0.18em] uppercase text-rose-taupe link-underline inline-block">
                  Add discount code
                </summary>
                <div className="mt-3 flex border border-border">
                  <input className="flex-1 px-3 py-2 text-sm bg-transparent focus:outline-none" placeholder="Code" />
                  <button className="px-4 text-[11px] tracking-[0.18em] uppercase border-l border-border">Apply</button>
                </div>
              </details>
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] tracking-[0.18em] uppercase text-rose-taupe">Subtotal</span>
                <span className="display-serif text-2xl">{formatPrice(subtotal)}</span>
              </div>
              <Button variant="solid" size="lg" shape="sharp" className="w-full">Checkout</Button>
              <button onClick={closeCart} className="w-full text-center text-[11px] tracking-[0.18em] uppercase link-underline">Continue shopping</button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
