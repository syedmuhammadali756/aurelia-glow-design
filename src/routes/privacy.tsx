import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Aurelia Glow" },
      { name: "description", content: "How Aurelia Glow collects, uses and protects your personal information." },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="A clear, plain-English summary of how we handle your information."
      sections={[
        { heading: "Information we collect", body: [
          "We collect the information you provide when placing an order or creating an account: name, email, shipping address and payment details.",
          "We also collect anonymous usage data (page views, device type) to improve the site experience.",
        ]},
        { heading: "How we use it", body: [
          "To process orders, send shipping updates, and respond to support requests.",
          "If you opt in, to send occasional product updates and offers. You can unsubscribe at any time.",
        ]},
        { heading: "Sharing", body: [
          "We never sell your data. We share only what's required with shipping carriers, payment processors and analytics providers operating under strict confidentiality.",
        ]},
        { heading: "Your rights", body: [
          "You can request access, correction or deletion of your data at any time by emailing privacy@aureliaglow.com.",
        ]},
      ]}
    />
  ),
});
