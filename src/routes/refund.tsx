import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/LegalPage";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Aurelia Glow" },
      { name: "description", content: "Our 30-day refund policy and how to request one." },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Refund Policy"
      subtitle="If something isn't right, we make it right."
      sections={[
        { heading: "30-day window", body: [
          "Unopened products may be returned within 30 days of delivery for a full refund to the original payment method.",
        ]},
        { heading: "How to request a refund", body: [
          "Email care@aureliaglow.com with your order number. We'll send a prepaid return label and confirm the refund within 5 business days of receiving the return.",
        ]},
        { heading: "Used items", body: [
          "Opened or used items can be exchanged for store credit, valid for 12 months.",
        ]},
      ]}
    />
  ),
});
