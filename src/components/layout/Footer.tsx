import { Link } from "@tanstack/react-router";
import { Instagram, ChevronUp } from "lucide-react";
import { FOOTER_COLUMNS, SITE } from "@/data/site";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-surface-deep text-ivory mt-24">
      <div className="container-luxe py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="display-serif text-3xl tracking-[0.04em]">
              Aurelia <span className="italic">Glow</span>
            </Link>
            <p className="mt-6 text-sm text-ivory/70 max-w-xs leading-relaxed">
              {SITE.tagline} Considered baked formulas, soft-focus finish, and a routine that fits in three minutes.
            </p>
            <div className="mt-8 flex gap-4 text-xs tracking-[0.18em] uppercase text-ivory/70">
              {SITE.socials.map((s) => (
                <a key={s.name} href={s.href} className="hover:text-ivory transition-colors">
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] tracking-[0.22em] uppercase text-ivory/60 mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm text-ivory/85 hover:text-ivory transition-colors">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] tracking-[0.22em] uppercase text-ivory/60 mb-4">The Glow List</h4>
            <p className="text-sm text-ivory/70 mb-4">Early access to drops, shade tips and routines.</p>
            <form className="flex border border-ivory/30" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-transparent px-4 py-3 text-sm placeholder:text-ivory/40 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 text-[11px] tracking-[0.18em] uppercase border-l border-ivory/30 hover:bg-ivory hover:text-espresso transition-colors"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ivory/15 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-ivory/50">
          <div>© {new Date().getFullYear()} Aurelia Glow. Demo storefront.</div>
          <div className="flex items-center gap-3">
            {["Visa", "Mastercard", "Amex", "Apple Pay", "PayPal"].map((p) => (
              <span key={p} className="px-2.5 py-1 border border-ivory/20 rounded text-[10px] tracking-[0.14em] uppercase text-ivory/60">
                {p}
              </span>
            ))}
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 hover:text-ivory transition-colors text-[11px] tracking-[0.18em] uppercase"
          >
            <ChevronUp className="h-3 w-3" /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
