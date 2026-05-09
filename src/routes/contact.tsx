import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aurelia Glow" },
      { name: "description", content: "Reach the Aurelia Glow customer care team. We typically reply within one business day." },
      { property: "og:title", content: "Contact — Aurelia Glow" },
      { property: "og:description", content: "Get in touch with our customer care team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Customer Care" title="Get in touch" subtitle="We're a small team and read every message personally." />
      <section className="container-luxe py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            {[
              { icon: Mail, title: "Email", body: "care@aureliaglow.com" },
              { icon: MessageCircle, title: "Live chat", body: "Mon–Fri · 9am to 6pm GMT" },
              { icon: Clock, title: "Response time", body: "Within one business day" },
            ].map((b) => (
              <div key={b.title} className="flex gap-4">
                <div className="h-11 w-11 rounded-full border border-border grid place-items-center flex-shrink-0">
                  <b.icon className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">{b.title}</div>
                  <div className="mt-1 text-espresso">{b.body}</div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="lg:col-span-7 space-y-5 p-6 md:p-10 bg-surface-warm/50 border border-border"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="First name" name="first" />
              <Field label="Last name" name="last" />
            </div>
            <Field label="Email" name="email" type="email" />
            <Field label="Subject" name="subject" />
            <div>
              <label className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">Message</label>
              <textarea required rows={5} className="mt-2 w-full bg-ivory border border-border px-4 py-3 text-sm focus:outline-none focus:border-espresso" />
            </div>
            <button type="submit" className="h-12 px-8 bg-espresso text-ivory text-[11px] tracking-[0.22em] uppercase hover:bg-espresso/90 transition-all">
              {sent ? "Message sent" : "Send message"}
            </button>
            {sent && <p className="text-sm text-muted-foreground">Thank you — we'll be in touch shortly.</p>}
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">{label}</label>
      <input required name={name} type={type} className="mt-2 w-full h-11 bg-ivory border border-border px-4 text-sm focus:outline-none focus:border-espresso" />
    </div>
  );
}
