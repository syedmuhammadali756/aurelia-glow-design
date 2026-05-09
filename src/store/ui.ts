import { create } from "zustand";

type UIState = {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  quickViewHandle: string | null;
  openCart: () => void;
  closeCart: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openQuickView: (handle: string) => void;
  closeQuickView: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isSearchOpen: false,
  isMobileMenuOpen: false,
  quickViewHandle: null,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  openQuickView: (handle) => set({ quickViewHandle: handle }),
  closeQuickView: () => set({ quickViewHandle: null }),
}));
