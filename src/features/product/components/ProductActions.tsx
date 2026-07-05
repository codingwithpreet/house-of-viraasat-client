import { useState } from "react";
import { Heart, Share2, ShoppingBag, Zap } from "lucide-react";
import Button from "../../../components/Button";
import { useUIStore } from "../../../store/ui.store";

interface ProductActionsProps {
  inStock: boolean;
  selectedSize: string;
  selectedColor: string;
}

export default function ProductActions({
  inStock,
  selectedSize,
  selectedColor,
}: ProductActionsProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [shareTooltip, setShareTooltip] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");

  const setCartDrawerOpen = useUIStore((state) => state.setCartDrawerOpen);
  const setWishlistDrawerOpen = useUIStore((state) => state.setWishlistDrawerOpen);

  const validateSelections = (): boolean => {
    if (!selectedSize) {
      setValidationMsg("Please select a size before adding to bag.");
      return false;
    }
    if (!selectedColor) {
      setValidationMsg("Please select a colour before adding to bag.");
      return false;
    }
    setValidationMsg("");
    return true;
  };

  const handleAddToCart = () => {
    if (!validateSelections()) return;
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      setCartDrawerOpen(true);
    }, 600);
  };

  const handleBuyNow = () => {
    if (!validateSelections()) return;
    setCartDrawerOpen(true);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      setWishlistDrawerOpen(true);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "House of Viraasat",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareTooltip(true);
        setTimeout(() => setShareTooltip(false), 2000);
      }
    } catch {
      // Share cancelled — ignore
    }
  };

  return (
    <div className="space-y-4">
      {/* Validation message */}
      {validationMsg && (
        <p className="text-[11px] font-sans text-[#991B1B] bg-[#991B1B]/5 border border-[#991B1B]/20 p-3">
          {validationMsg}
        </p>
      )}

      {/* Primary CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={!inStock || isAddingToCart}
          isLoading={isAddingToCart}
          loadingText="ADDING..."
          className="flex-1 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
          {inStock ? "Add to Atelier Bag" : "Out of Stock"}
        </Button>

        <Button
          variant="secondary"
          onClick={handleBuyNow}
          disabled={!inStock}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4 stroke-[1.5]" />
          Buy Now
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
          className={`flex items-center gap-2 border py-3 px-5 text-[10px] uppercase tracking-wider font-medium font-sans transition-all cursor-pointer flex-1 justify-center ${
            isWishlisted
              ? "bg-[#540B0E]/5 border-[#540B0E] text-[#540B0E]"
              : "border-[#E5E1DA] text-[#1C1C1C] hover:border-[#C5A059]"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-all ${isWishlisted ? "fill-[#540B0E] stroke-[#540B0E]" : "stroke-[1.5]"}`}
          />
          {isWishlisted ? "Wishlisted" : "Wishlist"}
        </button>

        <div className="relative">
          <button
            onClick={handleShare}
            aria-label="Share this product"
            className="flex items-center gap-2 border border-[#E5E1DA] py-3 px-5 text-[10px] uppercase tracking-wider font-medium font-sans text-[#1C1C1C] hover:border-[#C5A059] transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4 stroke-[1.5]" />
            Share
          </button>
          {shareTooltip && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1C1C1C] text-[#FDFCFB] text-[9px] uppercase tracking-wider px-3 py-1.5 whitespace-nowrap">
              Link copied!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
