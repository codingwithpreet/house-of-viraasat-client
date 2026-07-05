import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ProductCard from "../../../components/ProductCard";
import {
  CartItemRow,
  OrderSummary,
  CouponForm,
  ShippingEstimator,
} from "../components/CommerceComponents";
import { initialCartItems } from "../data/cart.data";
import type { CartItem } from "../data/cart.data";
import { shippingMethods } from "../data/checkout.data";

const RECOMMENDED = [
  {
    id: "p9",
    name: "Royal Cream Silk Safa",
    category: "accessories",
    fabric: "Pure Silk",
    price: 4500,
    imageUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "p10",
    name: "Gold Zari Silk Pocket Square",
    category: "accessories",
    fabric: "Silk Zari",
    price: 1800,
    imageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "p11",
    name: "Embroidered Nehru Jacket",
    category: "nehru-jacket",
    fabric: "Georgette",
    price: 18500,
    badge: "New",
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "p5",
    name: "Midnight Velvet Bandhgala",
    category: "bandhgala",
    fabric: "Luxury Velvet",
    price: 58000,
    badge: "Atelier Classic",
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
  },
];

import { useDocumentMetadata } from "../../../hooks/useDocumentMetadata";

export default function CartPage() {
  useDocumentMetadata({
    title: "Atelier Shopping Bag",
    description: "Review your selected luxury menswear items and complete your purchase process.",
    keywords: "shopping bag, cart, luxury menswear purchase",
  });

  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>(initialCartItems);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [giftNote, setGiftNote] = useState("");
  const [showGiftNote, setShowGiftNote] = useState(false);

  const defaultShipping = shippingMethods[0];
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleQuantityChange = (id: string, qty: number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMoveToWishlist = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCouponApply = (discount: number, code: string) => {
    setCouponDiscount(discount);
    setAppliedCoupon(code);
  };

  const handleCouponRemove = () => {
    setCouponDiscount(0);
    setAppliedCoupon("");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center py-24 px-4 text-center">
        <ShoppingBag className="w-14 h-14 text-[#1C1C1C]/15 stroke-[1] mb-6" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block mb-3">
          Atelier Shopping Bag
        </span>
        <h2 className="font-serif text-2xl text-[#1C1C1C] font-light mb-3">Your Bag is Empty</h2>
        <p className="font-sans text-xs text-[#1C1C1C]/55 max-w-sm leading-relaxed mb-8">
          Explore the House of Viraasat collection and add your chosen pieces to the bag.
        </p>
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 bg-[#1C1C1C] text-[#FDFCFB] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#540B0E] transition-all duration-300"
        >
          Explore the Atelier
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Shopping Bag" }]} />

        <div className="mt-6 mb-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block mb-1">
            Atelier Shopping Bag
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1C1C] font-light">
            Your Selection
            <span className="ml-3 font-sans text-base text-[#1C1C1C]/40 font-normal">
              ({items.reduce((s, i) => s + i.quantity, 0)} item
              {items.reduce((s, i) => s + i.quantity, 0) > 1 ? "s" : ""})
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT — Cart Items */}
          <div className="lg:col-span-7 space-y-0">
            {/* Items */}
            <div className="border border-[#E5E1DA]">
              <div className="px-5 py-3 border-b border-[#E5E1DA] bg-[#F5F2ED]">
                <span className="text-[9px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]/60">
                  Curated Pieces
                </span>
              </div>
              <div className="px-5">
                {items.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                    onMoveToWishlist={handleMoveToWishlist}
                  />
                ))}
              </div>
            </div>

            {/* Coupon */}
            <div className="border border-[#E5E1DA] border-t-0 p-5 space-y-3">
              <span className="text-[9px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]/60">
                Atelier Privileges & Coupons
              </span>
              <CouponForm
                onApply={handleCouponApply}
                onRemove={handleCouponRemove}
                appliedCode={appliedCoupon}
                subtotal={subtotal}
              />
            </div>

            {/* Gift Note */}
            <div className="border border-[#E5E1DA] border-t-0 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]/60">
                  Gift Note
                </span>
                <button
                  onClick={() => setShowGiftNote(!showGiftNote)}
                  className="text-[9px] uppercase tracking-wider text-[#540B0E] font-sans cursor-pointer hover:underline"
                >
                  {showGiftNote ? "Hide" : "Add Note"}
                </button>
              </div>
              {showGiftNote && (
                <textarea
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Add a personalised gift message for the recipient..."
                  rows={3}
                  className="w-full border border-[#E5E1DA] px-4 py-3 text-xs font-sans text-[#1C1C1C] placeholder-[#1C1C1C]/35 focus:outline-none focus:border-[#C5A059] bg-transparent rounded-none resize-none"
                />
              )}
            </div>

            {/* Shipping Estimator */}
            <div className="border border-[#E5E1DA] border-t-0 p-5">
              <ShippingEstimator />
            </div>

            {/* Continue Shopping */}
            <div className="pt-4">
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider font-medium font-sans text-[#1C1C1C]/60 hover:text-[#1C1C1C] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5]" />
                Continue Exploring
              </Link>
            </div>
          </div>

          {/* RIGHT — Order Summary (sticky) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-6 space-y-4">
              <OrderSummary
                items={items}
                couponDiscount={couponDiscount}
                shippingCost={defaultShipping.price}
                showCheckoutButton
                onCheckout={() => navigate("/checkout")}
                checkoutLabel="Proceed to Checkout"
              />
              <p className="text-[9px] text-center font-sans text-[#1C1C1C]/40">
                Secure checkout · SSL Encrypted · Heritage Packaging Included
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <section className="mt-24 pt-12 border-t border-[#E5E1DA]">
          <div className="text-center mb-8 space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans">
              Complete the Ensemble
            </span>
            <h2 className="font-serif text-2xl text-[#1C1C1C] font-light">
              Pair With Your Selection
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {RECOMMENDED.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                title={p.name}
                category={p.category}
                fabric={p.fabric}
                price={p.price}
                imageUrl={p.imageUrl}
                badge={p.badge}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
