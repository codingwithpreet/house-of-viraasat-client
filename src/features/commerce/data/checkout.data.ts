export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  days: string;
  price: number;
  isFree?: boolean;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: "flat" | "percent";
  discountValue: number;
  minOrderValue: number;
}

export const shippingMethods: ShippingMethod[] = [
  {
    id: "sm1",
    name: "Standard Sovereign Delivery",
    description: "Tracked doorstep delivery with signature confirmation",
    days: "7–10 Business Days",
    price: 0,
    isFree: true,
  },
  {
    id: "sm2",
    name: "Express Heritage Delivery",
    description: "Priority handling and expedited courier service",
    days: "3–5 Business Days",
    price: 999,
  },
  {
    id: "sm3",
    name: "White Glove Atelier Delivery",
    description: "Concierge home delivery with garment steaming included",
    days: "1–2 Business Days (Select Cities)",
    price: 2499,
  },
];

export const validCoupons: Coupon[] = [
  {
    code: "ROYAL10",
    description: "10% off on orders above ₹50,000",
    discountType: "percent",
    discountValue: 10,
    minOrderValue: 50000,
  },
  {
    code: "HOV5000",
    description: "Flat ₹5,000 off on orders above ₹1,00,000",
    discountType: "flat",
    discountValue: 5000,
    minOrderValue: 100000,
  },
  {
    code: "FIRSTORDER",
    description: "Flat ₹2,000 off on your first atelier order",
    discountType: "flat",
    discountValue: 2000,
    minOrderValue: 0,
  },
];

export const TAX_RATE = 0.05; // 5% GST
