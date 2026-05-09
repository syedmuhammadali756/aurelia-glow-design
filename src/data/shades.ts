export type Shade = {
  name: string;
  hex: string;
  undertone: "Cool" | "Neutral" | "Warm";
  description: string;
};

export const SHADES: Shade[] = [
  { name: "Porcelain", hex: "#f4dccb", undertone: "Cool", description: "Very fair with pink undertones." },
  { name: "Fair", hex: "#ecc8af", undertone: "Neutral", description: "Light with a soft balanced base." },
  { name: "Light", hex: "#dfb293", undertone: "Warm", description: "Light to medium with golden warmth." },
  { name: "Medium", hex: "#c89679", undertone: "Neutral", description: "True medium with peach undertones." },
  { name: "Golden Medium", hex: "#b07e5d", undertone: "Warm", description: "Sun-kissed medium with caramel warmth." },
  { name: "Sand", hex: "#9a6c4d", undertone: "Warm", description: "Warm tan with rich golden depth." },
];

export const SHADE_BY_NAME = Object.fromEntries(SHADES.map((s) => [s.name, s]));
