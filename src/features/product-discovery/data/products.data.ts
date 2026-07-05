export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  imageUrl: string;
  hoverImageUrl: string;
  sizes: string[];
  colors: ColorOption[];
  inStock: boolean;
  featured: boolean;
  fabric: string;
  occasion: string;
  fit: string;
  collection: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Maharaja Cream Zardosi Sherwani",
    category: "sherwani",
    price: 145000,
    originalPrice: 165000,
    rating: 4.9,
    reviewsCount: 42,
    description:
      "A majestic ivory-cream sherwani tailored in pure raw silk, featuring exquisite hand-embroidered Zardosi work. Embellished with classic Rajasthani patterns of gold dabka, tilla, delicate sequins, and seed pearls.",
    imageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
    sizes: ["38", "40", "42", "44", "46"],
    colors: [
      { name: "Imperial Cream", hex: "#FDFBF7" },
      { name: "Champagne Gold", hex: "#F3E5AB" },
    ],
    inStock: true,
    featured: true,
    fabric: "Raw Silk",
    occasion: "wedding",
    fit: "structured",
    collection: "royal-bridal",
    badge: "Royal Groom",
  },
  {
    id: "p2",
    name: "Royal Maroon Silk Kurta Set",
    category: "kurta",
    price: 24500,
    originalPrice: 29500,
    rating: 4.8,
    reviewsCount: 34,
    description:
      "A pure Chanderi silk kurta dyed in traditional royal maroon, matched with premium soft silk churidar trousers. Handcrafted thread work accents the cuffs and mandarin collar.",
    imageUrl:
      "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&q=80&w=600",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
    sizes: ["38", "40", "42", "44"],
    colors: [
      { name: "Royal Maroon", hex: "#58181F" },
      { name: "Midnight Charcoal", hex: "#1C1C1C" },
    ],
    inStock: true,
    featured: true,
    fabric: "Chanderi Silk",
    occasion: "festive",
    fit: "classic",
    collection: "festive-heritage",
    badge: "Best Seller",
  },
  {
    id: "p3",
    name: "Brocade Bundi & Kurta Ensemble",
    category: "nehru-jacket",
    price: 34500,
    rating: 4.9,
    reviewsCount: 18,
    description:
      "A masterpiece of Banarasi handloom weaving, this set features a stunning beige gold floral brocade Bundi paired with an inner gold silk kurta and pajama.",
    imageUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
    sizes: ["38", "40", "42", "44", "46"],
    colors: [
      { name: "Beige Brocade", hex: "#EDDCB7" },
      { name: "Classic Gold", hex: "#D4AF37" },
    ],
    inStock: true,
    featured: true,
    fabric: "Banarasi Brocade",
    occasion: "festive",
    fit: "tailored",
    collection: "festive-heritage",
    badge: "Heritage",
  },
  {
    id: "p4",
    name: "Emerald Green Silk Kurta",
    category: "kurta",
    price: 18500,
    rating: 4.7,
    reviewsCount: 22,
    description:
      "Meticulously crafted from organic handloom mulberry silk, this emerald green kurta displays an exquisite structural drop. Features functional side-seam pockets.",
    imageUrl:
      "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&q=80&w=600",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
    sizes: ["38", "40", "42", "44"],
    colors: [
      { name: "Emerald Green", hex: "#0B5345" },
      { name: "Sage Mint", hex: "#A2D9CE" },
    ],
    inStock: true,
    featured: false,
    fabric: "Handloom Silk",
    occasion: "festive",
    fit: "slim",
    collection: "festive-heritage",
  },
  {
    id: "p5",
    name: "Midnight Velvet Bandhgala",
    category: "bandhgala",
    price: 58000,
    rating: 4.9,
    reviewsCount: 15,
    description:
      "An architectural classic. This midnight blue structural Bandhgala jacket is crafted in luxurious high-density micro-velvet. Styled with premium structured canvas interior.",
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
    sizes: ["40", "42", "44", "46"],
    colors: [
      { name: "Midnight Blue", hex: "#002046" },
      { name: "Jet Onyx", hex: "#111111" },
    ],
    inStock: true,
    featured: true,
    fabric: "Luxury Velvet",
    occasion: "evening",
    fit: "tailored",
    collection: "sovereign-classics",
    badge: "Atelier Classic",
  },
  {
    id: "p6",
    name: "Ivory Self-Design Kurta",
    category: "kurta",
    price: 15500,
    rating: 4.6,
    reviewsCount: 29,
    description:
      "An elegant, understated, and highly functional ivory white kurta set presenting delicate self-textured geometric weave patterns.",
    imageUrl:
      "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&q=80&w=600",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
    sizes: ["38", "40", "42", "44", "46"],
    colors: [
      { name: "Pure Ivory", hex: "#FCFBF8" },
      { name: "Desert Sand", hex: "#E5D3B3" },
    ],
    inStock: true,
    featured: false,
    fabric: "Cotton Silk",
    occasion: "festive",
    fit: "classic",
    collection: "sovereign-classics",
  },
  {
    id: "p7",
    name: "Zardozi Zari Sherwani Collar Edition",
    category: "sherwani",
    price: 115000,
    rating: 4.9,
    reviewsCount: 12,
    description:
      "A deep midnight blue sherwani crafted in heavy premium Banarasi silk. Shows intricate tilla Zardozi detailing exclusively lining the high mandarin collar.",
    imageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
    sizes: ["38", "40", "42", "44"],
    colors: [
      { name: "Royal Indigo", hex: "#0B1D3A" },
      { name: "Emerald Velvet", hex: "#093627" },
    ],
    inStock: false,
    featured: true,
    fabric: "Banarasi Silk",
    occasion: "wedding",
    fit: "tailored",
    collection: "royal-bridal",
    badge: "Out of Stock",
  },
  {
    id: "p8",
    name: "Zari Embroidered Mojari",
    category: "accessories",
    price: 8500,
    rating: 4.8,
    reviewsCount: 40,
    description:
      "Authentic leather mojaris intricately hand-embroidered with real gold zari threads. Double-cushioned memory insoles.",
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
    sizes: ["7", "8", "9", "10", "11"],
    colors: [
      { name: "Artisan Gold", hex: "#C5A059" },
      { name: "Midnight Blue Velvet", hex: "#152238" },
    ],
    inStock: true,
    featured: false,
    fabric: "Leather & Velvet",
    occasion: "wedding",
    fit: "classic",
    collection: "sovereign-classics",
  },
];
export const colors = [
  { name: "Imperial Cream", hex: "#FDFBF7" },
  { name: "Champagne Gold", hex: "#F3E5AB" },
  { name: "Royal Maroon", hex: "#58181F" },
  { name: "Midnight Charcoal", hex: "#1C1C1C" },
  { name: "Beige Brocade", hex: "#EDDCB7" },
  { name: "Emerald Green", hex: "#0B5345" },
  { name: "Midnight Blue", hex: "#002046" },
];

export const sizes = ["38", "40", "42", "44", "46", "7", "8", "9", "10", "11"];

export const fabrics = [
  "Raw Silk",
  "Chanderi Silk",
  "Banarasi Brocade",
  "Handloom Silk",
  "Luxury Velvet",
  "Cotton Silk",
  "Banarasi Silk",
  "Leather & Velvet",
];

export const fits = ["structured", "classic", "tailored", "slim"];

export const occasions = [
  { label: "Wedding (Groom/Family)", value: "wedding" },
  { label: "Festive & Sangeet", value: "festive" },
  { label: "Evening Gala", value: "evening" },
];
