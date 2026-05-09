import heroKit from "@/assets/hero-glow-kit.jpg";
import kitFront from "@/assets/kit-front.jpg";
import kitAngle from "@/assets/kit-angle.jpg";
import paletteFlatlay from "@/assets/palette-flatlay.jpg";
import paletteAngle from "@/assets/palette-angle.jpg";
import foundationSingle from "@/assets/foundation-single.jpg";
import foundationAngle from "@/assets/foundation-angle.jpg";
import brushDetail from "@/assets/brush-detail.jpg";
import brushAngle from "@/assets/brush-angle.jpg";
import miniTravel from "@/assets/mini-travel-kit.jpg";
import miniTravelAngle from "@/assets/mini-travel-angle.jpg";
import finishingPowder from "@/assets/finishing-powder.jpg";
import finishingPowderAngle from "@/assets/finishing-powder-angle.jpg";
import textureMacro from "@/assets/texture-macro.jpg";
import shadeSwatches from "@/assets/shade-swatches.jpg";

import { SHADES, type Shade } from "./shades";

export type ProductImage = { src: string; alt: string; role?: "primary" | "hover" | "texture" | "swatch" | "lifestyle" };

export type Variant = {
  id: string;
  title: string;
  shade?: string;
  price: number;
  available: boolean;
  image?: string;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  vendor: "Aurelia Glow";
  productType: string;
  tags: string[];
  description: string;
  images: ProductImage[];
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  options: { name: string; values: string[] }[];
  variants: Variant[];
  includes?: string[];
  howToUse: string[];
  ingredients?: string;
  badges?: ("new" | "bestseller" | "sale" | "limited")[];
};

const allShadeNames = SHADES.map((s) => s.name);
const travelShadeNames = ["Light", "Medium", "Golden Medium"];
const powderShadeNames = ["Soft Ivory", "Warm Beige", "Golden Veil"];

const variantsForShades = (shades: string[], price: number, image?: string): Variant[] =>
  shades.map((shade, i) => ({
    id: `${shade.toLowerCase().replace(/\s+/g, "-")}-${i}`,
    title: shade,
    shade,
    price,
    available: !(shade === "Sand" && shades.length === 6 && price === 49.99 ? false : false), // all available
    image,
  }));

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    handle: "signature-baked-glow-trio",
    title: "Signature Baked Glow Trio",
    subtitle: "Full-face glow kit · 3 pieces",
    vendor: "Aurelia Glow",
    productType: "Glow Kit",
    tags: ["bestseller", "kit", "hero"],
    description:
      "A complete baked makeup ritual in one elegant compact. Soft-coverage baked foundation, a warm glow palette, and a hand-finished angled brush — designed for an effortless everyday radiance.",
    images: [
      { src: kitFront, alt: "Signature Baked Glow Trio compact, top view", role: "primary" },
      { src: kitAngle, alt: "Signature Baked Glow Trio open at three-quarter angle", role: "hover" },
      { src: textureMacro, alt: "Macro detail of baked powder texture", role: "texture" },
      { src: heroKit, alt: "Aurelia Glow editorial composition", role: "lifestyle" },
    ],
    price: 49.99,
    compareAtPrice: 134.99,
    rating: 4.8,
    reviewCount: 248,
    options: [{ name: "Shade", values: allShadeNames }],
    variants: variantsForShades(allShadeNames, 49.99, kitFront).map((v, i) => ({
      ...v,
      available: i !== 5, // Sand sold out for demo
    })),
    includes: ["Baked foundation", "Glow face palette", "Angled kabuki brush", "Linen pouch"],
    howToUse: [
      "Choose your shade and prep skin with your usual moisturiser.",
      "Sweep the angled brush across the baked foundation in soft circles.",
      "Layer warmth from the palette across cheeks and temples.",
      "Finish with a light tap of glow on the highest points of the face.",
    ],
    ingredients:
      "Talc, Mica, Magnesium Stearate, Octyldodecyl Stearoyl Stearate, Caprylic/Capric Triglyceride, Tocopherol, [+/- pigments].",
    badges: ["bestseller", "sale"],
  },
  {
    id: "p2",
    handle: "soft-radiance-face-palette",
    title: "Soft Radiance Face Palette",
    subtitle: "Blush · bronzer · highlighter · eye shades",
    vendor: "Aurelia Glow",
    productType: "Palette",
    tags: ["palette"],
    description:
      "Six harmonised shades to sculpt, warm and illuminate. Designed to layer beautifully with the baked foundation finish.",
    images: [
      { src: paletteFlatlay, alt: "Soft Radiance Face Palette open flatlay", role: "primary" },
      { src: paletteAngle, alt: "Soft Radiance Face Palette at angle", role: "hover" },
      { src: textureMacro, alt: "Powder texture detail", role: "texture" },
    ],
    price: 34.99,
    rating: 4.7,
    reviewCount: 132,
    options: [{ name: "Finish", values: ["Soft Matte", "Luminous"] }],
    variants: [
      { id: "soft-matte", title: "Soft Matte", price: 34.99, available: true, image: paletteFlatlay },
      { id: "luminous", title: "Luminous", price: 34.99, available: true, image: paletteAngle },
    ],
    howToUse: [
      "Sweep blush onto the apples of cheeks.",
      "Trace bronzer along the hairline and jaw.",
      "Tap highlighter along cheekbones and brow bones.",
    ],
    badges: ["bestseller"],
  },
  {
    id: "p3",
    handle: "baked-balance-foundation",
    title: "Baked Balance Foundation",
    subtitle: "Single baked foundation · soft-coverage",
    vendor: "Aurelia Glow",
    productType: "Foundation",
    tags: ["foundation"],
    description:
      "Slow-baked for a smooth, soft-focus finish. Buildable from a sheer veil to medium coverage with a luminous, second-skin feel.",
    images: [
      { src: foundationSingle, alt: "Baked Balance Foundation open compact", role: "primary" },
      { src: foundationAngle, alt: "Baked Balance Foundation closed at angle", role: "hover" },
      { src: shadeSwatches, alt: "Foundation shade swatches", role: "swatch" },
    ],
    price: 29.99,
    rating: 4.6,
    reviewCount: 96,
    options: [{ name: "Shade", values: allShadeNames }],
    variants: variantsForShades(allShadeNames, 29.99, foundationSingle),
    howToUse: [
      "Press a damp sponge or brush into the baked formula.",
      "Tap onto the centre of the face and blend outward.",
      "Layer a second pass for a fuller, even finish.",
    ],
  },
  {
    id: "p4",
    handle: "angled-kabuki-brush",
    title: "Angled Kabuki Brush",
    subtitle: "Hand-finished face brush",
    vendor: "Aurelia Glow",
    productType: "Tool",
    tags: ["brush", "tool"],
    description:
      "A densely packed, soft-tip kabuki cut at a precise angle for buildable powder application across cheeks, jaw and forehead.",
    images: [
      { src: brushDetail, alt: "Angled Kabuki Brush head closeup", role: "primary" },
      { src: brushAngle, alt: "Angled Kabuki Brush at angle", role: "hover" },
    ],
    price: 18.99,
    rating: 4.9,
    reviewCount: 74,
    options: [{ name: "Style", values: ["Standard", "Travel"] }],
    variants: [
      { id: "standard", title: "Standard", price: 18.99, available: true, image: brushDetail },
      { id: "travel", title: "Travel", price: 18.99, available: true, image: brushAngle },
    ],
    howToUse: [
      "Tap the brush gently into the baked powder.",
      "Sweep in soft circles, building from the centre out.",
    ],
    badges: ["new"],
  },
  {
    id: "p5",
    handle: "mini-travel-glow-kit",
    title: "Mini Travel Glow Kit",
    subtitle: "Mini foundation · mini palette · mini brush",
    vendor: "Aurelia Glow",
    productType: "Kit",
    tags: ["travel", "kit"],
    description:
      "Your full glow ritual reimagined for the road. The same baked formulas in a refined travel-size silhouette.",
    images: [
      { src: miniTravel, alt: "Mini Travel Glow Kit flatlay", role: "primary" },
      { src: miniTravelAngle, alt: "Mini Travel Glow Kit at angle", role: "hover" },
    ],
    price: 39.99,
    rating: 4.7,
    reviewCount: 58,
    options: [{ name: "Shade", values: travelShadeNames }],
    variants: variantsForShades(travelShadeNames, 39.99, miniTravel),
    includes: ["Mini baked foundation", "Mini face palette", "Mini brush", "Travel pouch"],
    howToUse: ["Use as you would the full-size kit, anywhere you go."],
    badges: ["limited"],
  },
  {
    id: "p6",
    handle: "finishing-glow-powder",
    title: "Finishing Glow Powder",
    subtitle: "Soft-veil setting powder",
    vendor: "Aurelia Glow",
    productType: "Powder",
    tags: ["powder", "finishing"],
    description:
      "A whisper-fine veil that sets makeup with a soft, lit-from-within finish. Layer over the kit to lock in radiance.",
    images: [
      { src: finishingPowder, alt: "Finishing Glow Powder open compact", role: "primary" },
      { src: finishingPowderAngle, alt: "Finishing Glow Powder closed at angle", role: "hover" },
    ],
    price: 24.99,
    rating: 4.5,
    reviewCount: 41,
    options: [{ name: "Shade", values: powderShadeNames }],
    variants: powderShadeNames.map((shade, i) => ({
      id: `powder-${i}`,
      title: shade,
      shade,
      price: 24.99,
      available: true,
      image: finishingPowder,
    })),
    howToUse: ["Press lightly across the T-zone with the puff or a fluffy brush."],
  },
];

export const PRODUCT_BY_HANDLE: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.handle, p]),
);

export const HERO_PRODUCT = PRODUCTS[0];

export const formatPrice = (n: number) =>
  `$${n.toFixed(2)}`;

export type { Shade };
