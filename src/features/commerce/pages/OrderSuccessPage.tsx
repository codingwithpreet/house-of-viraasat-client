import { Link } from "react-router-dom";
import { ArrowRight, Download, Package } from "lucide-react";
import { SuccessHero } from "../components/CheckoutComponents";
import ProductCard from "../../../components/ProductCard";

const ORDER_NUMBER = "HOV-2024-009142";
const ESTIMATED_DELIVERY = "14–17 July 2025";

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
    id: "p8",
    name: "Zari Embroidered Mojari",
    category: "accessories",
    fabric: "Leather & Velvet",
    price: 8500,
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
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
];

import { useDocumentMetadata } from "../../../hooks/useDocumentMetadata";

export default function OrderSuccessPage() {
  useDocumentMetadata({
    title: "Order Placed Successfully",
    description:
      "Thank you for shopping at House of Viraasat. Your artisan order has been received and confirmed.",
    keywords: "order success, order placement, purchase confirmation",
  });

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Hero */}
        <SuccessHero orderNumber={ORDER_NUMBER} estimatedDelivery={ESTIMATED_DELIVERY} />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button className="flex items-center justify-center gap-2 border border-[#E5E1DA] py-4 px-8 text-[10px] uppercase tracking-widest font-medium font-sans text-[#1C1C1C] hover:border-[#C5A059] transition-all cursor-pointer">
            <Package className="w-4 h-4 stroke-[1.5]" />
            Track Your Order
          </button>
          <button className="flex items-center justify-center gap-2 border border-[#E5E1DA] py-4 px-8 text-[10px] uppercase tracking-widest font-medium font-sans text-[#1C1C1C] hover:border-[#C5A059] transition-all cursor-pointer">
            <Download className="w-4 h-4 stroke-[1.5]" />
            Download Invoice
          </button>
        </div>

        {/* Confirmation note */}
        <div className="mt-8 bg-[#F5F2ED] border border-[#E5E1DA] p-5 text-center space-y-1">
          <p className="font-sans text-xs text-[#1C1C1C]/60 leading-relaxed">
            A confirmation email with your order details and tracking information will be sent to
            your registered email address within the next 30 minutes.
          </p>
          <p className="font-sans text-[10px] text-[#C5A059]">Order Reference: {ORDER_NUMBER}</p>
        </div>

        {/* Craft timeline */}
        <div className="mt-10 border border-[#E5E1DA]">
          <div className="px-5 py-3 border-b border-[#E5E1DA] bg-[#F5F2ED]">
            <span className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]/60">
              What Happens Next
            </span>
          </div>
          <div className="p-5 space-y-5">
            {[
              {
                step: "1",
                title: "Order Received",
                desc: "Your order has been confirmed and our artisan team notified.",
                done: true,
              },
              {
                step: "2",
                title: "Crafting & Embroidery",
                desc: "Your piece enters the embroidery atelier for handcraft completion.",
                done: false,
              },
              {
                step: "3",
                title: "Quality Inspection",
                desc: "Each piece undergoes a 12-point quality and embroidery inspection.",
                done: false,
              },
              {
                step: "4",
                title: "Heritage Packaging",
                desc: "Carefully packed in our signature heritage gift box.",
                done: false,
              },
              {
                step: "5",
                title: "Dispatch & Delivery",
                desc: `Shipped via your selected courier. Estimated delivery: ${ESTIMATED_DELIVERY}.`,
                done: false,
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-[10px] font-semibold font-sans ${item.done ? "border-[#C5A059] bg-[#C5A059] text-[#FDFCFB]" : "border-[#E5E1DA] text-[#1C1C1C]/30"}`}
                >
                  {item.done ? "✓" : item.step}
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C] block">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-sans text-[#1C1C1C]/55 leading-relaxed">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-8">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-medium font-sans text-[#1C1C1C] hover:text-[#540B0E] transition-colors"
          >
            Continue Exploring the Atelier
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
          </Link>
        </div>
      </div>

      {/* Recommendations */}
      <div className="border-t border-[#E5E1DA] mt-16 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans">
              Complete the Ensemble
            </span>
            <h2 className="font-serif text-2xl text-[#1C1C1C] font-light">
              Pair With Your New Piece
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
        </div>
      </div>
    </div>
  );
}
