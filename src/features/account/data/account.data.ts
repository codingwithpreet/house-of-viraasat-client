// ─────────────────────────────────────────────────────────────────────────────
// Account Mock Data – House of Viraasat
// ─────────────────────────────────────────────────────────────────────────────

export interface CustomerProfile {
  fullName: string;
  email: string;
  phone: string;
  memberSince: string;
  loyaltyTier: string;
  loyaltyPoints: number;
  profileCompletion: number;
  avatarUrl?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  imageUrl: string;
}

export interface OrderStatusStep {
  title: string;
  description: string;
  date?: string;
  done: boolean;
}

export interface OrderHistoryRecord {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  trackingNumber?: string;
  estimatedDelivery?: string;
  items: OrderItem[];
  timeline: OrderStatusStep[];
  paymentMethod: string;
  shippingAddress: string;
}

export const mockProfile: CustomerProfile = {
  fullName: "Arjun Mehta",
  email: "arjun.mehta@goldpatron.in",
  phone: "+91 98765 43210",
  memberSince: "October 2024",
  loyaltyTier: "Viraasat Club · Gold Member",
  loyaltyPoints: 1500,
  profileCompletion: 85,
  avatarUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
};

export const mockOrders: OrderHistoryRecord[] = [
  {
    id: "o1",
    orderNumber: "HOV-2024-009765",
    date: "05 July 2026",
    total: 58000,
    status: "Processing",
    estimatedDelivery: "12–15 July 2026",
    paymentMethod: "Credit Card (ending in 4242)",
    shippingAddress:
      "Flat 12B, Prestige Towers, Linking Road, Bandra West, Mumbai, Maharashtra – 400050",
    items: [
      {
        productId: "p5",
        name: "Midnight Velvet Bandhgala",
        price: 58000,
        quantity: 1,
        size: "40",
        color: "Midnight Blue",
        imageUrl:
          "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=400",
      },
    ],
    timeline: [
      {
        title: "Order Confirmed",
        description: "Atelier has received and validated the order.",
        date: "05 July 2026, 06:45 AM",
        done: true,
      },
      {
        title: "Tailoring Started",
        description: "Canvas structure modeling has begun.",
        date: "05 July 2026, 11:30 AM",
        done: true,
      },
      {
        title: "Embroidery Process",
        description: "Hand embroidery Zari details being applied.",
        done: false,
      },
      {
        title: "Quality Audit",
        description: "Final 12-point inspection by master tailor.",
        done: false,
      },
      {
        title: "Dispatched",
        description: "Heritage box handoff to priority carrier.",
        done: false,
      },
    ],
  },
  {
    id: "o2",
    orderNumber: "HOV-2024-009142",
    date: "14 June 2025",
    total: 153500,
    status: "Delivered",
    trackingNumber: "HOV-TRK-77192",
    estimatedDelivery: "21 June 2025",
    paymentMethod: "UPI (arjun@okaxis)",
    shippingAddress:
      "Flat 12B, Prestige Towers, Linking Road, Bandra West, Mumbai, Maharashtra – 400050",
    items: [
      {
        productId: "p1",
        name: "Maharaja Cream Zardosi Sherwani",
        price: 145000,
        quantity: 1,
        size: "38",
        color: "Imperial Cream",
        imageUrl:
          "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=400",
      },
      {
        productId: "p8",
        name: "Zari Embroidered Mojari",
        price: 8500,
        quantity: 1,
        size: "9",
        color: "Artisan Gold",
        imageUrl:
          "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=400",
      },
    ],
    timeline: [
      {
        title: "Order Confirmed",
        description: "Order confirmed.",
        date: "14 June 2025",
        done: true,
      },
      {
        title: "Tailoring Completed",
        description: "Garment customized successfully.",
        date: "18 June 2025",
        done: true,
      },
      {
        title: "Quality Audit",
        description: "Inspected and passed.",
        date: "19 June 2025",
        done: true,
      },
      {
        title: "Dispatched",
        description: "Handed over to priority shipping partner.",
        date: "20 June 2025",
        done: true,
      },
      {
        title: "Delivered",
        description: "Signature package received by patron.",
        date: "21 June 2025",
        done: true,
      },
    ],
  },
  {
    id: "o3",
    orderNumber: "HOV-2024-008311",
    date: "02 March 2025",
    total: 34500,
    status: "Delivered",
    trackingNumber: "HOV-TRK-66101",
    estimatedDelivery: "09 March 2025",
    paymentMethod: "Net Banking (HDFC)",
    shippingAddress:
      "Flat 12B, Prestige Towers, Linking Road, Bandra West, Mumbai, Maharashtra – 400050",
    items: [
      {
        productId: "p3",
        name: "Brocade Bundi & Kurta Ensemble",
        price: 34500,
        quantity: 1,
        size: "40",
        color: "Gold Brocade",
        imageUrl:
          "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=400",
      },
    ],
    timeline: [
      {
        title: "Order Confirmed",
        description: "Order confirmed.",
        date: "02 March 2025",
        done: true,
      },
      { title: "Dispatched", description: "Shipped.", date: "06 March 2025", done: true },
      { title: "Delivered", description: "Delivered.", date: "09 March 2025", done: true },
    ],
  },
];
