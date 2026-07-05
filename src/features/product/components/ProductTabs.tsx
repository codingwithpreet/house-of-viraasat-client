import { useState } from "react";
import type { ProductDetail } from "../data/product.data";

interface ProductTabsProps {
  product: ProductDetail;
}

const tabs = [
  { id: "description", label: "Description" },
  { id: "specifications", label: "Specifications" },
  { id: "care", label: "Fabric & Care" },
  { id: "shipping", label: "Shipping" },
  { id: "returns", label: "Returns" },
  { id: "styling", label: "Styling Tips" },
];

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="border-t border-[#E5E1DA]">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto border-b border-[#E5E1DA] scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`flex-shrink-0 px-5 py-4 text-[10px] uppercase tracking-widest font-medium font-sans transition-all relative cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? "text-[#1C1C1C] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A059]"
                : "text-[#1C1C1C]/45 hover:text-[#1C1C1C]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-8 px-1" role="tabpanel" aria-label={`${activeTab} tab content`}>
        {activeTab === "description" && (
          <div className="max-w-3xl">
            <div className="font-sans text-sm text-[#1C1C1C]/80 leading-relaxed whitespace-pre-line">
              {product.longDescription}
            </div>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="max-w-2xl">
            <div className="divide-y divide-[#E5E1DA]">
              {product.specifications.map((spec, idx) => (
                <div key={idx} className="grid grid-cols-5 gap-4 py-3">
                  <span className="col-span-2 text-[10px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C]/60">
                    {spec.label}
                  </span>
                  <span className="col-span-3 text-sm font-sans text-[#1C1C1C]">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "care" && (
          <div className="max-w-2xl space-y-4">
            <h3 className="font-serif text-base text-[#1C1C1C]">Care Instructions</h3>
            <ul className="space-y-3">
              {product.fabricAndCare.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 font-sans text-sm text-[#1C1C1C]/75"
                >
                  <span className="text-[#C5A059] mt-1 flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="max-w-2xl space-y-6">
            <h3 className="font-serif text-base text-[#1C1C1C]">Shipping Information</h3>
            <p className="font-sans text-sm text-[#1C1C1C]/75 leading-relaxed">
              {product.shippingInfo}
            </p>
            <div className="space-y-3">
              {product.deliveryOptions.map((opt, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-3 border-b border-[#E5E1DA] gap-4"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C] block">
                      {opt.name}
                    </span>
                    <span className="text-xs font-sans text-[#1C1C1C]/55">{opt.days}</span>
                  </div>
                  <span className="text-xs font-semibold font-sans text-[#1C1C1C] flex-shrink-0">
                    {opt.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "returns" && (
          <div className="max-w-2xl space-y-4">
            <h3 className="font-serif text-base text-[#1C1C1C]">Returns & Exchange Policy</h3>
            <p className="font-sans text-sm text-[#1C1C1C]/75 leading-relaxed">
              {product.returnPolicy}
            </p>
            <div className="bg-[#F5F2ED] border border-[#E5E1DA] p-5 space-y-3">
              <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-semibold font-sans block">
                Key Policy Points
              </span>
              {[
                "14-day exchange window from date of delivery",
                "Size alteration requests must be made within 7 days",
                "Items must be unworn, unaltered, and in original packaging",
                "Custom embroidery orders are non-refundable once commenced",
                "Domestic exchanges are free of charge",
              ].map((point, idx) => (
                <p key={idx} className="flex items-start gap-2 font-sans text-xs text-[#1C1C1C]/75">
                  <span className="text-[#C5A059] flex-shrink-0">→</span>
                  {point}
                </p>
              ))}
            </div>
          </div>
        )}

        {activeTab === "styling" && (
          <div className="max-w-2xl space-y-4">
            <h3 className="font-serif text-base text-[#1C1C1C]">Atelier Styling Guide</h3>
            <ul className="space-y-3">
              {product.stylingTips.map((tip, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 font-sans text-sm text-[#1C1C1C]/75"
                >
                  <span className="text-[#C5A059] mt-1 flex-shrink-0">{idx + 1}.</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
