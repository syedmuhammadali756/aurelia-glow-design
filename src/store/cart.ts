import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  createShopifyCart,
  addLineToShopifyCart,
  updateShopifyCartLine,
  removeLineFromShopifyCart,
  fetchCartStatus,
} from "@/lib/shopify";

export type CartItem = {
  key: string; // productId + variantId
  productId: string;
  productHandle: string;
  variantId: string; // Shopify variant GID for real products
  lineId: string | null; // Shopify cart line ID
  title: string;
  variantTitle: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  lastAddedKey: string | null;
  add: (item: Omit<CartItem, "key" | "qty" | "lineId">, qty?: number) => Promise<void>;
  remove: (key: string) => Promise<void>;
  updateQty: (key: string, qty: number) => Promise<void>;
  clear: () => void;
  syncCart: () => Promise<void>;
  subtotal: () => number;
  itemCount: () => number;
};

const isShopifyGid = (id: string) => id.startsWith("gid://shopify/");

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isSyncing: false,
      lastAddedKey: null,

      add: async (item, qty = 1) => {
        const key = `${item.productId}__${item.variantId}`;
        const state = get();
        const existing = state.items.find((i) => i.key === key);

        // Shopify-backed flow
        if (isShopifyGid(item.variantId)) {
          set({ isLoading: true });
          try {
            if (!state.cartId) {
              const result = await createShopifyCart(item.variantId, qty);
              if (result) {
                set({
                  cartId: result.cartId,
                  checkoutUrl: result.checkoutUrl,
                  items: [{ ...item, key, qty, lineId: result.lineId }],
                  lastAddedKey: key,
                });
              }
            } else if (existing) {
              const newQty = existing.qty + qty;
              if (existing.lineId) {
                const r = await updateShopifyCartLine(state.cartId, existing.lineId, newQty);
                if (r.success) {
                  set({
                    lastAddedKey: key,
                    items: get().items.map((i) =>
                      i.key === key ? { ...i, qty: newQty } : i,
                    ),
                  });
                } else if (r.cartNotFound) {
                  get().clear();
                }
              }
            } else {
              const r = await addLineToShopifyCart(state.cartId, item.variantId, qty);
              if (r.success) {
                set({
                  lastAddedKey: key,
                  items: [
                    ...get().items,
                    { ...item, key, qty, lineId: r.lineId ?? null },
                  ],
                });
              } else if (r.cartNotFound) {
                get().clear();
              }
            }
          } catch (e) {
            console.error("Failed to add item:", e);
          } finally {
            set({ isLoading: false });
          }
          return;
        }

        // Local-only fallback (demo/visual products without GID)
        if (existing) {
          set({
            lastAddedKey: key,
            items: state.items.map((i) =>
              i.key === key ? { ...i, qty: i.qty + qty } : i,
            ),
          });
        } else {
          set({
            lastAddedKey: key,
            items: [...state.items, { ...item, key, qty, lineId: null }],
          });
        }
      },

      remove: async (key) => {
        const state = get();
        const item = state.items.find((i) => i.key === key);
        if (!item) return;
        if (state.cartId && item.lineId && isShopifyGid(item.variantId)) {
          set({ isLoading: true });
          try {
            const r = await removeLineFromShopifyCart(state.cartId, item.lineId);
            if (r.cartNotFound) {
              get().clear();
              return;
            }
          } finally {
            set({ isLoading: false });
          }
        }
        const remaining = get().items.filter((i) => i.key !== key);
        if (remaining.length === 0) {
          get().clear();
        } else {
          set({ items: remaining });
        }
      },

      updateQty: async (key, qty) => {
        if (qty <= 0) {
          await get().remove(key);
          return;
        }
        const state = get();
        const item = state.items.find((i) => i.key === key);
        if (!item) return;
        if (state.cartId && item.lineId && isShopifyGid(item.variantId)) {
          set({ isLoading: true });
          try {
            const r = await updateShopifyCartLine(state.cartId, item.lineId, qty);
            if (r.cartNotFound) {
              get().clear();
              return;
            }
            if (!r.success) return;
          } finally {
            set({ isLoading: false });
          }
        }
        set({
          items: get().items.map((i) => (i.key === key ? { ...i, qty } : i)),
        });
      },

      clear: () =>
        set({ items: [], cartId: null, checkoutUrl: null, lastAddedKey: null }),

      syncCart: async () => {
        const { cartId, isSyncing, clear } = get();
        if (!cartId || isSyncing) return;
        set({ isSyncing: true });
        try {
          const cart = await fetchCartStatus(cartId);
          if (cart === undefined) return; // network error preserve
          if (!cart || cart.totalQuantity === 0) clear();
        } catch (e) {
          console.error("Cart sync failed:", e);
        } finally {
          set({ isSyncing: false });
        }
      },

      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    {
      name: "aurelia-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        ({
          items: state.items,
          cartId: state.cartId,
          checkoutUrl: state.checkoutUrl,
        }) as any,
    },
  ),
);
