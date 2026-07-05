// ─────────────────────────────────────────────────────────
// Product Data – House of Viraasat
// ─────────────────────────────────────────────────────────

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductHighlight {
  icon: string; // lucide icon name
  label: string;
  description: string;
}

export interface DeliveryOption {
  name: string;
  days: string;
  price: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  sku: string;
  collection: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  inStock: boolean;
  stockStatus: "in-stock" | "low-stock" | "out-of-stock" | "made-to-order";
  stockCount?: number;
  rating: number;
  reviewsCount: number;
  images: ProductImage[];
  specifications: ProductSpec[];
  fabricAndCare: string[];
  highlights: ProductHighlight[];
  deliveryOptions: DeliveryOption[];
  estimatedDelivery: string;
  returnPolicy: string;
  shippingInfo: string;
  stylingTips: string[];
  sizingNotes: string;
}

export const productDetail: ProductDetail = {
  id: "p1",
  name: "Maharaja Cream Zardosi Sherwani",
  sku: "HOV-SHW-2024-001",
  collection: "Royal Bridal Series",
  category: "Sherwani",
  shortDescription:
    "A majestic ivory-cream sherwani tailored in pure raw silk, featuring exquisite hand-embroidered Zardosi work on the collar, cuffs, and placket.",
  longDescription: `The Maharaja Cream Zardosi Sherwani is a supreme expression of imperial tailoring — a creation that draws from centuries of royal Mughal court tradition and rearticulates it for the modern groom who demands the extraordinary.

Crafted from the finest raw silk sourced directly from Varanasi's heritage looms, this sherwani presents a base of warm ivory-cream — a tone historically associated with Nawabi families. The surface is alive with over 800 hours of hand-embroidered Zardosi detailing, woven by master artisans from Lucknow's legendary Chikan clusters. Real gold tilla wire, imported seed pearls, fine sequins, and real silver dabka thread are intricately layered to create a pattern inspired by the floral motifs of the Agra Fort's Musamman Burj chamber.

The mandarin collar is reinforced with a structured canvas interior for a perfect posture silhouette. Seven hand-stitched Kundan buttons — each uniquely crafted — run the length of the placket. The sherwani is fully lined with premium charmeuse silk for supreme comfort during extended ceremony durations.

Each House of Viraasat sherwani is a one-of-a-kind original. No two embroidery patterns are identical.`,
  price: 145000,
  originalPrice: 165000,
  badge: "Royal Groom",
  inStock: true,
  stockStatus: "low-stock",
  stockCount: 3,
  rating: 4.9,
  reviewsCount: 42,
  estimatedDelivery: "7–10 business days (Standard) · 3–5 days (Express)",
  returnPolicy:
    "We offer a 14-day exchange policy for size adjustments. Custom embroidery pieces are non-refundable once tailoring has commenced.",
  shippingInfo:
    "Free Standard Shipping on all orders above ₹50,000. Express delivery available across India. International shipping available to 40+ countries.",
  sizingNotes:
    "We recommend ordering a size up if between sizes. Our master tailors include two complimentary alteration sessions for all sherwani orders.",
  images: [
    {
      id: "img1",
      url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800",
      alt: "Maharaja Cream Zardosi Sherwani – Front view",
    },
    {
      id: "img2",
      url: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800",
      alt: "Maharaja Cream Zardosi Sherwani – Detail view",
    },
    {
      id: "img3",
      url: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&q=80&w=800",
      alt: "Maharaja Cream Zardosi Sherwani – Side view",
    },
    {
      id: "img4",
      url: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
      alt: "Maharaja Cream Zardosi Sherwani – Embroidery close-up",
    },
  ],
  specifications: [
    { label: "Fabric", value: "Pure Raw Silk (Varanasi Heritage Loom)" },
    { label: "Embroidery", value: "Hand-embroidered Zardosi (Gold Tilla & Dabka)" },
    { label: "Lining", value: "Premium Charmeuse Silk" },
    { label: "Buttons", value: "7 Hand-crafted Kundan Buttons" },
    { label: "Closure", value: "Concealed Hook & Button Placket" },
    { label: "Collar", value: "Structured Mandarin Collar with Canvas Interior" },
    { label: "Fit Type", value: "Structured Silhouette" },
    { label: "Length", value: "Knee Length (Standard) · Floor Length Available" },
    { label: "Country of Origin", value: "India (Lucknow Atelier)" },
    { label: "Wash Care", value: "Dry Clean Only" },
    { label: "Embroidery Hours", value: "Approx. 800+ Hours" },
  ],
  fabricAndCare: [
    "Dry Clean Only — no home washing.",
    "Store in the provided muslin dust bag when not in use.",
    "Avoid prolonged exposure to direct sunlight to preserve embroidery thread lustre.",
    "Do not iron directly on embroidery — press with a light cloth barrier.",
    "Handle seed pearl and tilla embroidery areas with care during donning.",
    "Perfume and deodorant should be applied before wearing to protect silk base.",
  ],
  highlights: [
    {
      icon: "Gem",
      label: "Zardosi Handcrafted",
      description: "Over 800 hours of hand embroidery by Lucknow master artisans",
    },
    {
      icon: "Sparkles",
      label: "Pure Raw Silk",
      description: "Heritage loom raw silk sourced directly from Varanasi",
    },
    {
      icon: "Crown",
      label: "Royal Bridal Series",
      description: "Part of our exclusive Royal Bridal limited edition collection",
    },
    {
      icon: "Scissors",
      label: "Master Tailored",
      description: "Structured canvas interior for perfect posture silhouette",
    },
    {
      icon: "RefreshCw",
      label: "Complimentary Alteration",
      description: "Two complimentary tailoring sessions included",
    },
    {
      icon: "Globe",
      label: "Worldwide Shipping",
      description: "Delivered to 40+ countries with premium packaging",
    },
  ],
  deliveryOptions: [
    { name: "Standard Delivery", days: "7–10 Business Days", price: "Free above ₹50,000" },
    { name: "Express Delivery", days: "3–5 Business Days", price: "₹999" },
    { name: "White Glove Delivery", days: "1–2 Business Days (Select Cities)", price: "₹2,499" },
  ],
  stylingTips: [
    "Pair with our Artisan Gold Zari Mojari for the complete groom ensemble.",
    "A classic Basra Pearl Mala complements the ivory-cream tone beautifully.",
    "A coordinated ivory silk safa with gold zari border completes the royal look.",
    "Opt for a matching ivory churidar or straight-cut salwar for the bottom.",
    "A subtle gold pocket square in the breast pocket adds editorial sophistication.",
  ],
};
