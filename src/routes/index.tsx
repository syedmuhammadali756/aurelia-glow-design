import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Layers, Palette, Brush, ArrowRight, Check } from "lucide-react";
import heroKit from "@/assets/hero-glow-kit.jpg";
import editorialTexture from "@/assets/editorial-texture.jpg";
import routineLifestyle from "@/assets/routine-lifestyle.jpg";
import textureMacro from "@/assets/texture-macro.jpg";
import bundleVisual from "@/assets/bundle-builder-visual.jpg";
import newsletterSoft from "@/assets/newsletter-soft.jpg";
import { PRODUCTS, HERO_PRODUCT, formatPrice } from "@/data/products";
import { SHADES } from "@/data/shades";
import { VALUE_POINTS, STORY_POINTS, ROUTINE_STEPS, COMPARISON_ROWS, FAQS, REVIEWS } from "@/data/site";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ShadeSwatch } from "@/components/commerce/ShadeSwatch";
import { Rating } from "@/components/commerce/Rating";
import { PriceDisplay } from "@/components/commerce/PriceDisplay";
import { useReveal } from "@/hooks/use-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurelia Glow — Your complete glow routine, simplified" },
      { name: "description", content: "Soft-coverage baked makeup, six harmonised shades, and a hand-finished brush. The complete Aurelia Glow ritual in one elegant compact." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <HeroMiniBar />
      <ValueStrip />
      <FeaturedProduct />
      <ShadeFinder />
      <CollectionPreview />
      <BundleBuilder />
      <ScrollStory />
      <EditorialTexture />
      <RoutineTimeline />
      <Comparison />
      <ReviewsCarousel />
      <FAQSection />
      <Newsletter />
    </>
  );
}

/* ─────────────── Hero ─────────────── */
function Hero() {
  return (
    <section className="relative -mt-16 md:-mt-20 min-h-[88vh] md:min-h-[92vh] overflow-hidden bg-surface-warm">
      <div className="absolute inset-0">
        <img
          src={heroKit}
          alt="Aurelia Glow editorial composition"
          className="h-full w-full object-cover animate-[reveal_900ms_cubic-bezier(0.22,1,0.36,1)_both]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/85 via-ivory/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/70 via-transparent to-transparent" />
      </div>

      <div className="container-luxe relative pt-32 md:pt-40 pb-20">
        <div className="max-w-xl">
          <span className="eyebrow">The Glow Edit</span>
          <h1 className="display-serif text-[44px] sm:text-[64px] lg:text-[80px] leading-[1.02] mt-4">
            Your complete glow routine, <em className="text-rose-taupe">simplified.</em>
          </h1>
          <p className="mt-6 text-base md:text-lg text-foreground/75 max-w-md">
            A baked makeup ritual designed for effortless radiance — soft coverage, harmonised tones, and a brush that quietly does the work.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="solid" size="lg" shape="sharp" asChild>
              <Link to="/products/$handle" params={{ handle: HERO_PRODUCT.handle }}>Shop the kit</Link>
            </Button>
            <Button variant="outline-luxe" size="lg" shape="sharp" asChild>
              <Link to="/shades">Find your shade</Link>
            </Button>
          </div>

          <p className="mt-8 text-[11px] tracking-[0.18em] uppercase text-rose-taupe">
            Free shipping over $50 · Easy returns · Shade match guarantee
          </p>
        </div>

        {/* Floating product card */}
        <div className="hidden md:block absolute right-12 lg:right-20 top-1/2 -translate-y-1/2 w-[280px] animate-float">
          <div className="bg-ivory shadow-[var(--shadow-card)] p-5">
            <div className="aspect-square overflow-hidden bg-surface-warm">
              <img src={HERO_PRODUCT.images[0].src} alt={HERO_PRODUCT.title} className="h-full w-full object-cover" />
            </div>
            <div className="mt-4">
              <div className="text-xs tracking-[0.14em] uppercase text-rose-taupe">Bestseller</div>
              <h3 className="display-serif text-xl mt-1">{HERO_PRODUCT.title}</h3>
              <div className="mt-2 flex items-center justify-between">
                <PriceDisplay price={HERO_PRODUCT.price} compareAt={HERO_PRODUCT.compareAtPrice} />
                <Rating value={HERO_PRODUCT.rating} size="xs" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Hero Mini Bar ─────────────── */
function HeroMiniBar() {
  return (
    <div className="bg-ivory border-y border-border">
      <div className="container-luxe py-4 flex items-center gap-4 overflow-x-auto no-scrollbar">
        <div className="h-12 w-12 bg-surface-warm flex-shrink-0 overflow-hidden">
          <img src={HERO_PRODUCT.images[0].src} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{HERO_PRODUCT.title}</div>
          <div className="text-xs text-muted-foreground">6 shades · {formatPrice(HERO_PRODUCT.price)}</div>
        </div>
        <Button variant="solid" size="sm" shape="sharp" asChild>
          <Link to="/products/$handle" params={{ handle: HERO_PRODUCT.handle }}>Shop now</Link>
        </Button>
      </div>
    </div>
  );
}

/* ─────────────── Value Strip ─────────────── */
function ValueStrip() {
  const icons = [Sparkles, Layers, Palette, Brush];
  return (
    <section className="bg-ivory border-b border-border">
      <div className="container-luxe grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
        {VALUE_POINTS.map((v, i) => {
          const Icon = icons[i];
          return (
            <div key={v.title} className="px-4 md:px-8 py-8 text-center">
              <Icon className="h-5 w-5 mx-auto text-rose-taupe" strokeWidth={1.25} />
              <div className="mt-3 text-sm font-medium tracking-wide">{v.title}</div>
              <div className="mt-1 text-xs text-muted-foreground hidden md:block">{v.desc}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────── Featured Product ─────────────── */
function FeaturedProduct() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section-pad">
      <div className="container-luxe">
        <div ref={ref} className="reveal grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="aspect-[4/5] bg-surface-warm overflow-hidden">
            <img src={HERO_PRODUCT.images[0].src} alt={HERO_PRODUCT.title} className="h-full w-full object-cover hover:scale-[1.03] transition-transform duration-700" />
          </div>
          <div>
            <span className="eyebrow">Featured</span>
            <h2 className="display-serif text-4xl md:text-5xl mt-3">{HERO_PRODUCT.title}</h2>
            <div className="mt-3 flex items-center gap-4">
              <Rating value={HERO_PRODUCT.rating} count={HERO_PRODUCT.reviewCount} />
            </div>
            <div className="mt-4">
              <PriceDisplay price={HERO_PRODUCT.price} compareAt={HERO_PRODUCT.compareAtPrice} size="lg" />
            </div>
            <p className="mt-5 text-foreground/80 leading-relaxed">{HERO_PRODUCT.description}</p>

            <div className="mt-6">
              <div className="text-[11px] tracking-[0.18em] uppercase text-rose-taupe mb-3">Available in 6 shades</div>
              <div className="flex flex-wrap gap-3">
                {SHADES.map((s) => <ShadeSwatch key={s.name} shade={s.name} size="md" />)}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="solid" size="lg" shape="sharp" asChild>
                <Link to="/products/$handle" params={{ handle: HERO_PRODUCT.handle }}>Shop the kit</Link>
              </Button>
              <Button variant="outline-luxe" size="lg" shape="sharp" asChild>
                <Link to="/shades">Find your shade</Link>
              </Button>
            </div>

            <Accordion type="single" collapsible className="mt-10">
              <AccordionItem value="i1">
                <AccordionTrigger className="text-[11px] tracking-[0.18em] uppercase">What's Included</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1.5 text-sm">
                    {HERO_PRODUCT.includes?.map((x) => (
                      <li key={x} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-gold" /> {x}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="i2">
                <AccordionTrigger className="text-[11px] tracking-[0.18em] uppercase">How To Use</AccordionTrigger>
                <AccordionContent>
                  <ol className="space-y-2 text-sm list-decimal pl-4">
                    {HERO_PRODUCT.howToUse.map((x, i) => <li key={i}>{x}</li>)}
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="i3">
                <AccordionTrigger className="text-[11px] tracking-[0.18em] uppercase">Shipping & Returns</AccordionTrigger>
                <AccordionContent className="text-sm text-foreground/80">
                  Complimentary shipping over $50. 30-day easy returns on unopened items.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Shade Finder ─────────────── */
function ShadeFinder() {
  const [selected, setSelected] = useState(SHADES[2].name);
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-surface-soft section-pad">
      <div className="container-luxe">
        <div ref={ref} className="reveal max-w-2xl">
          <span className="eyebrow">Shade Finder</span>
          <h2 className="display-serif text-4xl md:text-5xl mt-3">Six shades, calibrated for you.</h2>
          <p className="mt-4 text-foreground/75">Tap a shade to see its undertone. Between two? We recommend the lighter, then warming with the palette.</p>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SHADES.map((s) => (
            <button
              key={s.name}
              onClick={() => setSelected(s.name)}
              className={`group bg-ivory p-5 text-left card-lift border ${selected === s.name ? "border-espresso" : "border-transparent"}`}
            >
              <div className="flex justify-center">
                <ShadeSwatch shade={s.name} size="lg" selected={selected === s.name} />
              </div>
              <div className="mt-4 text-center">
                <div className="text-sm font-medium">{s.name}</div>
                <div className="text-[11px] tracking-[0.18em] uppercase text-rose-taupe mt-1">{s.undertone}</div>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{s.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <Button variant="solid" size="lg" shape="sharp" asChild>
            <Link to="/shades">Find my shade</Link>
          </Button>
          <Link to="/shades" className="text-[11px] tracking-[0.18em] uppercase link-underline">Compare shades →</Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Collection Preview ─────────────── */
function CollectionPreview() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section-pad">
      <div className="container-luxe">
        <div ref={ref} className="reveal flex items-end justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow">The Edit</span>
            <h2 className="display-serif text-4xl md:text-5xl mt-3">Complete your glow set.</h2>
          </div>
          <Link to="/shop" className="text-[11px] tracking-[0.18em] uppercase link-underline hidden md:inline-flex items-center gap-2">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Bundle Builder ─────────────── */
function BundleBuilder() {
  const foundation = PRODUCTS.find((p) => p.handle === "baked-balance-foundation")!;
  const palette = PRODUCTS.find((p) => p.handle === "soft-radiance-face-palette")!;
  const brush = PRODUCTS.find((p) => p.handle === "angled-kabuki-brush")!;
  const powder = PRODUCTS.find((p) => p.handle === "finishing-glow-powder")!;
  const items = [foundation, palette, brush, powder];
  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const bundlePrice = subtotal * 0.85;

  return (
    <section className="bg-surface-warm section-pad">
      <div className="container-luxe">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
          <div className="aspect-[4/5] overflow-hidden">
            <img src={bundleVisual} alt="Build your glow set" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="eyebrow">Build your set</span>
            <h2 className="display-serif text-4xl md:text-5xl mt-3">Compose a ritual that feels yours.</h2>
            <p className="mt-4 text-foreground/75 max-w-md">
              Combine our four signature pieces into a personal glow set. Save 15% when you build the bundle.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {items.map((p, i) => (
                <div key={p.id} className="bg-ivory p-4 flex gap-3 items-center border border-border">
                  <div className="text-[11px] tracking-[0.18em] uppercase text-rose-taupe w-6">0{i + 1}</div>
                  <div className="h-12 w-12 bg-surface-warm overflow-hidden">
                    <img src={p.images[0].src} alt={p.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{p.title}</div>
                    <div className="text-xs text-muted-foreground">{formatPrice(p.price)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-ivory border border-border p-6 flex items-center justify-between">
              <div>
                <div className="text-[11px] tracking-[0.18em] uppercase text-rose-taupe">Bundle subtotal</div>
                <div className="display-serif text-3xl mt-1">{formatPrice(bundlePrice)}</div>
                <div className="text-xs text-muted-foreground line-through">{formatPrice(subtotal)}</div>
              </div>
              <Button variant="solid" size="lg" shape="sharp" asChild>
                <Link to="/bundle">Open bundle builder</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Scroll Story ─────────────── */
function ScrollStory() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section-pad">
      <div className="container-luxe">
        <div ref={ref} className="reveal grid lg:grid-cols-2 gap-12 items-start">
          <div className="lg:sticky lg:top-32 aspect-[4/5] overflow-hidden bg-surface-warm">
            <img src={routineLifestyle} alt="A morning makeup ritual" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-16 lg:py-12">
            {STORY_POINTS.map((p, i) => (
              <div key={p.title}>
                <div className="text-[11px] tracking-[0.22em] uppercase text-rose-taupe">0{i + 1} / 0{STORY_POINTS.length}</div>
                <h3 className="display-serif text-3xl md:text-4xl mt-3">{p.title}</h3>
                <p className="mt-3 text-foreground/75 max-w-md">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Editorial Texture ─────────────── */
function EditorialTexture() {
  return (
    <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
      <img src={editorialTexture} alt="Macro powder texture" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-espresso/25" />
      <div className="relative h-full grid place-items-center text-center px-6">
        <div className="max-w-2xl">
          <span className="text-[11px] tracking-[0.22em] uppercase text-ivory/85">Texture · Finish</span>
          <h2 className="display-serif text-4xl md:text-6xl text-ivory mt-4 leading-[1.05]">
            Soft-focus finish. <em>Buildable glow.</em> Everyday polish.
          </h2>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Routine Timeline ─────────────── */
function RoutineTimeline() {
  return (
    <section className="bg-surface-soft section-pad">
      <div className="container-luxe">
        <div className="text-center max-w-xl mx-auto">
          <span className="eyebrow">The Routine</span>
          <h2 className="display-serif text-4xl md:text-5xl mt-3">Four steps. Three minutes.</h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-12 left-12 right-12 h-px bg-border" />
          {ROUTINE_STEPS.map((step) => (
            <div key={step.step} className="bg-ivory p-6 relative card-lift border border-border">
              <div className="display-serif text-5xl text-champagne leading-none">{step.step}</div>
              <h3 className="mt-4 text-base font-medium tracking-wide">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Comparison ─────────────── */
function Comparison() {
  return (
    <section className="section-pad">
      <div className="container-editorial">
        <div className="text-center max-w-xl mx-auto">
          <span className="eyebrow">Why a Kit</span>
          <h2 className="display-serif text-4xl md:text-5xl mt-3">Why choose a full-face kit?</h2>
        </div>

        <div className="mt-12 border border-border bg-ivory">
          <div className="grid grid-cols-3 border-b border-border">
            <div className="p-5 text-[11px] tracking-[0.18em] uppercase text-rose-taupe">Feature</div>
            <div className="p-5 text-[11px] tracking-[0.18em] uppercase bg-surface-warm">Aurelia Glow Kit</div>
            <div className="p-5 text-[11px] tracking-[0.18em] uppercase">Buying separately</div>
          </div>
          {COMPARISON_ROWS.map((row, i) => (
            <div key={i} className="grid grid-cols-3 border-b border-border last:border-b-0 text-sm">
              <div className="p-5">{row.label}</div>
              <div className="p-5 bg-surface-warm">
                {typeof row.kit === "boolean" ? (row.kit ? <Check className="h-4 w-4 text-gold" /> : "—") : <span className="font-medium">{row.kit}</span>}
              </div>
              <div className="p-5 text-muted-foreground">
                {typeof row.separate === "boolean" ? (row.separate ? <Check className="h-4 w-4 text-gold" /> : "—") : row.separate}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Reviews ─────────────── */
function ReviewsCarousel() {
  return (
    <section className="bg-surface-warm section-pad">
      <div className="container-luxe">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="eyebrow">Demo reviews</span>
            <h2 className="display-serif text-4xl md:text-5xl mt-3">Loved in routine.</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 6).map((r, i) => (
            <article key={i} className="bg-ivory p-7 border border-border">
              <Rating value={r.rating} />
              <h3 className="display-serif text-xl mt-3">{r.title}</h3>
              <p className="mt-3 text-sm text-foreground/80 leading-relaxed">"{r.body}"</p>
              <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                <div className="h-9 w-9 rounded-full bg-champagne grid place-items-center display-serif text-sm">{r.initials}</div>
                <div>
                  <div className="text-espresso">{r.shade}</div>
                  <div className="text-[11px] tracking-[0.18em] uppercase">{r.finish}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── FAQ ─────────────── */
function FAQSection() {
  return (
    <section className="section-pad">
      <div className="container-editorial">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="eyebrow">FAQ</span>
          <h2 className="display-serif text-4xl md:text-5xl mt-3">Frequently asked.</h2>
        </div>
        <Accordion type="single" collapsible>
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-foreground/80">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ─────────────── Newsletter ─────────────── */
function Newsletter() {
  return (
    <section className="section-pad bg-surface-soft">
      <div className="container-luxe">
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-ivory border border-border">
          <div className="aspect-[4/5] lg:aspect-auto lg:h-full overflow-hidden">
            <img src={newsletterSoft} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="p-8 md:p-14">
            <span className="eyebrow">The Glow List</span>
            <h2 className="display-serif text-4xl md:text-5xl mt-3">Thoughtful glow notes — straight to your inbox.</h2>
            <p className="mt-4 text-foreground/75">Early access to drops, shade tips, and unhurried routine ideas.</p>
            <form className="mt-8 flex border border-border" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none"
              />
              <button className="px-6 text-[11px] tracking-[0.18em] uppercase border-l border-border bg-espresso text-ivory">
                Sign up
              </button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
