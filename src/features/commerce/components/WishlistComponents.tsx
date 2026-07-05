import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import type { WishlistItem } from "../data/wishlist.data";

// ─── WISHLIST CARD ────────────────────────────────────────────────────────────
interface WishlistCardProps {
  item: WishlistItem;
  onRemove: (id: string) => void;
  onMoveToCart: (id: string) => void;
}

export function WishlistCard({ item, onRemove, onMoveToCart }: WishlistCardProps) {
  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <div className="group flex flex-col">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F2ED] border border-[#E5E1DA] mb-3">
        <Link to={`/products/${item.productId}`}>
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {item.badge && (
            <span className="bg-[#540B0E] text-[#FDFCFB] text-[8px] tracking-[0.2em] uppercase py-1 px-2.5 font-sans font-medium">
              {item.badge}
            </span>
          )}
          {!item.inStock && (
            <span className="bg-[#1C1C1C]/70 text-[#FDFCFB] text-[8px] tracking-[0.2em] uppercase py-1 px-2.5 font-sans font-medium">
              Out of Stock
            </span>
          )}
          {discount > 0 && (
            <span className="bg-[#2A5C3A] text-[#FDFCFB] text-[8px] tracking-[0.2em] uppercase py-1 px-2.5 font-sans font-medium">
              {discount}% Off
            </span>
          )}
        </div>

        {/* Remove button */}
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-3 right-3 p-2 bg-[#FDFCFB]/80 hover:bg-[#FDFCFB] border border-[#E5E1DA]/30 rounded-full transition-colors cursor-pointer"
          aria-label="Remove from wishlist"
        >
          <Heart className="w-[14px] h-[14px] fill-[#540B0E] text-[#540B0E] stroke-[1.5]" />
        </button>

        {/* Hover — Move to Cart overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => onMoveToCart(item.id)}
            disabled={!item.inStock}
            className="w-full bg-[#FDFCFB] text-[#1C1C1C] hover:bg-[#540B0E] hover:text-[#FDFCFB] py-3 text-[9px] font-medium tracking-[0.25em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {item.inStock ? "Move to Cart" : "Notify Me"}
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="space-y-1">
        <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-sans font-semibold">
          {item.fabric} · {item.category}
        </span>
        <Link
          to={`/products/${item.productId}`}
          className="font-serif text-sm text-[#1C1C1C] hover:text-[#540B0E] transition-colors block line-clamp-1"
        >
          {item.name}
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold font-sans text-[#540B0E]">
            ₹&nbsp;{item.price.toLocaleString("en-IN")}
          </span>
          {item.originalPrice && (
            <span className="text-[10px] text-[#1C1C1C]/40 line-through font-sans">
              ₹&nbsp;{item.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>

      {/* Mobile action buttons */}
      <div className="flex gap-2 mt-3 sm:hidden">
        <button
          onClick={() => onMoveToCart(item.id)}
          disabled={!item.inStock}
          className="flex-1 flex items-center justify-center gap-1.5 border border-[#1C1C1C] py-2.5 text-[9px] uppercase tracking-wider font-medium font-sans text-[#1C1C1C] disabled:opacity-40 cursor-pointer"
        >
          <ShoppingBag className="w-3 h-3 stroke-[1.5]" />
          {item.inStock ? "Move to Cart" : "Out of Stock"}
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="p-2.5 border border-[#E5E1DA] text-[#1C1C1C]/50 hover:text-[#540B0E] hover:border-[#540B0E] transition-colors cursor-pointer"
          aria-label="Remove"
        >
          <Trash2 className="w-3.5 h-3.5 stroke-[1.25]" />
        </button>
      </div>
    </div>
  );
}

// ─── WISHLIST EMPTY STATE ─────────────────────────────────────────────────────
export function WishlistEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-16 h-16 border border-[#E5E1DA] rounded-full flex items-center justify-center mb-6">
        <Heart className="w-7 h-7 text-[#1C1C1C]/20 stroke-[1]" />
      </div>
      <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block mb-3">
        Your Atelier Wishlist
      </span>
      <h2 className="font-serif text-2xl text-[#1C1C1C] font-light mb-3">Nothing Saved Yet</h2>
      <p className="font-sans text-xs text-[#1C1C1C]/55 max-w-sm leading-relaxed mb-8">
        Explore the House of Viraasat collection and save your favourite pieces by pressing the
        heart icon on any product.
      </p>
      <Link
        to="/collections"
        className="inline-flex items-center gap-2 bg-[#1C1C1C] text-[#FDFCFB] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#540B0E] transition-all duration-300"
      >
        Explore the Atelier
        <ArrowRight className="w-4 h-4 stroke-[1.5]" />
      </Link>
    </div>
  );
}
