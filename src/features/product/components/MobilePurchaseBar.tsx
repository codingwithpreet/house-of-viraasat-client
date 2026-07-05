import { ShoppingBag, Zap } from "lucide-react";
import { useUIStore } from "../../../store/ui.store";
import type { ProductDetail } from "../data/product.data";

interface MobilePurchaseBarProps {
  product: ProductDetail;
}

export default function MobilePurchaseBar({ product }: MobilePurchaseBarProps) {
  const setCartDrawerOpen = useUIStore((state) => state.setCartDrawerOpen);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FDFCFB]/95 backdrop-blur-md border-t border-[#E5E1DA] shadow-lg lg:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Price */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-sm font-bold text-[#1C1C1C]">
              ₹&nbsp;{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="font-sans text-xs text-[#1C1C1C]/40 line-through">
                ₹&nbsp;{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>

        {/* Buy Now */}
        <button
          onClick={() => setCartDrawerOpen(true)}
          className="flex items-center gap-2 border border-[#1C1C1C] py-3 px-5 text-[10px] uppercase tracking-widest font-medium font-sans text-[#1C1C1C] hover:border-[#C5A059] transition-all cursor-pointer flex-shrink-0"
        >
          <Zap className="w-3.5 h-3.5 stroke-[1.5]" />
          Buy Now
        </button>

        {/* Add to Cart */}
        <button
          onClick={() => setCartDrawerOpen(true)}
          className="flex items-center gap-2 bg-[#1C1C1C] text-[#FDFCFB] hover:bg-[#540B0E] py-3 px-5 text-[10px] uppercase tracking-widest font-medium font-sans transition-all cursor-pointer flex-shrink-0"
        >
          <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
          Add to Bag
        </button>
      </div>
    </div>
  );
}
