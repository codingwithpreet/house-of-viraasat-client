import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useUIStore } from "../../../store/ui.store";
import type { ProductDetail } from "../data/product.data";
import type { SizeVariant } from "../data/variants.data";

interface StickyPurchaseCardProps {
  product: ProductDetail;
  sizes: SizeVariant[];
  visible: boolean;
}

export default function StickyPurchaseCard({ product, sizes, visible }: StickyPurchaseCardProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const setCartDrawerOpen = useUIStore((state) => state.setCartDrawerOpen);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-[#FDFCFB]/95 backdrop-blur-md border-b border-[#E5E1DA] shadow-md animate-slide-down hidden lg:block">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-6">
        {/* Product name + price */}
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-base text-[#1C1C1C] truncate">{product.name}</h3>
          <div className="flex items-baseline gap-3">
            <span className="font-sans text-sm font-semibold text-[#1C1C1C]">
              ₹&nbsp;{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="font-sans text-xs text-[#1C1C1C]/40 line-through">
                ₹&nbsp;{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>

        {/* Quick size selector */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-wider font-sans text-[#1C1C1C]/50 flex-shrink-0">
            Size:
          </span>
          <div className="flex gap-1">
            {sizes
              .filter((s) => s.available)
              .slice(0, 5)
              .map((sv) => (
                <button
                  key={sv.size}
                  onClick={() => setSelectedSize(sv.size)}
                  aria-pressed={selectedSize === sv.size}
                  className={`w-9 h-8 border text-[10px] font-medium font-sans transition-all rounded-none cursor-pointer ${
                    selectedSize === sv.size
                      ? "bg-[#1C1C1C] text-[#FDFCFB] border-[#1C1C1C]"
                      : "border-[#E5E1DA] text-[#1C1C1C] hover:border-[#C5A059]"
                  }`}
                >
                  {sv.label}
                </button>
              ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            aria-label="Wishlist"
            aria-pressed={isWishlisted}
            className={`p-2.5 border transition-all cursor-pointer ${
              isWishlisted
                ? "border-[#540B0E] text-[#540B0E]"
                : "border-[#E5E1DA] text-[#1C1C1C] hover:border-[#C5A059]"
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-[#540B0E]" : ""} stroke-[1.5]`} />
          </button>

          <button
            onClick={() => setCartDrawerOpen(true)}
            className="flex items-center gap-2 bg-[#1C1C1C] text-[#FDFCFB] hover:bg-[#540B0E] py-2.5 px-5 text-[10px] uppercase tracking-widest font-medium font-sans transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
