import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useUIStore } from "@/store/ui";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site";

const LINKS = [
  { label: "Shop All", to: "/shop" as const },
  { label: "Glow Kit", to: "/products/$handle" as const, params: { handle: "signature-baked-glow-trio" } },
  { label: "Shades", to: "/shades" as const },
  { label: "Bundle Builder", to: "/bundle" as const },
  { label: "Reviews", to: "/reviews" as const },
  { label: "About", to: "/about" as const },
  { label: "FAQ", to: "/faq" as const },
  { label: "Contact", to: "/contact" as const },
];

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu, toggleSearch } = useUIStore();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMobileMenu();
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [isMobileMenuOpen, closeMobileMenu]);

  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-ivory animate-fade-in lg:hidden" style={{ animationDuration: "200ms" }}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-6 h-16 border-b border-border">
          <span className="display-serif text-xl tracking-[0.04em]">Aurelia <span className="italic">Glow</span></span>
          <button onClick={closeMobileMenu} aria-label="Close menu" className="p-2 -mr-2">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="space-y-1">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  params={(l as any).params}
                  onClick={closeMobileMenu}
                  className="block py-4 display-serif text-3xl border-b border-border hover:text-rose-taupe transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-3">
            <Button
              variant="solid"
              size="lg"
              shape="sharp"
              className="w-full"
              onClick={() => {
                closeMobileMenu();
                toggleSearch();
              }}
            >
              Search
            </Button>
          </div>
        </nav>

        <div className="px-6 py-6 border-t border-border flex items-center justify-between text-xs tracking-[0.18em] uppercase text-rose-taupe">
          <div className="flex gap-4">
            {SITE.socials.map((s) => (
              <a key={s.name} href={s.href}>{s.name}</a>
            ))}
          </div>
          <span>Free ship $50+</span>
        </div>
      </div>
    </div>
  );
}
