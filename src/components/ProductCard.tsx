import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useUIStore } from "../store/ui.store";

interface ProductCardProps {
  id: string | number;
  title: string;
  category: string;
  fabric: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  badge?: string;
}

export default function ProductCard({
  id,
  title,
  category,
  fabric,
  price,
  originalPrice,
  imageUrl,
  badge,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const setCartDrawerOpen = useUIStore((state) => state.setCartDrawerOpen);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCartDrawerOpen(true);
  };

  return (
    <Link to={`/products/${id}`} className="group flex flex-col relative text-left">
      {/* Visual Container */}
      <div className="relative aspect-[3/4] overflow-hidden border border-[#E5E1DA] bg-[#F5F2ED] rounded-none mb-4">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Badge Overlay */}
        {badge && (
          <span className="absolute top-3 left-3 bg-[#540B0E] text-[#FDFCFB] text-[8px] tracking-[0.2em] uppercase py-1 px-2.5 font-sans font-medium">
            {badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 p-2 bg-[#FDFCFB]/80 hover:bg-[#FDFCFB] border border-[#E5E1DA]/30 rounded-full transition-colors cursor-pointer"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-[14px] h-[14px] transition-colors stroke-[1.5] ${
              isWishlisted ? "fill-[#540B0E] text-[#540B0E]" : "text-[#1C1C1C]"
            }`}
          />
        </button>

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-[#FDFCFB] text-[#1C1C1C] hover:bg-[#540B0E] hover:text-[#FDFCFB] py-3 text-[9px] font-medium tracking-[0.25em] uppercase transition-all duration-300 rounded-none cursor-pointer"
          >
            Quick Add to Bag
          </button>
        </div>
      </div>

      {/* Metadata Panel */}
      <div className="space-y-1">
        <div className="flex justify-between items-baseline gap-2">
          <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-sans font-semibold">
            {fabric} . {category}
          </span>
        </div>

        <h3 className="font-serif text-xs sm:text-sm text-[#1C1C1C] font-normal group-hover:text-[#540B0E] transition-colors line-clamp-1">
          {title}
        </h3>

        {/* Price layout */}
        <div className="flex items-center gap-2 text-xs font-sans font-semibold">
          {originalPrice ? (
            <>
              <span className="text-[#540B0E]">₹&nbsp;{price.toLocaleString()}</span>
              <span className="text-[#1C1C1C]/40 line-through text-[11px]">
                ₹&nbsp;{originalPrice.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-[#1C1C1C]">₹&nbsp;{price.toLocaleString()}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
