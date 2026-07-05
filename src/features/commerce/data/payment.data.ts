export interface PaymentMethod {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay, Amex",
    icon: "CreditCard",
  },
  { id: "upi", label: "UPI", description: "GPay, PhonePe, Paytm, BHIM", icon: "Smartphone" },
  {
    id: "netbanking",
    label: "Net Banking",
    description: "All major Indian banks supported",
    icon: "Building",
  },
  {
    id: "wallet",
    label: "Wallets",
    description: "Paytm Wallet, Amazon Pay, Mobikwik",
    icon: "Wallet",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when you receive your atelier order",
    icon: "HandCoins",
  },
];
