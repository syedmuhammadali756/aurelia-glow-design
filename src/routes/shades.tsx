import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SHADES } from "@/data/shades";
import { PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/utils";
import shadeSwatches from "@/assets/shade-swatches.jpg";

export const Route = createFileRoute("/shades")({
  head: () => ({
    meta: [
      { title: "Shade Guide — Aurelia Glow" },
      { name: "description", content: "Find your perfect baked foundation shade across six harmonised tones, calibrated for cool, neutral and warm undertones." },
      { property: "og:title", content: "Shade Guide — Aurelia Glow" },
      { property: "og:description", content: "Six harmonised baked shades for cool, neutral and warm undertones." },
    ],
  }),
  component: ShadesPage,
});

function ShadesPage() {
  const [tone, setTone] = useState<"All" | "Cool" | "Neutral" | "Warm">("All");
  const filtered = tone === "All" ? SHADES : SHADES.filter((s) => s.undertone === tone);

  return (
    <>
      <PageHeader
        eyebrow="Shade Guide"
        title="Find your shade"
        subtitle="Six baked shades, hand-calibrated across cool, neutral and warm undertones to flatter the widest range of skin."
      />
      <section className="container-luxe py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-surface-warm">
              <img src={shadeSwatches} alt="Aurelia Glow shade swatches" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="flex gap-2 mb-8">
              {(["All", "Cool", "Neutral", "Warm"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={cn(
                    "px-4 h-9 text-[11px] tracking-[0.18em] uppercase border transition-colors",
                    tone === t ? "bg-espresso text-ivory border-espresso" : "border-border hover:border-espresso",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="divide-y divide-border border-y border-border">
              {filtered.map((s) => (
                <div key={s.name} className="py-6 flex items-center gap-6">
                  <div
                    className="h-16 w-16 rounded-full shadow-soft flex-shrink-0 ring-1 ring-border"
                    style={{ background: s.hex }}
                    aria-hidden
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-4 flex-wrap">
                      <h3 className="display-serif text-2xl text-espresso">{s.name}</h3>
                      <span className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">{s.undertone} undertone</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-surface-warm/60 border border-border">
              <h3 className="display-serif text-2xl text-espresso">Between two shades?</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md">
                We recommend the lighter shade and warming with the palette. The baked finish blends seamlessly across half-tones.
              </p>
              <Link
                to="/products/$handle"
                params={{ handle: "signature-baked-glow-trio" }}
                className="mt-5 inline-flex link-underline text-[11px] tracking-[0.18em] uppercase"
              >
                Shop the Glow Kit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
