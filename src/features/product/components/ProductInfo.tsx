import { Star, Package, Clock } from "lucide-react";
import type { ProductDetail } from "../data/product.data";

interface ProductInfoProps {
  product: ProductDetail;
  onReviewsClick?: () => void;
}

const stockStatusConfig = {
  "in-stock": {
    label: "In Stock",
    color: "text-[#2A5C3A]",
    bg: "bg-[#2A5C3A]/8",
    border: "border-[#2A5C3A]/20",
  },
  "low-stock": {
    label: "Only a few left",
    color: "text-[#92400E]",
    bg: "bg-[#92400E]/8",
    border: "border-[#92400E]/20",
  },
  "out-of-stock": {
    label: "Currently Out of Stock",
    color: "text-[#991B1B]",
    bg: "bg-[#991B1B]/8",
    border: "border-[#991B1B]/20",
  },
  "made-to-order": {
    label: "Made to Order",
    color: "text-[#1C1C1C]",
    bg: "bg-[#F5F2ED]",
    border: "border-[#E5E1DA]",
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.floor(rating)
              ? "fill-[#C5A059] text-[#C5A059]"
              : star - 0.5 <= rating
                ? "fill-[#C5A059]/50 text-[#C5A059]"
                : "fill-transparent text-[#E5E1DA]"
          }`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function ProductInfo({ product, onReviewsClick }: ProductInfoProps) {
  const stockConfig = stockStatusConfig[product.stockStatus];
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-5 text-left">
      {/* Collection & Category label */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans">
          {product.collection}
        </span>
        <span className="text-[#E5E1DA]">·</span>
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#1C1C1C]/50 font-sans">
          {product.category}
        </span>
      </div>

      {/* Product Name */}
      <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1C1C1C] font-light leading-tight tracking-wide">
        {product.name}
      </h1>

      {/* SKU */}
      <p className="text-[9px] uppercase tracking-widest text-[#1C1C1C]/35 font-sans">
        SKU: {product.sku}
      </p>

      {/* Rating */}
      <button
        onClick={onReviewsClick}
        className="flex items-center gap-2 group cursor-pointer"
        aria-label={`${product.rating} stars from ${product.reviewsCount} reviews — click to see reviews`}
      >
        <StarRating rating={product.rating} />
        <span className="text-[11px] font-semibold font-sans text-[#1C1C1C]">{product.rating}</span>
        <span className="text-[11px] text-[#1C1C1C]/50 font-sans group-hover:text-[#540B0E] transition-colors underline underline-offset-2">
          ({product.reviewsCount} reviews)
        </span>
      </button>

      {/* Price Block */}
      <div className="flex items-baseline gap-4 py-3 border-t border-b border-[#E5E1DA]">
        <span className="font-serif text-2xl sm:text-3xl text-[#1C1C1C] font-normal">
          ₹&nbsp;{product.price.toLocaleString("en-IN")}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-base text-[#1C1C1C]/40 line-through font-sans">
              ₹&nbsp;{product.originalPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-xs font-semibold font-sans text-[#2A5C3A] bg-[#2A5C3A]/10 px-2 py-0.5">
              {discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div
        className={`inline-flex items-center gap-2 px-3 py-2 border text-[10px] uppercase tracking-wider font-medium font-sans ${stockConfig.color} ${stockConfig.bg} ${stockConfig.border}`}
      >
        <Package className="w-3.5 h-3.5" strokeWidth={1.5} />
        {stockConfig.label}
        {product.stockStatus === "low-stock" && product.stockCount && (
          <span className="font-normal opacity-70">— {product.stockCount} remaining</span>
        )}
      </div>

      {/* Short Description */}
      <p className="font-sans text-sm text-[#1C1C1C]/75 leading-relaxed">
        {product.shortDescription}
      </p>

      {/* Estimated Delivery */}
      <div className="flex items-start gap-3 text-xs font-sans text-[#1C1C1C]/65">
        <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#C5A059]" strokeWidth={1.5} />
        <div>
          <span className="font-semibold text-[#1C1C1C] block mb-0.5">Estimated Delivery</span>
          {product.estimatedDelivery}
        </div>
      </div>
    </div>
  );
}
