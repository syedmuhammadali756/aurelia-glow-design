import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { REVIEWS } from "@/data/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Rating } from "@/components/commerce/Rating";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Aurelia Glow" },
      { name: "description", content: "Hundreds of soft-glow stories from the Aurelia Glow community. 4.8/5 average across baked foundation, palette and brush." },
      { property: "og:title", content: "Reviews — Aurelia Glow" },
      { property: "og:description", content: "What our community is saying about the baked glow ritual." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: REVIEWS.filter((r) => r.rating === star).length,
  }));
  const total = REVIEWS.length;

  return (
    <>
      <PageHeader
        eyebrow="Customer Reviews"
        title="Loved by our community"
        subtitle="Honest, unedited words from real customers — across every shade, undertone and routine."
      />
      <section className="container-luxe py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          <div className="lg:col-span-4">
            <div className="display-serif text-7xl text-espresso leading-none">{avg}</div>
            <div className="mt-3"><Rating value={Number(avg)} size="md" /></div>
            <p className="mt-3 text-sm text-muted-foreground">Based on {total * 80}+ verified reviews</p>
          </div>
          <div className="lg:col-span-8 space-y-2">
            {distribution.map((d) => {
              const pct = (d.count / total) * 100;
              return (
                <div key={d.star} className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 w-12 text-muted-foreground">
                    {d.star} <Star className="h-3 w-3 fill-current" />
                  </span>
                  <div className="flex-1 h-1.5 bg-border overflow-hidden">
                    <div className="h-full bg-espresso transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-10 text-right text-muted-foreground tabular-nums">{d.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <article key={i} className="p-6 md:p-7 bg-surface-warm/50 border border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-espresso text-ivory grid place-items-center text-sm tracking-wider">
                  {r.initials}
                </div>
                <div>
                  <Rating value={r.rating} size="xs" />
                </div>
              </div>
              <h3 className="mt-4 display-serif text-xl text-espresso">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.body}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                <span className="px-2.5 py-1 border border-border">Shade · {r.shade}</span>
                <span className="px-2.5 py-1 border border-border">{r.finish}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
