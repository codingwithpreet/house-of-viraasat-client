import { useState } from "react";
import {
  Check,
  ChevronRight,
  Edit2,
  Trash2,
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  Package,
  ShieldCheck,
} from "lucide-react";
import type { Address } from "../data/addresses.data";
import type { ShippingMethod } from "../data/checkout.data";
import type { CartItem } from "../data/cart.data";
import { TAX_RATE } from "../data/checkout.data";

// ─── CHECKOUT STEPPER ─────────────────────────────────────────────────────────
const STEPS = ["Shipping", "Billing", "Payment", "Review"];

interface CheckoutStepperProps {
  currentStep: number;
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <nav aria-label="Checkout progress" className="mb-10">
      <ol className="flex items-center gap-0">
        {STEPS.map((label, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <li key={label} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all text-[10px] font-semibold font-sans ${
                    isCompleted
                      ? "bg-[#1C1C1C] border-[#1C1C1C] text-[#FDFCFB]"
                      : isActive
                        ? "bg-[#FDFCFB] border-[#1C1C1C] text-[#1C1C1C]"
                        : "bg-[#FDFCFB] border-[#E5E1DA] text-[#1C1C1C]/30"
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2]" /> : stepNum}
                </div>
                <span
                  className={`text-[9px] uppercase tracking-widest font-sans hidden sm:block ${
                    isActive ? "text-[#1C1C1C] font-semibold" : "text-[#1C1C1C]/40"
                  }`}
                >
                  {label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-2 transition-all ${
                    isCompleted ? "bg-[#1C1C1C]" : "bg-[#E5E1DA]"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ─── ADDRESS CARD ─────────────────────────────────────────────────────────────
interface AddressCardProps {
  address: Address;
  selected: boolean;
  onSelect: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function AddressCard({ address, selected, onSelect, onEdit, onDelete }: AddressCardProps) {
  return (
    <div
      onClick={() => onSelect(address.id)}
      className={`border p-4 cursor-pointer transition-all ${
        selected ? "border-[#1C1C1C] bg-[#F5F2ED]" : "border-[#E5E1DA] hover:border-[#C5A059]"
      }`}
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(address.id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={`w-4 h-4 mt-0.5 rounded-full border-2 flex-shrink-0 transition-colors ${
              selected ? "border-[#1C1C1C] bg-[#1C1C1C]" : "border-[#E5E1DA]"
            }`}
          />
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs font-semibold text-[#1C1C1C]">
                {address.fullName}
              </span>
              <span className="text-[9px] uppercase tracking-wider border border-[#E5E1DA] px-1.5 py-0.5 font-sans text-[#1C1C1C]/50">
                {address.label}
              </span>
              {address.isDefault && (
                <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-semibold font-sans">
                  Default
                </span>
              )}
            </div>
            <p className="font-sans text-xs text-[#1C1C1C]/65 leading-relaxed">
              {address.line1}
              {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state} –{" "}
              {address.pincode}
            </p>
            <p className="font-sans text-[10px] text-[#1C1C1C]/50">{address.phone}</p>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(address.id);
              }}
              className="p-1.5 text-[#1C1C1C]/40 hover:text-[#1C1C1C] transition-colors cursor-pointer"
              aria-label="Edit address"
            >
              <Edit2 className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          )}
          {onDelete && !address.isDefault && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(address.id);
              }}
              className="p-1.5 text-[#1C1C1C]/40 hover:text-[#540B0E] transition-colors cursor-pointer"
              aria-label="Delete address"
            >
              <Trash2 className="w-3.5 h-3.5 stroke-[1.25]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ADDRESS FORM ─────────────────────────────────────────────────────────────
interface AddressFormProps {
  onSave: (address: Omit<Address, "id" | "isDefault">) => void;
  onCancel: () => void;
  initial?: Partial<Address>;
}

const inputCls =
  "w-full border border-[#E5E1DA] px-4 py-3 text-xs font-sans text-[#1C1C1C] placeholder-[#1C1C1C]/35 focus:outline-none focus:border-[#C5A059] bg-transparent rounded-none";
const labelCls =
  "block text-[9px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]/60 mb-1.5";

export function AddressForm({ onSave, onCancel, initial }: AddressFormProps) {
  const [form, setForm] = useState({
    label: initial?.label ?? "Home",
    fullName: initial?.fullName ?? "",
    phone: initial?.phone ?? "",
    line1: initial?.line1 ?? "",
    line2: initial?.line2 ?? "",
    city: initial?.city ?? "",
    state: initial?.state ?? "",
    pincode: initial?.pincode ?? "",
    country: "India",
  });

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-[#E5E1DA] bg-[#F5F2ED]/40">
      <h4 className="font-serif text-sm text-[#1C1C1C]">Add New Address</h4>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Full Name *</label>
          <input
            required
            value={form.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            placeholder="Full name"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Phone *</label>
          <input
            required
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Address Line 1 *</label>
        <input
          required
          value={form.line1}
          onChange={(e) => set("line1", e.target.value)}
          placeholder="Flat / House No., Building, Street"
          className={inputCls}
        />
      </div>

      <div>
        <label className={labelCls}>Address Line 2</label>
        <input
          value={form.line2}
          onChange={(e) => set("line2", e.target.value)}
          placeholder="Area, Colony, Landmark (optional)"
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className={labelCls}>City *</label>
          <input
            required
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="City"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>State *</label>
          <input
            required
            value={form.state}
            onChange={(e) => set("state", e.target.value)}
            placeholder="State"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Pincode *</label>
          <input
            required
            maxLength={6}
            value={form.pincode}
            onChange={(e) => set("pincode", e.target.value.replace(/\D/, ""))}
            placeholder="Pincode"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Label</label>
        <div className="flex gap-2">
          {["Home", "Office", "Other"].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => set("label", l)}
              className={`border py-2 px-4 text-[10px] uppercase tracking-wider font-medium font-sans transition-all cursor-pointer ${
                form.label === l
                  ? "bg-[#1C1C1C] text-[#FDFCFB] border-[#1C1C1C]"
                  : "border-[#E5E1DA] text-[#1C1C1C] hover:border-[#C5A059]"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-[#1C1C1C] text-[#FDFCFB] py-3 text-[10px] uppercase tracking-widest font-medium font-sans hover:bg-[#540B0E] transition-all cursor-pointer"
        >
          Save Address
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-[#E5E1DA] py-3 px-5 text-[10px] uppercase tracking-widest font-medium font-sans text-[#1C1C1C] hover:border-[#C5A059] transition-all cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ─── SHIPPING METHOD SELECTOR ─────────────────────────────────────────────────
interface ShippingMethodSelectorProps {
  methods: ShippingMethod[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ShippingMethodSelector({
  methods,
  selectedId,
  onSelect,
}: ShippingMethodSelectorProps) {
  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <div
          key={method.id}
          onClick={() => onSelect(method.id)}
          role="radio"
          aria-checked={selectedId === method.id}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onSelect(method.id)}
          className={`border p-4 cursor-pointer transition-all flex items-center justify-between gap-4 ${
            selectedId === method.id
              ? "border-[#1C1C1C] bg-[#F5F2ED]"
              : "border-[#E5E1DA] hover:border-[#C5A059]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${selectedId === method.id ? "border-[#1C1C1C] bg-[#1C1C1C]" : "border-[#E5E1DA]"}`}
            />
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C] block">
                {method.name}
              </span>
              <span className="text-[10px] font-sans text-[#1C1C1C]/55">{method.description}</span>
              <span className="text-[10px] font-sans text-[#C5A059] block">{method.days}</span>
            </div>
          </div>
          <span
            className={`text-xs font-semibold font-sans flex-shrink-0 ${method.isFree ? "text-[#2A5C3A]" : "text-[#1C1C1C]"}`}
          >
            {method.isFree ? "Free" : `₹${method.price.toLocaleString("en-IN")}`}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── BILLING FORM ─────────────────────────────────────────────────────────────
interface BillingFormProps {
  shippingAddress: Address | undefined;
  onComplete: (sameAsShipping: boolean) => void;
}

export function BillingForm({ shippingAddress, onComplete }: BillingFormProps) {
  const [sameAsShipping, setSameAsShipping] = useState(true);

  return (
    <div className="space-y-6">
      <div
        onClick={() => setSameAsShipping(true)}
        className={`border p-4 cursor-pointer transition-all flex items-center gap-3 ${sameAsShipping ? "border-[#1C1C1C] bg-[#F5F2ED]" : "border-[#E5E1DA] hover:border-[#C5A059]"}`}
      >
        <div
          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${sameAsShipping ? "border-[#1C1C1C] bg-[#1C1C1C]" : "border-[#E5E1DA]"}`}
        />
        <div>
          <span className="text-[10px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C] block">
            Same as Shipping Address
          </span>
          {shippingAddress && (
            <span className="text-[10px] font-sans text-[#1C1C1C]/55">
              {shippingAddress.line1}, {shippingAddress.city}
            </span>
          )}
        </div>
      </div>

      <div
        onClick={() => setSameAsShipping(false)}
        className={`border p-4 cursor-pointer transition-all flex items-center gap-3 ${!sameAsShipping ? "border-[#1C1C1C] bg-[#F5F2ED]" : "border-[#E5E1DA] hover:border-[#C5A059]"}`}
      >
        <div
          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${!sameAsShipping ? "border-[#1C1C1C] bg-[#1C1C1C]" : "border-[#E5E1DA]"}`}
        />
        <span className="text-[10px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C]">
          Use a Different Billing Address
        </span>
      </div>

      {!sameAsShipping && (
        <div className="space-y-3 pl-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>GST Number (Optional)</label>
              <input placeholder="e.g. 27AAPFU0939F1ZV" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Company Name (Optional)</label>
              <input placeholder="Company or Firm Name" className={inputCls} />
            </div>
          </div>
          <p className="text-[10px] font-sans text-[#1C1C1C]/50">
            Providing GST details enables a GST invoice. Contact us to request a formal invoice.
          </p>
        </div>
      )}

      <button
        onClick={() => onComplete(sameAsShipping)}
        className="w-full bg-[#1C1C1C] text-[#FDFCFB] py-4 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#540B0E] transition-all duration-300 cursor-pointer"
      >
        Continue to Payment <ChevronRight className="inline w-4 h-4 ml-1 stroke-[1.5]" />
      </button>
    </div>
  );
}

// ─── PAYMENT SELECTOR ─────────────────────────────────────────────────────────
const paymentIcons: Record<
  string,
  React.ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  HandCoins: Package,
};

interface PaymentSelectorProps {
  selectedMethod: string;
  onSelect: (id: string) => void;
  onComplete: () => void;
}

export function PaymentSelector({ selectedMethod, onSelect, onComplete }: PaymentSelectorProps) {
  const methods = [
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
      description: "All major Indian banks",
      icon: "Building",
    },
    { id: "wallet", label: "Wallets", description: "Paytm, Amazon Pay, Mobikwik", icon: "Wallet" },
    {
      id: "cod",
      label: "Cash on Delivery",
      description: "Pay on receipt · Available for orders below ₹2,00,000",
      icon: "HandCoins",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {methods.map((method) => {
          const Icon = paymentIcons[method.icon] ?? CreditCard;
          return (
            <div key={method.id}>
              <div
                onClick={() => onSelect(method.id)}
                className={`border p-4 cursor-pointer transition-all flex items-center gap-3 ${selectedMethod === method.id ? "border-[#1C1C1C] bg-[#F5F2ED]" : "border-[#E5E1DA] hover:border-[#C5A059]"}`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${selectedMethod === method.id ? "border-[#1C1C1C] bg-[#1C1C1C]" : "border-[#E5E1DA]"}`}
                />
                <Icon className="w-4 h-4 text-[#C5A059] flex-shrink-0" strokeWidth={1.25} />
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C] block">
                    {method.label}
                  </span>
                  <span className="text-[10px] font-sans text-[#1C1C1C]/50">
                    {method.description}
                  </span>
                </div>
              </div>

              {/* Inline form for selected method */}
              {selectedMethod === method.id && (
                <div className="border border-t-0 border-[#1C1C1C] p-4 bg-[#F5F2ED]/70">
                  {method.id === "card" && <CardForm />}
                  {method.id === "upi" && <UPIForm />}
                  {method.id === "netbanking" && (
                    <select className="w-full border border-[#E5E1DA] px-4 py-3 text-xs font-sans text-[#1C1C1C] bg-transparent focus:outline-none focus:border-[#C5A059] rounded-none">
                      <option>Select your bank</option>
                      {[
                        "HDFC Bank",
                        "ICICI Bank",
                        "SBI",
                        "Axis Bank",
                        "Kotak Bank",
                        "Yes Bank",
                      ].map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  )}
                  {method.id === "wallet" && (
                    <div className="flex gap-2 flex-wrap">
                      {["Paytm Wallet", "Amazon Pay", "Mobikwik", "PhonePe"].map((w) => (
                        <button
                          key={w}
                          className="border border-[#E5E1DA] py-2 px-4 text-[10px] uppercase tracking-wider font-medium font-sans text-[#1C1C1C] hover:border-[#C5A059] transition-all cursor-pointer"
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  )}
                  {method.id === "cod" && (
                    <p className="text-[11px] font-sans text-[#1C1C1C]/65 leading-relaxed">
                      Cash on Delivery is available for orders up to ₹2,00,000. Our courier partner
                      will collect payment at the time of delivery.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-[10px] font-sans text-[#1C1C1C]/50">
        <ShieldCheck className="w-4 h-4 text-[#2A5C3A]" strokeWidth={1.25} />
        All transactions are secured with 256-bit SSL encryption.
      </div>

      <button
        onClick={onComplete}
        className="w-full bg-[#1C1C1C] text-[#FDFCFB] py-4 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#540B0E] transition-all duration-300 cursor-pointer"
      >
        Review Order <ChevronRight className="inline w-4 h-4 ml-1 stroke-[1.5]" />
      </button>
    </div>
  );
}

// ─── CARD FORM ────────────────────────────────────────────────────────────────
export function CardForm() {
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const formatCard = (val: string) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  return (
    <div className="space-y-3">
      <div>
        <label className={labelCls}>Card Number</label>
        <input
          value={number}
          onChange={(e) => setNumber(formatCard(e.target.value))}
          placeholder="0000 0000 0000 0000"
          maxLength={19}
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>Name on Card</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="As printed on card"
          className={inputCls}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Expiry Date</label>
          <input
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            placeholder="MM/YY"
            maxLength={5}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>CVV</label>
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.slice(0, 4))}
            placeholder="•••"
            maxLength={4}
            className={inputCls}
          />
        </div>
      </div>
    </div>
  );
}

// ─── UPI FORM ─────────────────────────────────────────────────────────────────
export function UPIForm() {
  const [upiId, setUpiId] = useState("");
  const [verified, setVerified] = useState<boolean | null>(null);

  const handleVerify = () => {
    setVerified(upiId.includes("@"));
  };

  return (
    <div className="space-y-3">
      <div>
        <label className={labelCls}>UPI ID</label>
        <div className="flex gap-2">
          <input
            value={upiId}
            onChange={(e) => {
              setUpiId(e.target.value);
              setVerified(null);
            }}
            placeholder="yourname@upi"
            className={`${inputCls} flex-1`}
          />
          <button
            onClick={handleVerify}
            className="border border-[#E5E1DA] py-3 px-4 text-[10px] uppercase tracking-wider font-sans text-[#1C1C1C] hover:border-[#C5A059] transition-all cursor-pointer whitespace-nowrap"
          >
            Verify
          </button>
        </div>
        {verified === true && (
          <p className="text-[10px] text-[#2A5C3A] mt-1">✓ UPI ID verified successfully</p>
        )}
        {verified === false && (
          <p className="text-[10px] text-[#991B1B] mt-1">
            Invalid UPI ID format. Please check and retry.
          </p>
        )}
      </div>
      <p className="text-[10px] font-sans text-[#1C1C1C]/50">
        You'll receive a payment request on your UPI app after placing the order.
      </p>
    </div>
  );
}

// ─── CHECKOUT REVIEW ─────────────────────────────────────────────────────────
interface CheckoutReviewProps {
  items: CartItem[];
  shippingAddress: Address | undefined;
  shippingMethodName: string;
  shippingCost: number;
  paymentMethod: string;
  couponCode: string;
  couponDiscount: number;
  onPlaceOrder: () => void;
  onEdit: (step: number) => void;
}

export function CheckoutReview({
  items,
  shippingAddress,
  shippingMethodName,
  shippingCost,
  paymentMethod,
  couponCode,
  couponDiscount,
  onPlaceOrder,
  onEdit,
}: CheckoutReviewProps) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = Math.round((subtotal - couponDiscount) * TAX_RATE);
  const grandTotal = subtotal - couponDiscount + tax + shippingCost;

  return (
    <div className="space-y-6">
      {/* Products */}
      <div className="border border-[#E5E1DA]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E1DA] bg-[#F5F2ED]">
          <span className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]">
            Items ({items.length})
          </span>
          <button
            onClick={() => onEdit(1)}
            className="text-[9px] uppercase tracking-wider text-[#540B0E] font-sans cursor-pointer hover:underline"
          >
            Edit
          </button>
        </div>
        <div className="p-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              <div className="w-12 aspect-[3/4] bg-[#F5F2ED] border border-[#E5E1DA]/50 overflow-hidden flex-shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-xs text-[#1C1C1C] line-clamp-1">{item.name}</p>
                <p className="text-[10px] font-sans text-[#1C1C1C]/55">
                  Size: {item.size} · Colour: {item.color} · Qty: {item.quantity}
                </p>
              </div>
              <span className="text-xs font-semibold font-sans text-[#1C1C1C] flex-shrink-0">
                ₹&nbsp;{(item.price * item.quantity).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping */}
      <div className="border border-[#E5E1DA]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E1DA] bg-[#F5F2ED]">
          <span className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]">
            Delivery
          </span>
          <button
            onClick={() => onEdit(1)}
            className="text-[9px] uppercase tracking-wider text-[#540B0E] font-sans cursor-pointer hover:underline"
          >
            Edit
          </button>
        </div>
        <div className="p-4 space-y-1.5">
          {shippingAddress && (
            <p className="text-xs font-sans text-[#1C1C1C]/70">
              {shippingAddress.fullName} · {shippingAddress.line1}, {shippingAddress.city} –{" "}
              {shippingAddress.pincode}
            </p>
          )}
          <p className="text-[10px] font-sans text-[#C5A059] uppercase tracking-wider">
            {shippingMethodName}
          </p>
        </div>
      </div>

      {/* Payment */}
      <div className="border border-[#E5E1DA]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E1DA] bg-[#F5F2ED]">
          <span className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]">
            Payment
          </span>
          <button
            onClick={() => onEdit(3)}
            className="text-[9px] uppercase tracking-wider text-[#540B0E] font-sans cursor-pointer hover:underline"
          >
            Edit
          </button>
        </div>
        <div className="p-4">
          <p className="text-xs font-sans text-[#1C1C1C]/70 capitalize">
            {paymentMethod.replace("_", " ")}
            {couponCode && <span className="ml-3 text-[#2A5C3A]">· Coupon: {couponCode}</span>}
          </p>
        </div>
      </div>

      {/* Totals */}
      <div className="bg-[#F5F2ED] border border-[#E5E1DA] p-5 space-y-2.5">
        {[
          { label: "Subtotal", value: `₹ ${subtotal.toLocaleString("en-IN")}` },
          couponDiscount > 0
            ? {
                label: "Coupon Discount",
                value: `− ₹ ${couponDiscount.toLocaleString("en-IN")}`,
                green: true,
              }
            : null,
          {
            label: "Shipping",
            value:
              shippingCost === 0 ? "Complimentary" : `₹ ${shippingCost.toLocaleString("en-IN")}`,
          },
          { label: "GST (5%)", value: `₹ ${tax.toLocaleString("en-IN")}` },
        ]
          .filter(Boolean)
          .map(
            (row) =>
              row && (
                <div
                  key={row.label}
                  className={`flex justify-between text-xs font-sans ${row.green ? "text-[#2A5C3A]" : "text-[#1C1C1C]/70"}`}
                >
                  <span>{row.label}</span>
                  <span>{row.value}</span>
                </div>
              ),
          )}
        <div className="border-t border-[#E5E1DA] pt-3 flex justify-between items-baseline">
          <span className="font-serif text-sm font-semibold">Grand Total</span>
          <span className="font-serif text-xl font-bold text-[#540B0E]">
            ₹&nbsp;{grandTotal.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <button
        onClick={onPlaceOrder}
        className="w-full bg-[#540B0E] text-[#FDFCFB] py-5 text-[11px] font-medium tracking-[0.4em] uppercase hover:bg-[#1C1C1C] transition-all duration-300 cursor-pointer"
      >
        Place Your Order
      </button>
      <p className="text-[9px] text-center font-sans text-[#1C1C1C]/40">
        By placing your order you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}

// ─── SUCCESS HERO ─────────────────────────────────────────────────────────────
interface SuccessHeroProps {
  orderNumber: string;
  estimatedDelivery: string;
}

export function SuccessHero({ orderNumber, estimatedDelivery }: SuccessHeroProps) {
  return (
    <div className="text-center space-y-5 py-10">
      {/* Animated checkmark */}
      <div className="w-20 h-20 rounded-full border-2 border-[#C5A059] flex items-center justify-center mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#F5F2ED] flex items-center justify-center">
          <Check className="w-8 h-8 text-[#C5A059] stroke-[1.5]" />
        </div>
      </div>

      <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium font-sans block">
        Order Confirmed
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1C1C] font-light leading-tight">
        Your Atelier Order
        <br />
        is Placed
      </h1>
      <p className="font-sans text-sm text-[#1C1C1C]/60 max-w-md mx-auto leading-relaxed">
        Thank you for entrusting the House of Viraasat with your ceremonial wardrobe. Your master
        artisans have been notified.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
        <div className="border border-[#E5E1DA] px-8 py-4 text-center">
          <span className="text-[9px] uppercase tracking-widest font-sans text-[#1C1C1C]/50 block mb-1">
            Order Number
          </span>
          <span className="font-serif text-lg text-[#1C1C1C] font-semibold">{orderNumber}</span>
        </div>
        <div className="border border-[#E5E1DA] px-8 py-4 text-center">
          <span className="text-[9px] uppercase tracking-widest font-sans text-[#1C1C1C]/50 block mb-1">
            Estimated Delivery
          </span>
          <span className="font-serif text-lg text-[#1C1C1C] font-semibold">
            {estimatedDelivery}
          </span>
        </div>
      </div>
    </div>
  );
}
