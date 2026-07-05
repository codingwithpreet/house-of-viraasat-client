import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import {
  CheckoutStepper,
  AddressCard,
  AddressForm,
  ShippingMethodSelector,
  BillingForm,
  PaymentSelector,
  CheckoutReview,
} from "../components/CheckoutComponents";
import { OrderSummary } from "../components/CommerceComponents";
import { initialCartItems } from "../data/cart.data";
import { mockAddresses } from "../data/addresses.data";
import { shippingMethods } from "../data/checkout.data";
import type { CartItem } from "../data/cart.data";
import type { Address } from "../data/addresses.data";

const STEP_LABELS = ["Shipping", "Billing", "Payment", "Review"];

import { useDocumentMetadata } from "../../../hooks/useDocumentMetadata";

export default function CheckoutPage() {
  useDocumentMetadata({
    title: "Secure Checkout",
    description:
      "Safely complete your order of handcrafted items using our multi-step secure checkout.",
    keywords: "secure checkout, payment, billing, shipping address",
  });

  const navigate = useNavigate();

  // Steps: 1 = Shipping, 2 = Billing, 3 = Payment, 4 = Review
  const [currentStep, setCurrentStep] = useState(1);

  // Cart state
  const [cartItems] = useState<CartItem[]>(initialCartItems);

  // Shipping state
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState(
    mockAddresses.find((a) => a.isDefault)?.id ?? mockAddresses[0]?.id ?? "",
  );
  const [selectedShippingId, setSelectedShippingId] = useState(shippingMethods[0].id);
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Payment state
  const [selectedPayment, setSelectedPayment] = useState("card");

  // Coupon (passed from cart or re-entered)
  const [couponDiscount] = useState(0);
  const [couponCode] = useState("");

  const selectedShipping =
    shippingMethods.find((m) => m.id === selectedShippingId) ?? shippingMethods[0];
  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  const handleAddAddress = (newAddr: Omit<Address, "id" | "isDefault">) => {
    const created: Address = { ...newAddr, id: `addr${Date.now()}`, isDefault: false };
    setAddresses((prev) => [...prev, created]);
    setSelectedAddressId(created.id);
    setShowAddressForm(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedAddressId === id) {
      setSelectedAddressId(addresses.find((a) => a.id !== id)?.id ?? "");
    }
  };

  const handlePlaceOrder = () => {
    navigate("/order-success");
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: "Shopping Bag", path: "/cart" },
            { label: STEP_LABELS[currentStep - 1] },
          ]}
        />

        <div className="mt-6 mb-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block mb-1">
            Atelier Checkout
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1C1C] font-light">
            Secure Checkout
          </h1>
        </div>

        {/* Stepper */}
        <CheckoutStepper currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT — Checkout Forms */}
          <div className="lg:col-span-7 space-y-6">
            {/* ── STEP 1: SHIPPING ── */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-lg text-[#1C1C1C] mb-4">Delivery Address</h2>
                  <div className="space-y-3" role="radiogroup" aria-label="Select delivery address">
                    {addresses.map((addr) => (
                      <AddressCard
                        key={addr.id}
                        address={addr}
                        selected={selectedAddressId === addr.id}
                        onSelect={setSelectedAddressId}
                        onDelete={handleDeleteAddress}
                      />
                    ))}
                  </div>
                  {!showAddressForm && (
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="mt-3 flex items-center gap-2 border border-dashed border-[#C5A059]/50 py-3 px-4 w-full text-[10px] uppercase tracking-wider font-medium font-sans text-[#C5A059] hover:border-[#C5A059] hover:bg-[#F5F2ED] transition-all cursor-pointer"
                    >
                      + Add New Address
                    </button>
                  )}
                  {showAddressForm && (
                    <div className="mt-4">
                      <AddressForm
                        onSave={handleAddAddress}
                        onCancel={() => setShowAddressForm(false)}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="font-serif text-lg text-[#1C1C1C] mb-4">Shipping Method</h2>
                  <ShippingMethodSelector
                    methods={shippingMethods}
                    selectedId={selectedShippingId}
                    onSelect={setSelectedShippingId}
                  />
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedAddressId}
                  className="w-full bg-[#1C1C1C] text-[#FDFCFB] py-4 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#540B0E] transition-all duration-300 disabled:opacity-40 cursor-pointer"
                >
                  Continue to Billing →
                </button>
              </div>
            )}

            {/* ── STEP 2: BILLING ── */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="font-serif text-lg text-[#1C1C1C]">Billing Information</h2>
                <BillingForm
                  shippingAddress={selectedAddress}
                  onComplete={() => setCurrentStep(3)}
                />
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-[10px] uppercase tracking-wider font-sans text-[#1C1C1C]/50 hover:text-[#1C1C1C] transition-colors cursor-pointer"
                >
                  ← Back to Shipping
                </button>
              </div>
            )}

            {/* ── STEP 3: PAYMENT ── */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="font-serif text-lg text-[#1C1C1C]">Payment Method</h2>
                <PaymentSelector
                  selectedMethod={selectedPayment}
                  onSelect={setSelectedPayment}
                  onComplete={() => setCurrentStep(4)}
                />
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-[10px] uppercase tracking-wider font-sans text-[#1C1C1C]/50 hover:text-[#1C1C1C] transition-colors cursor-pointer"
                >
                  ← Back to Billing
                </button>
              </div>
            )}

            {/* ── STEP 4: REVIEW ── */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="font-serif text-lg text-[#1C1C1C]">Review Your Order</h2>
                <CheckoutReview
                  items={cartItems}
                  shippingAddress={selectedAddress}
                  shippingMethodName={selectedShipping.name}
                  shippingCost={selectedShipping.price}
                  paymentMethod={selectedPayment}
                  couponCode={couponCode}
                  couponDiscount={couponDiscount}
                  onPlaceOrder={handlePlaceOrder}
                  onEdit={(step) => setCurrentStep(step)}
                />
                <button
                  onClick={() => setCurrentStep(3)}
                  className="text-[10px] uppercase tracking-wider font-sans text-[#1C1C1C]/50 hover:text-[#1C1C1C] transition-colors cursor-pointer"
                >
                  ← Back to Payment
                </button>
              </div>
            )}
          </div>

          {/* RIGHT — Sticky Order Summary */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-6 space-y-4">
              <OrderSummary
                items={cartItems}
                couponDiscount={couponDiscount}
                shippingCost={selectedShipping.price}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      {currentStep < 4 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FDFCFB]/95 backdrop-blur-md border-t border-[#E5E1DA] p-4 lg:hidden">
          <button
            onClick={() => setCurrentStep((s) => Math.min(s + 1, 4))}
            disabled={currentStep === 1 && !selectedAddressId}
            className="w-full bg-[#1C1C1C] text-[#FDFCFB] py-4 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#540B0E] transition-all cursor-pointer disabled:opacity-40"
          >
            {currentStep === 1
              ? "Continue to Billing"
              : currentStep === 2
                ? "Continue to Payment"
                : "Review Order"}{" "}
            →
          </button>
        </div>
      )}
    </div>
  );
}
