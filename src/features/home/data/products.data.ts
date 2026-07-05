export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  fabric: string;
  badge?: string;
  featured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Maharaja Cream Zardosi Sherwani",
    category: "Sherwani",
    price: 145000,
    originalPrice: 165000,
    imageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
    fabric: "Raw Silk",
    badge: "Royal Groom",
    featured: true,
    isNewArrival: true,
    isBestSeller: true,
  },
  {
    id: "p2",
    name: "Royal Maroon Silk Kurta Set",
    category: "Kurta Set",
    price: 24500,
    originalPrice: 29500,
    imageUrl:
      "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&q=80&w=600",
    fabric: "Chanderi Silk",
    badge: "Best Seller",
    featured: true,
    isNewArrival: false,
    isBestSeller: true,
  },
  {
    id: "p3",
    name: "Brocade Bundi & Kurta Ensemble",
    category: "Nehru Jacket",
    price: 34500,
    imageUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600",
    fabric: "Banarasi Brocade",
    badge: "Heritage",
    featured: true,
    isNewArrival: true,
    isBestSeller: false,
  },
  {
    id: "p4",
    name: "Emerald Green Silk Kurta",
    category: "Kurta Set",
    price: 18500,
    imageUrl:
      "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&q=80&w=600",
    fabric: "Handloom Silk",
    featured: false,
    isNewArrival: true,
    isBestSeller: false,
  },
  {
    id: "p5",
    name: "Midnight Velvet Bandhgala",
    category: "Bandhgala",
    price: 58000,
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
    fabric: "Luxury Velvet",
    badge: "Atelier Classic",
    featured: true,
    isNewArrival: true,
    isBestSeller: true,
  },
  {
    id: "p6",
    name: "Ivory Self-Design Kurta",
    category: "Kurta Set",
    price: 15500,
    imageUrl:
      "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&q=80&w=600",
    fabric: "Cotton Silk",
    featured: false,
    isNewArrival: false,
    isBestSeller: true,
  },
];
