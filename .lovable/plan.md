# Aurelia Glow — Premium Beauty Micro-Store (v2)

A luxury, editorial Shopify-ready beauty store. Design quality is the primary deliverable. 6 demo products, full commerce surface coverage, premium motion, and Shopify-shaped data so content can be swapped in later without touching components.

## 1. Visual Identity System

**Moodboard direction:** soft natural light, warm ivory rooms, linen drapes, ceramic and brushed-gold props, macro powder textures, editorial flatlays. No gradients-as-decoration, no glassmorphism, no neon, no plastic AI sheen.

**Color tokens (oklch in `src/styles.css`):**
- `--ivory` warm background, `--blush`, `--champagne`, `--rose-taupe`, `--nude`, `--espresso` (text), `--charcoal`, `--gold` (muted accent only — used sparingly: thin dividers, hairline borders, active swatch ring)
- Surface variants: `--surface`, `--surface-soft` (blush), `--surface-warm` (champagne), `--surface-deep` (espresso for footer/editorial)
- `--shadow-soft` (cards rest), `--shadow-card` (hover lift), `--shadow-elevated` (drawers/modals)
- `--gradient-veil` very subtle ivory→blush, used only on hero/editorial backgrounds
- Section background rule: alternate ivory → blush → ivory → champagne → ivory; never two saturated surfaces in a row

**Typography:**
- Serif display: Cormorant Garamond (hero, section titles, editorial pulls)
- Sans UI: Inter (nav, body, prices, buttons, microcopy)
- Tracking: serif tight (-0.01em), small-caps eyebrow labels at 11px, 0.18em tracking
- Scale: 12 / 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 / 88
- Body line-height 1.65, headings 1.1–1.2

**Spacing system (editorial):** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 160. Section vertical padding 96–160 desktop, 64–96 mobile. Generous left/right page gutters; max content width 1280, editorial blocks 1080, prose 640.

**Layout rules:**
- Generous whitespace — never fill a section edge-to-edge with text/imagery
- Asymmetric editorial grids on storytelling sections (image bleeds one side)
- Image framing: 4:5 portrait for product, 3:2 for lifestyle, 1:1 for textures, 16:9 only for hero on desktop
- Always pair an image with breathing room (8–16% of container)

**Cards:**
- Product card: no heavy border; 1px hairline `--border` at rest, replaced by `--shadow-card` lift on hover, radius `--radius-lg`
- Editorial card: no border, soft shadow only, radius `--radius-xl`
- Inputs: 1px hairline, focus ring uses `--gold` at 40% opacity, never blue

**CTA hierarchy:**
- Primary: solid espresso, ivory text, slow hover fill from blush
- Secondary: ivory with hairline espresso border, fills to espresso on hover
- Tertiary: text link with animated underline (story-link pattern)
- Icon button: 40px hit area, ghost background, hover blush wash
- Buttons never use gold as fill — gold is reserved for accents

**Icon style:** thin-stroke (1.25px) line icons via lucide-react; no filled icons in nav. Custom mini SVGs only for the 4 value-strip glyphs.

**Mobile visual rules:** keep typographic scale (don't shrink serif below 32px on hero), maintain 24px gutters, never let CTA stack break ratio, full-width images bleed edge-to-edge with breathing space above/below.

## 2. Data Layer (Shopify-shaped)

`src/data/products.ts` — typed array of 6 demo products:
```ts
type Product = {
  id; handle; title; subtitle; vendor: 'Aurelia Glow';
  productType; tags[]; description; images: {src,alt,role}[];
  price; compareAtPrice?; rating; reviewCount;
  options: [{name:'Shade', values:[...]}];
  variants: {id, title, shade?, price, available, image}[];
  includes?: string[]; howToUse: string[]; ingredients?: string;
  badges?: ('new'|'bestseller'|'sale'|'limited')[];
};
```
Same shape as Shopify Storefront API → drop-in port later.

`src/data/site.ts` — nav, mega-menu tiles, announcement messages (rotating), footer columns, FAQs (general + per-page), routine steps, story points, comparison table rows, shade definitions `{name, hex, undertone, description}`.

## 3. State (Zustand, persisted where useful)

- `useCartStore` — items, add/remove/updateQty, subtotal, freeShipThreshold (50), recently added (for toast/feedback)
- `useUIStore` — isCartOpen, isSearchOpen, isMobileMenuOpen, quickViewProductId, isStickyAtcVisible
- `useWishlistStore` — id set, persisted to localStorage
- `useRecentlyViewedStore` — capped to 8, persisted

## 4. Routes (TanStack Start, file-based)

```
src/routes/
  __root.tsx                  shell + Header + Footer + CartDrawer + SearchOverlay + MobileMenu + QuickViewModal
  index.tsx                   Homepage
  shop.tsx                    Collection page (all 6)
  products.$handle.tsx        Product detail page
  shades.tsx                  Shade Guide
  bundle.tsx                  Bundle Builder
  reviews.tsx                 Reviews
  about.tsx                   About
  faq.tsx                     FAQ
  contact.tsx                 Contact
  shipping-returns.tsx
  privacy.tsx
  terms.tsx
  refund.tsx
```

Each route: unique `head()` with title, description, og:title, og:description, og:image where available.

## 5. Homepage Flow (luxury narrative, in order)

A. **AnnouncementBar** — slim, espresso text on ivory, rotating messages every 5s with crossfade, dismissible, persists dismissal in session.

B. **Header** — sticky, transparent over hero, transitions to solid ivory + hairline shadow on scroll past 80px. Logo "Aurelia Glow" wordmark (Cormorant, letter-spaced). Center nav. Right: search / account / wishlist count / cart count.

C. **Hero** — full-viewport editorial. Layered composition: large lifestyle image right, floating product card left with serif headline overlapping image edge, soft veil gradient. Eyebrow "The Glow Edit", H1 "Your Complete Glow Routine, Simplified", supporting line, primary "Shop The Kit" + secondary "Find Your Shade". Trust microline "Free shipping over $50 · Easy returns · Shade match guarantee". Image-reveal mask animation on load; product card floats subtly (8px y-translate, 6s ease-in-out infinite). Mobile: stacked, image first 70vh, content below on ivory.

D. **Hero Mini Product Bar** — slim sticky-feel strip directly under hero: kit thumbnail, title, price, "6 shades" tag, "Shop Now" pill. Scrolls with page (not sticky), serves as immediate conversion bridge.

E. **Value Strip** — 4 thin-line custom glyphs + label + 1-line subtext. Hairline dividers between cells. No icons in circles.

F. **Featured Product Buy Box** — full PDP-quality block on home: gallery left (sticky on desktop) with thumbnails + hover zoom, buy box right with shade selector, qty, price + compare-at, primary/secondary CTAs, free-ship note, payment icons row, accordions (What's Included / How To Use / Shade Guide / Ingredients / Shipping). When this section scrolls past, a slim sticky mini-bar appears at top with shade thumbnail + Add to Cart.

G. **Shade Finder** — 6 shade cards with circular swatch, name, undertone tag, 1-line description, "View shade" link. Selected state with gold ring. CTAs: primary "Find My Shade", text link "Compare shades →". Mobile: horizontal snap-scroll with peek of next card.

H. **Collection Preview** — 6-product grid (3 cols desktop / 2 mobile / 1 ≤420px). Premium product cards (see §7).

I. **Bundle Builder** — "Build Your Glow Set". 4 step columns: Shade → Palette → Brush → Finishing Powder. Each step shows selectable visual chips/swatches with selected ring. Live subtotal panel sticky on right with line items, savings vs separate, "Add Bundle to Cart" CTA. Mobile: vertical stepper with sticky bottom subtotal bar.

J. **Scrolling Storytelling** — sticky image column (one side), text blocks scroll past (other side). 4 story points (Choose your shade / Build soft coverage / Add warmth and glow / Finish in minutes). Image crossfades as each block enters viewport center. Falls back to static stack with `prefers-reduced-motion`.

K. **Editorial Texture Section** — full-bleed macro texture image with serif pull-quote overlaid: "Soft-focus finish. Buildable glow. Everyday polish." Champagne tint background. No CTA — pure brand moment.

L. **Routine Timeline** — 4 step cards numbered 01–04, serif numbers oversized in champagne, each with small product image accent, title, copy. Horizontal on desktop with thin connecting line, vertical stacked on mobile. Reveals in sequence on scroll.

M. **Comparison Section** — "Why choose a full-face kit?" 2-column tasteful table: "Aurelia Glow Kit" vs "Buying Separately". Rows: shade match, finish coordination, total cost, travel-friendly, brush included. Thin checkmarks (gold) and em-dashes. No aggressive copy.

N. **Reviews** — carousel of 6 demo reviews. Card: 5 thin stars, short title, body, attribution "— Initials, Shade Used, Finish Preference". Arrows on desktop, swipe + dots on mobile. Header explicitly labels "Demo reviews" via small label so no fake-verified claim.

O. **FAQ** — premium accordion, 6 questions covering shade, kit contents, beginner-friendliness, separate purchase, shipping, returns.

P. **Newsletter** — split editorial: soft texture image left, ivory panel right with eyebrow "The Glow List", serif heading, copy, email input + "Sign Up" pill, fine-print microcopy.

Q. **Footer** — espresso surface, ivory text. Brand mini-description column with wordmark + tagline + social icons. Shop / Support / About / Legal columns. Newsletter mini-form. Payment icon placeholders row. Bottom bar: copyright + "Back to top ↑" link.

## 6. Product Detail Page

Breadcrumbs → Sticky media gallery (4:5 main, thumbnail rail, hover zoom, image badges for "New"/"Bestseller") + buy box (title, subtitle, rating, price + compare-at, sale badge, shade selector with helper text "Tap to see undertone", qty stepper, Add to Cart, Buy Now, free-ship note, payment icons, delivery estimate placeholder, accordions). 

Below the fold: Benefits row (4 mini icons) → What's Included visual section (numbered product flatlay) → How To Use 4-step section → Shade Comparison strip → Bundle Upsell card → Related products (3 cards) → Reviews (5 cards + summary stats placeholder) → Product FAQ → Recently Viewed (chip row).

Sticky add-to-cart bar appears after gallery scrolls out, shows: thumbnail, title, selected shade label, price, Add to Cart.

**Variant behavior:** selecting a shade updates: selected shade name, swatch active ring, main gallery image (variant.image), URL search param `?variant=`, sticky bar shade label. Sold-out shade shows diagonal-line swatch and disables CTA with "Notify me" placeholder.

## 7. Product Card

Primary image (4:5) → secondary hover image swap with crossfade. Top-left badge (New/Sale/Bestseller). Top-right wishlist heart (filled state on toggle, micro-pulse on add). On hover: card lifts 4px, shadow softens out, "Quick Add" pill slides up from bottom of image, Quick View icon button appears top-right under wishlist. Title (sans medium), subtitle (muted small), price line (compare-at struck through, sale price in espresso, never red). Shade dots row (max 6, +N more). Star rating placeholder. Add-to-cart success: pill briefly turns "Added ✓" with check, cart count badge pulses.

Mobile: tap reveals quick-add for 3s; cards in 2-col grid.

## 8. Quick View Modal

Centered dialog, 880px max, two-column: image gallery left, condensed buy box right (title, price, short description, shade selector, qty, Add to Cart, "View full details →" link). Close on Esc/overlay click. Focus trap.

## 9. Cart Drawer

Right-slide sheet, 440px desktop / full-width mobile. Header "Your Cart (n)" + close. Free-shipping progress bar (filled portion in champagne, label "$X away from free shipping" or "You've unlocked free shipping ✓"). Line items: thumb 80px, title, variant/shade, qty stepper, price, remove (icon + undo toast). Recommended add-on card below items ("Pairs well with…"). Discount code accordion field (placeholder, non-functional). Subtotal row. Primary "Checkout" (full-width espresso). "Continue shopping" text link.

States: empty (illustration-free elegant message + "Shop the kit" CTA + 2 popular product chips); added-to-cart slide-in toast at top of drawer.

## 10. Search Overlay

Full-screen ivory overlay, top input (large serif placeholder "Search Aurelia Glow…"), close (top-right). Default state: "Trending" chips (glow kit / baked foundation / shade guide / brush) + "Popular products" 4-card mini grid + "Recent searches" (if any). Typing state: live results list + product previews. No-results state: serif "No matches found" + suggestions chips + popular grid. Keyboard: Cmd/Ctrl+K opens, Esc closes, ↑↓ navigates, Enter selects.

## 11. Mobile UX (designed, not just responsive)

- Full-screen menu with serif nav links, shop categories collapsible, search/cart/account triggers, social row at bottom
- Sticky bottom add-to-cart on PDP (shade chip + Add to Cart, slides up after scroll)
- Swipeable product gallery with dots
- Horizontal snap-scrolling shade cards
- 2-col product grid
- 44px minimum tap targets
- 16px minimum body, 14px minimum microcopy
- Bottom-aligned drawer close on small viewports
- Reduced section padding (64–96)

## 12. Animations (premium, restrained)

- Hero image clip-path reveal (0.9s ease-out)
- Floating product card 8px sine 6s
- Fade-up on scroll (IntersectionObserver, 24px translate, 600ms cubic-bezier(0.22,1,0.36,1)), stagger 80ms
- Card hover lift 4px + shadow swap (250ms)
- Quick-add slide-up (200ms)
- Mega-menu drop fade+translate (180ms)
- Cart drawer slide (300ms ease-out)
- Search overlay fade+scale (220ms)
- Mobile menu slide (280ms)
- Sticky add-to-cart slide-down on threshold
- Shade swatch selection: gold ring expand (150ms)
- Button hover: blush wash sweeps left→right (300ms)
- Image hover zoom 1.04 (500ms)
- Scroll-story image crossfade (400ms)

All gated by `@media (prefers-reduced-motion: reduce)` → animations become 1ms.

## 13. Image Art Direction

Generated with imagegen `standard` (and `premium` for hero). Consistent prompt baseline: "soft natural daylight, warm ivory background, editorial beauty product photography, minimal linen/ceramic/brushed-gold props, no text, no logos, shallow depth of field, film grain subtle, color palette ivory blush champagne nude espresso".

Asset roles (`src/assets/`): `hero-glow-kit.jpg`, `hero-product-card.jpg`, `kit-front.jpg`, `kit-angle.jpg`, `kit-open.jpg`, `texture-macro.jpg`, `texture-baked.jpg`, `shade-swatches.jpg`, `brush-detail.jpg`, `palette-flatlay.jpg`, `foundation-single.jpg`, `finishing-powder.jpg`, `mini-travel-kit.jpg`, `routine-lifestyle.jpg`, `editorial-texture.jpg`, `bundle-builder-visual.jpg`, `shade-guide-visual.jpg`, `newsletter-soft.jpg`. 6 product mains + 6 product hovers (alt angle).

Avatar placeholders: typographic initials on champagne circles (no AI faces) for review attribution.

## 14. Trust / CRO (no fake claims)

Allowed: free-shipping threshold, secure-checkout label (placeholder), easy returns line, shade match helper, beginner-friendly routine copy, what's included clarity, comparison block, bundle upsell, related products, demo reviews clearly framed.

Disallowed: verified-review badges, awards, certifications, dermatologist/derm-tested, cruelty-free/vegan unless marked "demo placeholder" inline, medical or transformation claims.

## 15. Placeholder UI States (designed)

- Checkout button: states for default, hover, loading (spinner inline), disabled (empty cart)
- Account icon + dropdown placeholder (Sign in / Create account / Orders / Wishlist)
- Empty cart state
- Added-to-cart success toast + cart-icon pulse
- Search empty state, no-results state
- Product unavailable / sold-out shade and full sold-out PDP state with "Notify me"
- Loading skeletons for product grid (shimmer on cards), gallery, reviews
- Generic error/empty section component

## 16. Components Inventory

`src/components/`:
- layout: `AnnouncementBar`, `Header`, `MegaMenu`, `MobileMenu`, `Footer`
- commerce: `ProductCard`, `ProductGrid`, `ProductGallery`, `PriceDisplay`, `Rating`, `Badge`, `ShadeSwatch`, `ShadeSelector`, `QuantityStepper`, `WishlistButton`, `QuickAddButton`, `QuickViewModal`, `CartDrawer`, `CartLineItem`, `FreeShippingBar`, `SearchOverlay`, `StickyAddToCart`, `BundleBuilder`, `ComparisonTable`, `ReviewsCarousel`, `RecentlyViewed`
- editorial: `Hero`, `HeroMiniProductBar`, `ValueStrip`, `FeaturedProduct`, `ShadeFinder`, `EditorialSplit`, `ScrollStory`, `EditorialTexture`, `RoutineTimeline`, `Newsletter`, `SectionEyebrow`
- primitives (shadcn): button (variants: `solid`, `outline-luxe`, `ghost`, `link-underline`, `pill`), accordion, tabs, sheet, dialog, dropdown-menu, tooltip, toast (sonner), separator, skeleton

## 17. Accessibility

Single H1 per route; semantic landmarks (`header/nav/main/footer`); focus rings on `--ring`; focus trap in drawer/overlay/modal; Esc closes; alt text on every image; color contrast ≥4.5:1 (espresso on ivory, espresso on blush verified); aria-labels on icon buttons; `aria-live` for cart toast; respects `prefers-reduced-motion`.

## 18. Performance

- Lazy `loading="lazy"` + `decoding="async"` for below-fold images
- Use Vite `?url` for assets, no inline base64 above 4KB
- IntersectionObserver-based reveals (no scroll listeners)
- Embla for carousels (lightweight)
- Skeletons during route transitions
- No large icon libraries beyond lucide-react

## 19. Build Order

1. Tokens, fonts, base layer in `src/styles.css` + Tailwind theme
2. Shopify-shaped data files
3. Zustand stores
4. Generate hero + 6 product + texture/lifestyle images (parallel)
5. Layout: AnnouncementBar, Header, MegaMenu, MobileMenu, Footer
6. Global overlays: CartDrawer, SearchOverlay, QuickViewModal
7. Commerce primitives: ProductCard, Gallery, ShadeSelector, etc.
8. Homepage sections (A–Q)
9. Product detail route + StickyAddToCart
10. Collection route with filters/sort
11. Bundle Builder route
12. Shade Guide, Reviews, About, FAQ, Contact
13. Policy placeholder pages (consistent editorial template)
14. Polish pass: spacing, motion timing, mobile QA, focus states, empty/loading states
15. Final senior-designer QA review per §13 of the brief

## 20. Out of Scope (UI states designed, not functional)

Real checkout, payments, auth, email send, shipping calc, real reviews, real wishlist sync. All have polished placeholder UI.

## Technical Notes

- TanStack Start file routes; typed `<Link to="/products/$handle" params={{ handle }}>`
- Cart/UI/Wishlist stores mounted once in `__root.tsx`
- All colors via semantic tokens — zero raw hex in components
- Product data shape mirrors Shopify Storefront API for clean port
- No backend / Lovable Cloud needed for this pass
