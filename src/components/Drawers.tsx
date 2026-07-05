import { useEffect, useRef, useState } from "react";
import { X, Trash } from "lucide-react";
import { useUIStore } from "../store/ui.store";
import { useNavigate } from "react-router-dom";

// --- BASE DRAWER CONTAINER ---
interface BaseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function BaseDrawer({ isOpen, onClose, title, children, footer }: BaseDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press, trap focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1C1C]/40 backdrop-blur-xs transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-md h-full bg-[#FDFCFB] shadow-2xl flex flex-col z-10 transition-transform duration-500 ease-out"
      >
        {/* Header */}
        <div className="h-16 px-6 border-b border-[#E5E1DA] flex items-center justify-between">
          <h2 className="font-serif text-sm tracking-[0.2em] text-[#1C1C1C] uppercase">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-[#1C1C1C] hover:opacity-60 transition-opacity cursor-pointer"
            aria-label="Close panel"
          >
            <X className="w-5 h-5 stroke-[1.25]" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-grow overflow-y-auto p-6">{children}</div>

        {/* Footer */}
        {footer && <div className="border-t border-[#E5E1DA] p-6 bg-[#FDFCFB]">{footer}</div>}
      </div>
    </div>
  );
}

// --- CART DRAWER INSTANCE ---
export function CartDrawer() {
  const navigate = useNavigate();
  const { cartDrawerOpen, setCartDrawerOpen } = useUIStore();

  const handleCheckout = () => {
    setCartDrawerOpen(false);
    navigate("/checkout");
  };

  const footerContent = (
    <div className="space-y-4">
      <div className="flex justify-between text-xs tracking-wide">
        <span className="uppercase text-[#1C1C1C]/60 font-sans">Indulgence Subtotal</span>
        <span className="font-serif font-semibold text-[#1C1C1C]">₹1,57,500</span>
      </div>
      <div className="flex justify-between text-[10px] tracking-wide text-[#540B0E]/80 border-b border-[#E5E1DA] pb-4">
        <span className="uppercase font-sans">Sovereign Shipping</span>
        <span className="uppercase font-sans font-medium">Complimentary</span>
      </div>
      <div className="flex justify-between text-sm tracking-wide pt-2">
        <span className="uppercase font-serif text-[#1C1C1C] font-semibold">Total Liability</span>
        <span className="font-serif font-bold text-[#540B0E] text-base">₹1,57,500</span>
      </div>
      <button
        onClick={handleCheckout}
        className="w-full bg-[#1C1C1C] text-[#FDFCFB] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#540B0E] transition-all duration-300 rounded-none cursor-pointer"
      >
        Proceed to Checkout
      </button>
      <div className="text-center">
        <button
          onClick={() => setCartDrawerOpen(false)}
          className="text-[10px] tracking-[0.2em] uppercase text-[#1C1C1C]/50 hover:text-[#1C1C1C] transition-colors font-sans cursor-pointer"
        >
          Continue Exploring
        </button>
      </div>
    </div>
  );

  return (
    <BaseDrawer
      isOpen={cartDrawerOpen}
      onClose={() => setCartDrawerOpen(false)}
      title="Atelier Shopping Bag"
      footer={footerContent}
    >
      <div className="space-y-6">
        {/* Item 1 */}
        <div className="flex gap-4 border-b border-[#E5E1DA]/60 pb-6">
          <div className="w-20 aspect-[3/4] bg-[#F5F2ED] overflow-hidden border border-[#E5E1DA]/50">
            <img
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=400"
              alt="Maharaja Cream Zardosi Sherwani"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-sans font-medium">
                Sherwani . Royal Groom
              </span>
              <h4 className="font-serif text-xs text-[#1C1C1C] font-medium mt-0.5">
                Maharaja Cream Zardosi Sherwani
              </h4>
              <div className="text-[10px] text-[#1C1C1C]/60 space-x-3 mt-1 font-sans">
                <span>
                  Size: <strong className="text-[#1C1C1C]">38 (M)</strong>
                </span>
                <span>
                  Color: <strong className="text-[#1C1C1C]">Imperial Cream</strong>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center border border-[#E5E1DA] text-xs">
                <button className="px-2 py-1 hover:bg-[#F5F2ED] transition-colors cursor-pointer">
                  -
                </button>
                <span className="px-3 font-medium">1</span>
                <button className="px-2 py-1 hover:bg-[#F5F2ED] transition-colors cursor-pointer">
                  +
                </button>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-serif text-xs font-semibold">₹1,45,000</span>
                <button
                  className="text-[#1C1C1C]/40 hover:text-[#540B0E] transition-colors cursor-pointer"
                  aria-label="Remove item"
                >
                  <Trash className="w-[14px] h-[14px] stroke-[1.25]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex gap-4 border-b border-[#E5E1DA]/60 pb-6">
          <div className="w-20 aspect-[3/4] bg-[#F5F2ED] overflow-hidden border border-[#E5E1DA]/50">
            <img
              src="https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=400"
              alt="Layered Pearl Mala"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-sans font-medium">
                Accessories . Sovereign Pearls
              </span>
              <h4 className="font-serif text-xs text-[#1C1C1C] font-medium mt-0.5">
                Layered Pearl Mala
              </h4>
              <div className="text-[10px] text-[#1C1C1C]/60 mt-1 font-sans">
                <span>
                  Size: <strong className="text-[#1C1C1C]">One Size</strong>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center border border-[#E5E1DA] text-xs">
                <button className="px-2 py-1 hover:bg-[#F5F2ED] transition-colors cursor-pointer">
                  -
                </button>
                <span className="px-3 font-medium">1</span>
                <button className="px-2 py-1 hover:bg-[#F5F2ED] transition-colors cursor-pointer">
                  +
                </button>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-serif text-xs font-semibold">₹12,500</span>
                <button
                  className="text-[#1C1C1C]/40 hover:text-[#540B0E] transition-colors cursor-pointer"
                  aria-label="Remove item"
                >
                  <Trash className="w-[14px] h-[14px] stroke-[1.25]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseDrawer>
  );
}

// --- SEARCH DRAWER INSTANCE ---
export function SearchDrawer() {
  const navigate = useNavigate();
  const { searchDrawerOpen, setSearchDrawerOpen } = useUIStore();
  const [query, setQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchDrawerOpen(false);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleSuggestionClick = (keyword: string) => {
    setQuery(keyword);
    setSearchDrawerOpen(false);
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <BaseDrawer
      isOpen={searchDrawerOpen}
      onClose={() => setSearchDrawerOpen(false)}
      title="Search Collection"
    >
      <div className="space-y-8">
        <form onSubmit={handleSearchSubmit} className="flex border-b border-[#1C1C1C] pb-2">
          <input
            type="text"
            placeholder="Search sherwanis, kurtas, bandhgalas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none text-xs font-sans text-[#1C1C1C] placeholder-[#1C1C1C]/40 focus:outline-none"
            autoFocus
          />
          <button type="submit" className="p-1 cursor-pointer" aria-label="Submit search">
            <Trash className="w-4 h-4 stroke-[1.25] rotate-45" />{" "}
            {/* Using Trash rotated to look like close/reset or standard look */}
          </button>
        </form>

        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium font-sans block mb-4">
            Popular Searches
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              "Cream Zardosi Sherwani",
              "Brocade Bundi Set",
              "Midnight Velvet Bandhgala",
              "Zari Mojari",
              "Pure Raw Silk Kurta",
            ].map((keyword) => (
              <button
                key={keyword}
                onClick={() => handleSuggestionClick(keyword)}
                className="border border-[#E5E1DA] hover:border-[#C5A059] py-2 px-3 text-[10px] uppercase font-sans text-[#1C1C1C] transition-all rounded-none cursor-pointer"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </div>
    </BaseDrawer>
  );
}

// --- WISHLIST DRAWER INSTANCE ---
export function WishlistDrawer() {
  const navigate = useNavigate();
  const { wishlistDrawerOpen, setWishlistDrawerOpen } = useUIStore();

  const handleViewWishlist = () => {
    setWishlistDrawerOpen(false);
    navigate("/wishlist");
  };

  const footerContent = (
    <button
      onClick={handleViewWishlist}
      className="w-full border border-[#1C1C1C] text-[#1C1C1C] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#1C1C1C] hover:text-[#FDFCFB] transition-all duration-300 rounded-none cursor-pointer"
    >
      View Full Wishlist
    </button>
  );

  return (
    <BaseDrawer
      isOpen={wishlistDrawerOpen}
      onClose={() => setWishlistDrawerOpen(false)}
      title="Atelier Wishlist"
      footer={footerContent}
    >
      <div className="space-y-6">
        {/* Item 1 */}
        <div className="flex gap-4 border-b border-[#E5E1DA]/60 pb-6">
          <div className="w-20 aspect-[3/4] bg-[#F5F2ED] overflow-hidden border border-[#E5E1DA]/50">
            <img
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=400"
              alt="Brocade Bundi & Kurta Ensemble"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-sans font-medium">
                Bundi . Banarasi Silk
              </span>
              <h4 className="font-serif text-xs text-[#1C1C1C] font-medium mt-0.5">
                Brocade Bundi & Kurta Ensemble
              </h4>
              <span className="font-serif text-xs font-semibold block mt-1">₹34,500</span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => {
                  setWishlistDrawerOpen(false);
                  navigate("/products/2");
                }}
                className="text-[10px] uppercase tracking-widest text-[#540B0E] font-medium hover:underline transition-all cursor-pointer"
              >
                Select Variant
              </button>
              <button
                className="text-[#1C1C1C]/40 hover:text-[#540B0E] transition-colors cursor-pointer"
                aria-label="Remove from wishlist"
              >
                <Trash className="w-[14px] h-[14px] stroke-[1.25]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseDrawer>
  );
}
