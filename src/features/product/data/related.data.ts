export interface RelatedProduct {
  id: string;
  name: string;
  category: string;
  fabric: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  badge?: string;
}

export interface LookItem {
  id: string;
  type: string;
  name: string;
  price: number;
  imageUrl: string;
  link: string;
}

export const relatedProducts: RelatedProduct[] = [
  {
    id: "p5",
    name: "Midnight Velvet Bandhgala",
    category: "bandhgala",
    fabric: "Luxury Velvet",
    price: 58000,
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
    badge: "Atelier Classic",
  },
  {
    id: "p2",
    name: "Royal Maroon Silk Kurta Set",
    category: "kurta",
    fabric: "Chanderi Silk",
    price: 24500,
    originalPrice: 29500,
    imageUrl:
      "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&q=80&w=600",
    badge: "Best Seller",
  },
  {
    id: "p3",
    name: "Brocade Bundi & Kurta Ensemble",
    category: "nehru-jacket",
    fabric: "Banarasi Brocade",
    price: 34500,
    imageUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600",
    badge: "Heritage",
  },
  {
    id: "p7",
    name: "Zardozi Zari Sherwani Collar Edition",
    category: "sherwani",
    fabric: "Banarasi Silk",
    price: 115000,
    imageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
  },
];

export const completeTheLook: LookItem[] = [
  {
    id: "l1",
    type: "Sherwani",
    name: "Maharaja Cream Zardosi Sherwani",
    price: 145000,
    imageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=400",
    link: "/products/p1",
  },
  {
    id: "l2",
    type: "Footwear",
    name: "Zari Embroidered Mojari",
    price: 8500,
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=400",
    link: "/products/p8",
  },
  {
    id: "l3",
    type: "Safa / Turban",
    name: "Royal Cream Silk Safa",
    price: 4500,
    imageUrl:
      "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&q=80&w=400",
    link: "/products/p9",
  },
  {
    id: "l4",
    type: "Pocket Square",
    name: "Gold Zari Silk Pocket Square",
    price: 1800,
    imageUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=400",
    link: "/products/p10",
  },
];
