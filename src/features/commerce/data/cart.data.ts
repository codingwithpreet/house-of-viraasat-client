// ─────────────────────────────────────────────────────────────────────────────
// Cart Data – House of Viraasat
// ─────────────────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  category: string;
  fabric: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  size: string;
  color: string;
  quantity: number;
  inStock: boolean;
}

export const initialCartItems: CartItem[] = [
  {
    id: "ci1",
    productId: "p1",
    name: "Maharaja Cream Zardosi Sherwani",
    category: "Sherwani",
    fabric: "Pure Raw Silk",
    imageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=400",
    price: 145000,
    originalPrice: 165000,
    size: "40",
    color: "Imperial Cream",
    quantity: 1,
    inStock: true,
  },
  {
    id: "ci2",
    productId: "p8",
    name: "Zari Embroidered Mojari",
    category: "Accessories",
    fabric: "Leather & Velvet",
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=400",
    price: 8500,
    size: "9",
    color: "Artisan Gold",
    quantity: 1,
    inStock: true,
  },
];
