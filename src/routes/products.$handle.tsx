import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Truck, RotateCcw, ShieldCheck, ChevronRight } from "lucide-react";
import { PRODUCT_BY_HANDLE, PRODUCTS, formatPrice, type Product, type Variant } from "@/data/products";
import { FAQS } from "@/data/site";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { PriceDisplay } from "@/components/commerce/PriceDisplay";
import { Rating } from "@/components/commerce/Rating";
import { Badge } from "@/components/commerce/Badge";
import { ShadeSelector } from "@/components/commerce/ShadeSelector";
import { QuantityStepper } from "@/components/commerce/QuantityStepper";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";

export const Route = createFileRoute("/products/$handle")({
  loader: ({ params }) => {
    const product = PRODUCT_BY_HANDLE[params.handle];
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.title} — Aurelia Glow` },
      { name: "description", content: loaderData?.product.description },
      { property: "og:title", content: loaderData?.product.title },
      { property: "og:description", content: loaderData?.product.description },
      { property: "og:image", content: loaderData?.product.images[0].src },
    ],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-luxe py-32 text-center">
      <h1 className="display-serif text-4xl">Product not found</h1>
      <Link to="/shop" className="mt-6 inline-block link-underline text-[11px] tracking-[0.18em] uppercase">Back to shop</Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const [variant, setVariant] = useState<Variant>(product.variants.find((v: Variant) => v.available) ?? product.variants[0]);
  const [qty, setQty] = useState(1);
  const [stickyVisible, setStickyVisible] = useState(false);
  const add = useCartStore((s) => s.add);
  const openCart = useUIStore((s) => s.openCart);

  useEffect(() => {
    setVariant(product.variants.find((v: Variant) => v.available) ?? product.variants[0]);
    setQty(1);
  }, [product.handle]);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const addToCart = () => {
    add(
      {
        productId: product.id,
        productHandle: product.handle,
        variantId: variant.id,
        title: product.title,
        variantTitle: variant.title,
        price: variant.price,
        image: variant.image ?? product.images[0].src,
      },
      qty,
    );
    setTimeout(openCart, 150);
  };

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container-luxe pt-8">
        <nav className="flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
          <Link to="/" className="hover:text-espresso">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-espresso">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-espresso">{product.title}</span>
        </nav>
      </div>

      {/* Top section */}
      <section className="container-luxe py-10 lg:py-16">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery images={product.images} eager />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {product.badges?.map((b: string) => <Badge key={b} kind={b as any} />)}
            </div>
            <span className="eyebrow">{product.productType}</span>
            <h1 className="display-serif text-4xl md:text-5xl mt-2">{product.title}</h1>
            <p className="text-muted-foreground mt-2">{product.subtitle}</p>
            <div className="mt-4">
              <Rating value={product.rating} count={product.reviewCount} />
            </div>
            <div className="mt-6">
              <PriceDisplay price={variant.price} compareAt={product.compareAtPrice} size="lg" />
            </div>
            <p className="mt-6 text-foreground/80 leading-relaxed">{product.description}</p>

            {product.variants.length > 1 && (
              <div className="mt-8">
                <ShadeSelector product={product} value={variant} onChange={setVariant} />
              </div>
            )}

            <div className="mt-8 flex items-center gap-3">
              <QuantityStepper value={qty} onChange={setQty} />
              <Button
                variant="solid"
                size="lg"
                shape="sharp"
                disabled={!variant.available}
                onClick={addToCart}
                className="flex-1"
              >
                {variant.available ? "Add to Cart" : "Notify me"}
              </Button>
            </div>
            <Button variant="outline-luxe" size="lg" shape="sharp" className="w-full mt-3" disabled={!variant.available}>
              Buy Now
            </Button>

            <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Truck className="h-4 w-4" strokeWidth={1.5} /> Free over $50</div>
              <div className="flex items-center gap-2"><RotateCcw className="h-4 w-4" strokeWidth={1.5} /> 30-day returns</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" strokeWidth={1.5} /> Secure checkout</div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {["Visa", "Mastercard", "Amex", "Apple Pay", "PayPal"].map((p) => (
                <span key={p} className="px-2 py-1 text-[10px] tracking-[0.14em] uppercase border border-border text-muted-foreground">
                  {p}
                </span>
              ))}
            </div>

            <Accordion type="single" collapsible className="mt-10">
              {product.includes && (
                <AccordionItem value="i1">
                  <AccordionTrigger className="text-[11px] tracking-[0.18em] uppercase">What's Included</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1.5 text-sm">
                      {product.includes.map((x: string) => (
                        <li key={x} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-gold" /> {x}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
              <AccordionItem value="i2">
                <AccordionTrigger className="text-[11px] tracking-[0.18em] uppercase">How To Use</AccordionTrigger>
                <AccordionContent>
                  <ol className="space-y-2 text-sm list-decimal pl-4">
                    {product.howToUse.map((x: string, i: number) => <li key={i}>{x}</li>)}
                  </ol>
                </AccordionContent>
              </AccordionItem>
              {product.options[0]?.name === "Shade" && (
                <AccordionItem value="i3">
                  <AccordionTrigger className="text-[11px] tracking-[0.18em] uppercase">Shade Guide</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    Six shades calibrated to cool, neutral and warm undertones. <Link to="/shades" className="link-underline">Open the full shade guide →</Link>
                  </AccordionContent>
                </AccordionItem>
              )}
              {product.ingredients && (
                <AccordionItem value="i4">
                  <AccordionTrigger className="text-[11px] tracking-[0.18em] uppercase">Ingredients</AccordionTrigger>
                  <AccordionContent className="text-xs text-foreground/75 leading-relaxed">{product.ingredients}</AccordionContent>
                </AccordionItem>
              )}
              <AccordionItem value="i5">
                <AccordionTrigger className="text-[11px] tracking-[0.18em] uppercase">Shipping & Returns</AccordionTrigger>
                <AccordionContent className="text-sm">Complimentary shipping over $50. 30-day easy returns on unopened items.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-surface-soft section-pad">
        <div className="container-luxe">
          <h2 className="display-serif text-3xl md:text-4xl mb-10">You may also love</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Product FAQ */}
      <section className="section-pad">
        <div className="container-editorial">
          <h2 className="display-serif text-3xl md:text-4xl mb-8 text-center">Common questions</h2>
          <Accordion type="single" collapsible>
            {FAQS.slice(0, 4).map((f, i) => (
              <AccordionItem key={i} value={`pf${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-foreground/80">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Sticky add-to-cart */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 bg-ivory border-t border-border transition-transform duration-300 ${
          stickyVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container-luxe py-3 flex items-center gap-4">
          <div className="h-12 w-12 bg-surface-warm overflow-hidden flex-shrink-0">
            <img src={variant.image ?? product.images[0].src} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{product.title}</div>
            <div className="text-xs text-muted-foreground">{variant.title} · {formatPrice(variant.price)}</div>
          </div>
          <Button variant="solid" size="default" shape="sharp" onClick={addToCart} disabled={!variant.available}>
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
}
