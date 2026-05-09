import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Aurelia Glow" },
      { name: "description", content: "The terms and conditions that apply when you use the Aurelia Glow website." },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      sections={[
        { heading: "Use of the site", body: [
          "By accessing aureliaglow.com you agree to these terms. We may update them from time to time; the latest version always applies.",
        ]},
        { heading: "Orders & pricing", body: [
          "All prices are listed in USD and inclusive of applicable taxes where shown. We reserve the right to correct pricing errors.",
          "Order confirmation does not guarantee acceptance — we may decline orders for stock or fraud reasons and will refund any payment.",
        ]},
        { heading: "Intellectual property", body: [
          "All content on this site — text, imagery, logos — is the property of Aurelia Glow and may not be reproduced without written permission.",
        ]},
        { heading: "Liability", body: [
          "Our liability is limited to the value of the order. We are not responsible for indirect or consequential damages.",
        ]},
      ]}
    />
  ),
});
