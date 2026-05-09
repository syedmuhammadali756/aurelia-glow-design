import { Link, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { MegaMenu } from "./MegaMenu";

const NAV = [
  { label: "Shop", href: "/shop" as const, mega: true },
  { label: "Glow Kit", href: "/products/$handle" as const, params: { handle: "signature-baked-glow-trio" } },
  { label: "Shades", href: "/shades" as const },
  { label: "Bundle", href: "/bundle" as const },
  { label: "Reviews", href: "/reviews" as const },
  { label: "About", href: "/about" as const },
];

export function Header() {
  const { location } = useRouterState();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const openCart = useUIStore((s) => s.openCart);
  const toggleSearch = useUIStore((s) => s.toggleSearch);
  const toggleMobileMenu = useUIStore((s) => s.toggleMobileMenu);
  const cartCount = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-500",
        transparent
          ? "bg-transparent text-espresso"
          : "bg-ivory/95 backdrop-blur-md border-b border-border text-espresso",
      )}
    >
      <div className="container-luxe">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left: mobile menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
              className="p-2 -ml-2"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="lg:flex-1 flex items-center justify-center lg:justify-start">
            <span className="display-serif text-2xl md:text-[28px] tracking-[0.04em] leading-none">
              Aurelia <span className="italic">Glow</span>
            </span>
          </Link>

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {NAV.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.mega && setMegaOpen(true)}
                onMouseLeave={() => item.mega && setMegaOpen(false)}
              >
                {item.mega ? (
                  <Link
                    to={item.href}
                    className="text-[13px] tracking-[0.12em] uppercase py-2 link-underline"
                    activeProps={{ className: "font-medium" }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    to={item.href}
                    params={(item as any).params}
                    className="text-[13px] tracking-[0.12em] uppercase py-2 link-underline"
                    activeProps={{ className: "font-medium" }}
                  >
                    {item.label}
                  </Link>
                )}
                {item.mega && megaOpen && (
                  <MegaMenu onClose={() => setMegaOpen(false)} />
                )}
              </div>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1 md:gap-2 flex-1 justify-end">
            <button
              type="button"
              onClick={toggleSearch}
              aria-label="Search"
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link
              to="/shop"
              aria-label="Wishlist"
              className="hidden sm:inline-flex p-2 hover:bg-accent rounded-full transition-colors relative"
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-espresso text-ivory text-[10px] rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-label="Account"
              className="hidden sm:inline-flex p-2 hover:bg-accent rounded-full transition-colors"
            >
              <User className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              onClick={openCart}
              aria-label="Open cart"
              className="p-2 hover:bg-accent rounded-full transition-colors relative"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-espresso text-ivory text-[10px] rounded-full h-4 min-w-4 px-1 flex items-center justify-center animate-fade-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
