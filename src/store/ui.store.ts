import { create } from "zustand";

interface UIState {
  searchDrawerOpen: boolean;
  cartDrawerOpen: boolean;
  wishlistDrawerOpen: boolean;
  mobileMenuOpen: boolean;
  authDrawerOpen: boolean;

  setSearchDrawerOpen: (open: boolean) => void;
  setCartDrawerOpen: (open: boolean) => void;
  setWishlistDrawerOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setAuthDrawerOpen: (open: boolean) => void;

  closeAllDrawers: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  searchDrawerOpen: false,
  cartDrawerOpen: false,
  wishlistDrawerOpen: false,
  mobileMenuOpen: false,
  authDrawerOpen: false,

  setSearchDrawerOpen: (open) => set({ searchDrawerOpen: open }),
  setCartDrawerOpen: (open) => set({ cartDrawerOpen: open }),
  setWishlistDrawerOpen: (open) => set({ wishlistDrawerOpen: open }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setAuthDrawerOpen: (open) => set({ authDrawerOpen: open }),

  closeAllDrawers: () =>
    set({
      searchDrawerOpen: false,
      cartDrawerOpen: false,
      wishlistDrawerOpen: false,
      mobileMenuOpen: false,
      authDrawerOpen: false,
    }),
}));
