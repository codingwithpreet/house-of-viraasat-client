import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, Tag, MapPin, Truck } from "lucide-react";
import type { CartItem } from "../data/cart.data";
import { validCoupons, TAX_RATE } from "../data/checkout.data";

// ─── CART ITEM ────────────────────────────────────────────────────────────────
interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onMoveToWishlist?: (id: string) => void;
  compact?: boolean;
}

export function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
  onMoveToWishlist,
  compact = false,
}: CartItemRowProps) {
  return (
    <div className="flex gap-4 py-5 border-b border-[#E5E1DA]/70 last:border-none">
      <Link
        to={`/products/${item.productId}`}
        className={`flex-shrink-0 bg-[#F5F2ED] border border-[#E5E1DA]/50 overflow-hidden ${compact ? "w-16 aspect-[3/4]" : "w-24 aspect-[3/4]"}`}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover object-top"
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-medium font-sans">
            {item.fabric} · {item.category}
          </span>
          <Link
            to={`/products/${item.productId}`}
            className="font-serif text-sm text-[#1C1C1C] hover:text-[#540B0E] transition-colors block mt-0.5 line-clamp-1"
          >
            {item.name}
          </Link>
          <div className="flex gap-3 mt-1 text-[10px] font-sans text-[#1C1C1C]/60">
            <span>
              Size: <strong className="text-[#1C1C1C]">{item.size}</strong>
            </span>
            <span>
              Colour: <strong className="text-[#1C1C1C]">{item.color}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
          {/* Quantity controls */}
          <div className="flex items-center border border-[#E5E1DA]">
            <button
              onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
              disabled={item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center hover:bg-[#F5F2ED] transition-colors disabled:opacity-30 cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3 stroke-[1.5]" />
            </button>
            <span className="w-8 text-center text-xs font-semibold font-sans">{item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item.id, Math.min(10, item.quantity + 1))}
              disabled={item.quantity >= 10}
              className="w-8 h-8 flex items-center justify-center hover:bg-[#F5F2ED] transition-colors disabled:opacity-30 cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 stroke-[1.5]" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="font-sans font-semibold text-sm text-[#1C1C1C] block">
                ₹&nbsp;{(item.price * item.quantity).toLocaleString("en-IN")}
              </span>
              {item.originalPrice && (
                <span className="text-[10px] text-[#1C1C1C]/40 line-through font-sans">
                  ₹&nbsp;{(item.originalPrice * item.quantity).toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {onMoveToWishlist && !compact && (
              <button
                onClick={() => onMoveToWishlist(item.id)}
                className="text-[9px] uppercase tracking-wider text-[#1C1C1C]/40 hover:text-[#540B0E] transition-colors font-sans hidden sm:block cursor-pointer"
                aria-label="Move to wishlist"
              >
                Wishlist
              </button>
            )}

            <button
              onClick={() => onRemove(item.id)}
              className="text-[#1C1C1C]/35 hover:text-[#540B0E] transition-colors cursor-pointer"
              aria-label="Remove item from cart"
            >
              <Trash2 className="w-4 h-4 stroke-[1.25]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ORDER SUMMARY ────────────────────────────────────────────────────────────
interface OrderSummaryProps {
  items: CartItem[];
  couponDiscount: number;
  shippingCost: number;
  showCheckoutButton?: boolean;
  onCheckout?: () => void;
  checkoutLabel?: string;
}

export function OrderSummary({
  items,
  couponDiscount,
  shippingCost,
  showCheckoutButton = false,
  onCheckout,
  checkoutLabel = "Proceed to Checkout",
}: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalSubtotal = items.reduce(
    (sum, item) => sum + (item.originalPrice ?? item.price) * item.quantity,
    0,
  );
  const productDiscount = originalSubtotal - subtotal;
  const taxableAmount = subtotal - couponDiscount;
  const tax = Math.round(taxableAmount * TAX_RATE);
  const grandTotal = taxableAmount + tax + shippingCost;

  return (
    <div className="bg-[#F5F2ED] border border-[#E5E1DA] p-6 space-y-3">
      <h3 className="font-serif text-sm text-[#1C1C1C] tracking-wide mb-4">Order Summary</h3>

      <div className="space-y-2.5 text-xs font-sans">
        <div className="flex justify-between text-[#1C1C1C]/70">
          <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
          <span>₹&nbsp;{subtotal.toLocaleString("en-IN")}</span>
        </div>

        {productDiscount > 0 && (
          <div className="flex justify-between text-[#2A5C3A]">
            <span>Product Discount</span>
            <span>−&nbsp;₹&nbsp;{productDiscount.toLocaleString("en-IN")}</span>
          </div>
        )}

        {couponDiscount > 0 && (
          <div className="flex justify-between text-[#2A5C3A]">
            <span>Coupon Discount</span>
            <span>−&nbsp;₹&nbsp;{couponDiscount.toLocaleString("en-IN")}</span>
          </div>
        )}

        <div className="flex justify-between text-[#1C1C1C]/70">
          <span>Shipping</span>
          <span className={shippingCost === 0 ? "text-[#2A5C3A] font-medium" : ""}>
            {shippingCost === 0
              ? "Complimentary"
              : `₹&nbsp;${shippingCost.toLocaleString("en-IN")}`}
          </span>
        </div>

        <div className="flex justify-between text-[#1C1C1C]/70">
          <span>GST (5%)</span>
          <span>₹&nbsp;{tax.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div className="border-t border-[#E5E1DA] pt-3 flex justify-between items-baseline">
        <span className="font-serif text-sm font-semibold text-[#1C1C1C]">Grand Total</span>
        <span className="font-serif text-xl font-semibold text-[#540B0E]">
          ₹&nbsp;{grandTotal.toLocaleString("en-IN")}
        </span>
      </div>

      {showCheckoutButton && onCheckout && (
        <button
          onClick={onCheckout}
          className="w-full bg-[#1C1C1C] text-[#FDFCFB] py-4 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#540B0E] transition-all duration-300 rounded-none cursor-pointer mt-2"
        >
          {checkoutLabel}
        </button>
      )}
    </div>
  );
}

// ─── COUPON FORM ──────────────────────────────────────────────────────────────
interface CouponFormProps {
  onApply: (discount: number, code: string) => void;
  onRemove: () => void;
  appliedCode: string;
  subtotal: number;
}

export function CouponForm({ onApply, onRemove, appliedCode, subtotal }: CouponFormProps) {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleApply = () => {
    const coupon = validCoupons.find((c) => c.code === input.trim().toUpperCase());
    if (!coupon) {
      setStatus("error");
      setErrorMsg("Invalid coupon code. Please check and try again.");
      return;
    }
    if (subtotal < coupon.minOrderValue) {
      setStatus("error");
      setErrorMsg(
        `This coupon requires a minimum order of ₹${coupon.minOrderValue.toLocaleString("en-IN")}.`,
      );
      return;
    }
    const discount =
      coupon.discountType === "percent"
        ? Math.round(subtotal * (coupon.discountValue / 100))
        : coupon.discountValue;
    setStatus("success");
    onApply(discount, coupon.code);
  };

  const handleRemove = () => {
    setInput("");
    setStatus("idle");
    setErrorMsg("");
    onRemove();
  };

  if (appliedCode) {
    return (
      <div className="flex items-center justify-between bg-[#2A5C3A]/8 border border-[#2A5C3A]/25 p-3">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-[#2A5C3A]" strokeWidth={1.5} />
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold font-sans text-[#2A5C3A]">
              {appliedCode} Applied
            </span>
          </div>
        </div>
        <button
          onClick={handleRemove}
          className="text-[9px] uppercase tracking-wider text-[#1C1C1C]/50 hover:text-[#540B0E] font-sans cursor-pointer"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setStatus("idle");
          }}
          placeholder="Enter coupon code (try ROYAL10)"
          className="flex-1 border border-[#E5E1DA] px-3 py-3 text-xs font-sans text-[#1C1C1C] placeholder-[#1C1C1C]/35 focus:outline-none focus:border-[#C5A059] bg-transparent rounded-none"
        />
        <button
          onClick={handleApply}
          disabled={!input.trim()}
          className="border border-[#1C1C1C] py-3 px-5 text-[10px] uppercase tracking-widest font-medium font-sans text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FDFCFB] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Apply
        </button>
      </div>
      {status === "error" && <p className="text-[10px] font-sans text-[#991B1B]">{errorMsg}</p>}
    </div>
  );
}

// ─── SHIPPING ESTIMATOR ───────────────────────────────────────────────────────
export function ShippingEstimator() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleEstimate = () => {
    if (pincode.length === 6) {
      setResult("Standard Delivery: 7–10 days · Express: 3–5 days · Free above ₹50,000");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C]">
        <MapPin className="w-3.5 h-3.5 text-[#C5A059]" strokeWidth={1.5} />
        Estimate Delivery
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/, ""));
            setResult(null);
          }}
          placeholder="Enter pincode"
          className="flex-1 border border-[#E5E1DA] px-3 py-2.5 text-xs font-sans focus:outline-none focus:border-[#C5A059] bg-transparent rounded-none"
        />
        <button
          onClick={handleEstimate}
          disabled={pincode.length !== 6}
          className="border border-[#E5E1DA] py-2.5 px-4 text-[10px] uppercase tracking-wider font-sans text-[#1C1C1C] hover:border-[#C5A059] transition-all disabled:opacity-40 cursor-pointer"
        >
          Check
        </button>
      </div>
      {result && (
        <div className="flex items-start gap-2 text-[10px] font-sans text-[#1C1C1C]/70 bg-[#F5F2ED] p-3 border border-[#E5E1DA]/50">
          <Truck className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <span>{result}</span>
        </div>
      )}
    </div>
  );
}
