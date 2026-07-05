export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  category: string;
  fabric: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  inStock: boolean;
}

export const initialWishlistItems: WishlistItem[] = [
  {
    id: "wi1",
    productId: "p3",
    name: "Brocade Bundi & Kurta Ensemble",
    category: "nehru-jacket",
    fabric: "Banarasi Brocade",
    imageUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600",
    price: 34500,
    badge: "Heritage",
    inStock: true,
  },
  {
    id: "wi2",
    productId: "p5",
    name: "Midnight Velvet Bandhgala",
    category: "bandhgala",
    fabric: "Luxury Velvet",
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
    price: 58000,
    badge: "Atelier Classic",
    inStock: true,
  },
  {
    id: "wi3",
    productId: "p7",
    name: "Zardozi Zari Sherwani Collar Edition",
    category: "sherwani",
    fabric: "Banarasi Silk",
    imageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
    price: 115000,
    inStock: false,
  },
];
