export const SITE = {
  brand: "Aurelia Glow",
  tagline: "Soft-coverage baked makeup, made for everyday glow.",
  freeShippingThreshold: 50,
  socials: [
    { name: "Instagram", href: "#" },
    { name: "Pinterest", href: "#" },
    { name: "TikTok", href: "#" },
  ],
};

export const ANNOUNCEMENT_MESSAGES = [
  "Free shipping over $50",
  "Limited-time glow kit offer · save up to 60%",
  "Find your shade in seconds",
];

export const PRIMARY_NAV = [
  { label: "Shop", href: "/shop" as const },
  { label: "Glow Kit", href: "/products/$handle" as const, params: { handle: "signature-baked-glow-trio" } },
  { label: "Shades", href: "/shades" as const },
  { label: "Bundle", href: "/bundle" as const },
  { label: "Reviews", href: "/reviews" as const },
  { label: "About", href: "/about" as const },
  { label: "FAQ", href: "/faq" as const },
];

export const MEGA_MENU = [
  { title: "Best Sellers", handle: "signature-baked-glow-trio" },
  { title: "Full Face Kits", handle: "signature-baked-glow-trio" },
  { title: "Foundation Shades", handle: "baked-balance-foundation" },
  { title: "Glow Palettes", handle: "soft-radiance-face-palette" },
  { title: "Brushes & Tools", handle: "angled-kabuki-brush" },
  { title: "Travel Sets", handle: "mini-travel-glow-kit" },
];

export const VALUE_POINTS = [
  { title: "3-Piece Glow Kit", desc: "Foundation, palette, and brush in one ritual." },
  { title: "Buildable Finish", desc: "Sheer veil to soft, even medium coverage." },
  { title: "Six Shade Options", desc: "Hand-curated across cool, neutral and warm." },
  { title: "Brush Included", desc: "Hand-finished angled kabuki, ready to use." },
];

export const STORY_POINTS = [
  { title: "Choose your shade", body: "Six harmonised baked foundation shades, calibrated to neutral, cool and warm undertones." },
  { title: "Build soft coverage", body: "Slow-baked formula sheers down or layers up — a second-skin feel either way." },
  { title: "Add warmth and glow", body: "The face palette warms cheeks and temples with a soft-focus radiance." },
  { title: "Finish in minutes", body: "A whisper-fine veil sets the look with a lit-from-within polish." },
];

export const ROUTINE_STEPS = [
  { step: "01", title: "Prep", body: "Begin on freshly moisturised skin." },
  { step: "02", title: "Foundation", body: "Press the baked formula across the centre of the face." },
  { step: "03", title: "Warmth", body: "Sweep palette tones along cheeks and temples." },
  { step: "04", title: "Finish", body: "Light veil of finishing powder for a soft polish." },
];

export const COMPARISON_ROWS = [
  { label: "Curated shade match", kit: true, separate: false },
  { label: "Coordinated finish", kit: true, separate: false },
  { label: "Brush included", kit: true, separate: false },
  { label: "Travel-friendly compact", kit: true, separate: false },
  { label: "All-in price", kit: "$49.99", separate: "≈ $134.99" },
];

export const FAQS = [
  {
    q: "How do I choose my shade?",
    a: "Begin by identifying your undertone — cool, neutral or warm. Our shade finder walks you through six options matched to natural light. If you're between two, we recommend the lighter shade with a touch of warmth from the palette.",
  },
  {
    q: "What is included in the kit?",
    a: "The Signature Baked Glow Trio includes a baked foundation, a four-pan glow palette, a hand-finished angled kabuki brush, and a soft linen travel pouch.",
  },
  {
    q: "Is this product beginner-friendly?",
    a: "Yes. The baked formula is forgiving and buildable, and the included brush is sized for easy, intuitive application.",
  },
  {
    q: "Can I buy products separately?",
    a: "Absolutely. The baked foundation, face palette, brush and finishing powder are all available individually.",
  },
  {
    q: "How does shipping work?",
    a: "Standard shipping is available on every order. Orders over $50 ship complimentary. Delivery times vary by region.",
  },
  {
    q: "What is the return policy?",
    a: "Unopened products may be returned within 30 days of delivery for a full refund. Used items can be exchanged for store credit.",
  },
];

export const REVIEWS = [
  { initials: "AM", title: "Effortless polish", body: "The baked formula blends so smoothly with my morning moisturiser. I look put-together in three minutes flat.", shade: "Fair", finish: "Soft Matte", rating: 5 },
  { initials: "JR", title: "My new everyday", body: "I love how the palette warms up the foundation. Travel-friendly and beautifully made.", shade: "Medium", finish: "Luminous", rating: 5 },
  { initials: "SK", title: "Soft and natural", body: "Light enough for a no-makeup day, buildable when I want a bit more.", shade: "Light", finish: "Soft Matte", rating: 4 },
  { initials: "EL", title: "Beautiful packaging", body: "Feels like a luxury beauty house but the price doesn't match — in a good way.", shade: "Porcelain", finish: "Luminous", rating: 5 },
  { initials: "DT", title: "Glow without shimmer", body: "I rarely highlight, but the soft glow shade gives a healthy finish without sparkle.", shade: "Golden Medium", finish: "Soft Matte", rating: 5 },
  { initials: "NB", title: "Brush is the hero", body: "Honestly the angled brush makes the whole routine feel professional.", shade: "Sand", finish: "Luminous", rating: 5 },
];

export const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Shop All", href: "/shop" },
      { label: "Glow Kit", href: "/products/signature-baked-glow-trio" },
      { label: "Shade Guide", href: "/shades" },
      { label: "Bundle Builder", href: "/bundle" },
      { label: "Reviews", href: "/reviews" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Reviews", href: "/reviews" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refund" },
    ],
  },
];
