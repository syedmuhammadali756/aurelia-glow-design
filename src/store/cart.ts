import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  key: string; // productId + variantId
  productId: string;
  productHandle: string;
  variantId: string;
  title: string;
  variantTitle: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  lastAddedKey: string | null;
  add: (item: Omit<CartItem, "key" | "qty">, qty?: number) => void;
  remove: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clear: () => void;
  subtotal: () => number;
  itemCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      lastAddedKey: null,
      add: (item, qty = 1) => {
        const key = `${item.productId}__${item.variantId}`;
        set((state) => {
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              lastAddedKey: key,
              items: state.items.map((i) =>
                i.key === key ? { ...i, qty: i.qty + qty } : i,
              ),
            };
          }
          return {
            lastAddedKey: key,
            items: [...state.items, { ...item, key, qty }],
          };
        });
      },
      remove: (key) =>
        set((s) => ({ items: s.items.filter((i) => i.key !== key) })),
      updateQty: (key, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [], lastAddedKey: null }),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: "aurelia-cart" },
  ),
);
