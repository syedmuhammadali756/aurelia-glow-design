import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import editorialTexture from "@/assets/editorial-texture.jpg";
import routineLifestyle from "@/assets/routine-lifestyle.jpg";
import textureMacro from "@/assets/texture-macro.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Aurelia Glow" },
      { name: "description", content: "Aurelia Glow was born from a simple idea: a soft, considered glow should be effortless. Read the story behind our baked makeup ritual." },
      { property: "og:title", content: "Our Story — Aurelia Glow" },
      { property: "og:description", content: "Soft-coverage baked makeup, designed in small batches." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="A softer kind of glow"
        subtitle="Aurelia Glow began with a single, slow-baked formula and the belief that everyday makeup should feel light, considered and quietly beautiful."
      />

      <section className="container-luxe py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 aspect-[4/5] overflow-hidden bg-surface-warm">
            <img src={editorialTexture} alt="Aurelia Glow editorial" className="h-full w-full object-cover" />
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <div className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">Founded 2024</div>
            <h2 className="mt-4 display-serif text-4xl md:text-5xl text-espresso leading-[1.1]">
              Made for the everyday ritual
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Each compact is slow-baked over 24 hours, then hand-finished in small batches. The result: a soft-focus formula that
                feels like skin and layers like light.
              </p>
              <p>
                We believe in fewer, more considered objects. Six baked shades. One palette. One brush. A complete glow, distilled.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-warm/60 py-16 md:py-24">
        <div className="container-luxe grid md:grid-cols-3 gap-10">
          {[
            { title: "Slow-baked", body: "24-hour bake cycle in terracotta moulds for a soft-focus finish." },
            { title: "Small batch", body: "Hand-finished in small runs, with a hand-pressed seal on every compact." },
            { title: "Considered", body: "Six shades, one palette, one brush — designed to layer beautifully." },
          ].map((b) => (
            <div key={b.title}>
              <div className="display-serif text-3xl text-espresso">{b.title}</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-luxe py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 lg:order-2 aspect-[4/5] overflow-hidden bg-surface-warm">
            <img src={routineLifestyle} alt="Aurelia Glow routine" className="h-full w-full object-cover" />
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">Our values</div>
            <h2 className="mt-4 display-serif text-4xl md:text-5xl text-espresso leading-[1.1]">
              Less, but better.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Cruelty-free, dermatologically tested, and formulated without parabens, sulphates or synthetic fragrance. We make objects we
              want to keep on the dressing table for years.
            </p>
            <Link
              to="/products/$handle"
              params={{ handle: "signature-baked-glow-trio" }}
              className="mt-8 inline-flex link-underline text-[11px] tracking-[0.18em] uppercase"
            >
              Discover the kit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
