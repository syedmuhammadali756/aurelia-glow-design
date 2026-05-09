import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/LegalPage";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — Aurelia Glow" },
      { name: "description", content: "Shipping rates, delivery times, and our 30-day returns policy for Aurelia Glow." },
      { property: "og:title", content: "Shipping & Returns — Aurelia Glow" },
      { property: "og:description", content: "Free shipping over $50. 30-day returns on unopened products." },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Customer Care"
      title="Shipping & Returns"
      subtitle="Quietly considered logistics — so your ritual arrives intact and on time."
      sections={[
        { heading: "Shipping rates", body: [
          "Standard shipping is $4.95 within the US and $9.95 internationally. Orders over $50 ship complimentary.",
          "Express shipping is available at checkout from $14.95.",
        ]},
        { heading: "Delivery times", body: [
          "US standard: 3–5 business days. US express: 1–2 business days.",
          "International standard: 7–14 business days depending on destination.",
        ]},
        { heading: "Returns", body: [
          "Unopened products may be returned within 30 days of delivery for a full refund.",
          "Used items can be exchanged for store credit. We'll send a prepaid return label on request.",
        ]},
        { heading: "Damaged or missing items", body: [
          "If your order arrives damaged or incomplete, contact care@aureliaglow.com within 7 days and we'll resolve it right away.",
        ]},
      ]}
    />
  ),
});
