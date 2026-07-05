import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LayoutGrid, List, Share2, ShoppingBag } from "lucide-react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ProductCard from "../../../components/ProductCard";
import { WishlistCard, WishlistEmpty } from "../components/WishlistComponents";
import { useUIStore } from "../../../store/ui.store";
import { initialWishlistItems } from "../data/wishlist.data";
import type { WishlistItem } from "../data/wishlist.data";

const SORT_OPTIONS = [
  { value: "default", label: "Date Added" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A–Z" },
];

const RECOMMENDED = [
  {
    id: "p2",
    name: "Royal Maroon Silk Kurta Set",
    category: "kurta",
    fabric: "Chanderi Silk",
    price: 24500,
    originalPrice: 29500,
    imageUrl:
      "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&q=80&w=600",
    badge: "Best Seller",
  },
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
    id: "p11",
    name: "Embroidered Nehru Jacket",
    category: "nehru-jacket",
    fabric: "Georgette",
    price: 18500,
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
    badge: "New",
  },
];

import { useDocumentMetadata } from "../../../hooks/useDocumentMetadata";

export default function WishlistPage() {
  useDocumentMetadata({
    title: "My Registry & Wishlist",
    description:
      "Review and manage your saved luxury traditional menswear items at the House of Viraasat atelier.",
    keywords: "wishlist, registry, custom menswear, saved items",
  });

  const [items, setItems] = useState<WishlistItem[]>(initialWishlistItems);
  const [sort, setSort] = useState("default");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [shareTooltip, setShareTooltip] = useState(false);
  const setCartDrawerOpen = useUIStore((state) => state.setCartDrawerOpen);

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleMoveToCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setCartDrawerOpen(true);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareTooltip(true);
      setTimeout(() => setShareTooltip(false), 2000);
    } catch {
      // ignore
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Atelier Wishlist" }]} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block mb-1">
              Saved for Later
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1C1C] font-light">
              Your Wishlist
              {items.length > 0 && (
                <span className="ml-3 font-sans text-base text-[#1C1C1C]/40 font-normal">
                  ({items.length} piece{items.length > 1 ? "s" : ""})
                </span>
              )}
            </h1>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-3">
              {/* Share */}
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 border border-[#E5E1DA] py-2.5 px-4 text-[10px] uppercase tracking-wider font-medium font-sans text-[#1C1C1C] hover:border-[#C5A059] transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 stroke-[1.5]" />
                  Share
                </button>
                {shareTooltip && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1C1C1C] text-[#FDFCFB] text-[9px] uppercase tracking-wider px-3 py-1.5 whitespace-nowrap">
                    Link copied!
                  </div>
                )}
              </div>

              {/* Move all to cart */}
              <button
                onClick={() => {
                  setItems([]);
                  setCartDrawerOpen(true);
                }}
                className="flex items-center gap-2 bg-[#1C1C1C] text-[#FDFCFB] py-2.5 px-5 text-[10px] uppercase tracking-widest font-medium font-sans hover:bg-[#540B0E] transition-all cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
                Move All to Cart
              </button>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <WishlistEmpty />
        ) : (
          <>
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 py-3 border-y border-[#E5E1DA]">
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-wider font-sans text-[#1C1C1C]/50">
                  Sort:
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="text-[10px] font-sans text-[#1C1C1C] border-none bg-transparent focus:outline-none cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 cursor-pointer transition-colors ${view === "grid" ? "text-[#1C1C1C]" : "text-[#1C1C1C]/30 hover:text-[#1C1C1C]"}`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4 stroke-[1.25]" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 cursor-pointer transition-colors ${view === "list" ? "text-[#1C1C1C]" : "text-[#1C1C1C]/30 hover:text-[#1C1C1C]"}`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4 stroke-[1.25]" />
                </button>
              </div>
            </div>

            {/* Grid */}
            <div
              className={`grid gap-6 ${view === "grid" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2"}`}
            >
              {sortedItems.map((item) => (
                <WishlistCard
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  onMoveToCart={handleMoveToCart}
                />
              ))}
            </div>
          </>
        )}

        {/* Recommendations */}
        <section className="mt-24 pt-12 border-t border-[#E5E1DA]">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block mb-2">
                Curated for You
              </span>
              <h2 className="font-serif text-2xl text-[#1C1C1C] font-light">You Might Also Love</h2>
            </div>
            <Link
              to="/collections"
              className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-medium font-sans text-[#1C1C1C] hover:text-[#540B0E] transition-colors"
            >
              View All <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {RECOMMENDED.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.name}
                category={product.category}
                fabric={product.fabric}
                price={product.price}
                originalPrice={product.originalPrice}
                imageUrl={product.imageUrl}
                badge={product.badge}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
