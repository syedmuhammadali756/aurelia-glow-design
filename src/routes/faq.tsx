import { createFileRoute, Link } from "@tanstack/react-router";
import { FAQS } from "@/data/site";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Aurelia Glow" },
      { name: "description", content: "Answers to the most common questions about Aurelia Glow products, shipping, returns and shade matching." },
      { property: "og:title", content: "FAQ — Aurelia Glow" },
      { property: "og:description", content: "Everything you need to know about the baked glow ritual." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Frequently asked"
        subtitle="A few of the questions we hear most. Can't find what you're looking for? Our team is always close by."
      />
      <section className="container-luxe py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="border-y border-border">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border last:border-b-0">
                <AccordionTrigger className="text-left text-base md:text-lg font-medium text-espresso py-6 hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 p-8 md:p-10 bg-surface-warm/60 border border-border text-center">
            <h3 className="display-serif text-2xl md:text-3xl text-espresso">Still have a question?</h3>
            <p className="mt-2 text-sm text-muted-foreground">We typically reply within one business day.</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex link-underline text-[11px] tracking-[0.18em] uppercase"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
