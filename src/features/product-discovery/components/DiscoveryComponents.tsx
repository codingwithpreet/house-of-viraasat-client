import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, X, Filter } from "lucide-react";
import ProductCard from "../../../components/ProductCard";
import { Skeleton } from "../../../components/FeedbackStates";
import type { Product } from "../data/products.data";
// --- COLLECTION HERO ---
interface CollectionHeroProps {
  title: string;
  description: string;
  imageUrl: string;
}

export function CollectionHero({ title, description, imageUrl }: CollectionHeroProps) {
  return (
    <div className="relative w-full h-[40vh] sm:h-[50vh] overflow-hidden bg-[#1C1C1C]">
      <div className="absolute inset-0 bg-black/40 z-1" />
      <img src={imageUrl} alt={title} className="w-full h-full object-cover object-center" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 z-2 max-w-4xl text-left text-[#FDFCFB] space-y-3">
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059] font-medium font-sans">
          House of Viraasat Collections
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-wide">{title}</h1>
        <p className="font-sans text-xs sm:text-sm text-[#FDFCFB]/80 max-w-2xl leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
}

// --- COLLECTION HEADER / TOOLBAR ---
interface CollectionHeaderProps {
  count: number;
  onSortChange: (sort: string) => void;
  activeSort: string;
  onOpenFilters: () => void;
}

export function CollectionHeader({
  count,
  onSortChange,
  activeSort,
  onOpenFilters,
}: CollectionHeaderProps) {
  return (
    <div className="border-b border-[#E5E1DA] py-4 flex items-center justify-between font-sans">
      <div className="text-[11px] uppercase tracking-wider text-[#1C1C1C]/50 font-semibold">
        Presenting <span className="text-[#1C1C1C]">{count}</span> Masterpieces
      </div>

      <div className="flex items-center gap-4">
        {/* Mobile Filter Button */}
        <button
          onClick={onOpenFilters}
          className="lg:hidden flex items-center gap-2 border border-[#E5E1DA] py-2 px-4 text-[10px] uppercase tracking-widest hover:border-[#C5A059] cursor-pointer"
        >
          <Filter className="w-3.5 h-3.5 stroke-[1.25]" />
          Filter
        </button>

        {/* Sort selector */}
        <SortDropdown activeSort={activeSort} onChange={onSortChange} />
      </div>
    </div>
  );
}

// --- PRODUCT GRID ---
interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export function ProductGrid({ products, columns = 3 }: ProductGridProps) {
  const gridColsClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid ${gridColsClass} gap-x-6 gap-y-12`}>
      {products.map((product) => (
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
  );
}

// --- FILTER ACCORDION ---
interface FilterAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function FilterAccordion({ title, children, defaultExpanded = true }: FilterAccordionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b border-[#E5E1DA] py-4 text-left font-sans">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-[10px] uppercase tracking-widest text-[#1C1C1C] font-semibold cursor-pointer"
      >
        <span>{title}</span>
        {expanded ? (
          <ChevronUp className="w-3.5 h-3.5 opacity-60" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        )}
      </button>
      {expanded && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

// --- FILTER CHIPS ---
interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

export function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-[#F5F2ED] border border-[#E5E1DA] py-1.5 px-3 text-[10px] font-sans uppercase tracking-wider text-[#1C1C1C] rounded-none">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="p-0.5 hover:opacity-60 cursor-pointer"
        aria-label="Remove filter"
      >
        <X className="w-3 h-3 stroke-[1.5]" />
      </button>
    </span>
  );
}

// --- SORT DROPDOWN ---
interface SortDropdownProps {
  activeSort: string;
  onChange: (val: string) => void;
}

export function SortDropdown({ activeSort, onChange }: SortDropdownProps) {
  const sortOptions = [
    { label: "Newest Arrivals", value: "newest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Best Sellers", value: "bestsellers" },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-widest text-[#1C1C1C]/45 hidden sm:inline">
        Sort By:
      </span>
      <select
        value={activeSort}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border border-[#E5E1DA] py-2 px-3 text-[10px] uppercase tracking-widest font-sans text-[#1C1C1C] focus:outline-none focus:border-[#C5A059] rounded-none cursor-pointer"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// --- PAGINATION ---
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Page navigation"
      className="py-12 flex justify-center items-center gap-4 font-sans border-t border-[#E5E1DA]"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border border-[#E5E1DA] py-3 px-5 text-[10px] uppercase tracking-widest text-[#1C1C1C] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#C5A059] transition-all rounded-none cursor-pointer"
      >
        Prev
      </button>

      <div className="flex items-center gap-2 text-xs font-semibold">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const page = idx + 1;
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 flex items-center justify-center border transition-all rounded-none cursor-pointer ${
                isActive
                  ? "bg-[#1C1C1C] text-[#FDFCFB] border-[#1C1C1C]"
                  : "border-[#E5E1DA] text-[#1C1C1C] hover:border-[#C5A059]"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border border-[#E5E1DA] py-3 px-5 text-[10px] uppercase tracking-widest text-[#1C1C1C] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#C5A059] transition-all rounded-none cursor-pointer"
      >
        Next
      </button>
    </nav>
  );
}

// --- SEARCH BAR SUGGESTIONS ---
interface SearchSuggestionsProps {
  onKeywordClick: (keyword: string) => void;
}

export function SearchSuggestions({ onKeywordClick }: SearchSuggestionsProps) {
  const popularKeywords = [
    "Cream Zardosi Sherwani",
    "Brocade Bundi Set",
    "Midnight Velvet Bandhgala",
    "Zari Mojari",
    "Pure Raw Silk Kurta",
  ];

  return (
    <div className="space-y-6 text-left max-w-lg mx-auto">
      <div>
        <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium font-sans block mb-4">
          Popular Searches
        </span>
        <div className="flex flex-wrap gap-2">
          {popularKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => onKeywordClick(kw)}
              className="border border-[#E5E1DA] hover:border-[#C5A059] py-2 px-3 text-[10px] uppercase font-sans text-[#1C1C1C] transition-all rounded-none cursor-pointer"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- SEARCH RESULT CARD ---
export function SearchResultCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="flex gap-4 border-b border-[#E5E1DA]/60 py-4 items-center group text-left"
    >
      <div className="w-16 aspect-[3/4] bg-[#F5F2ED] overflow-hidden border border-[#E5E1DA]/50 flex-shrink-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div>
        <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-sans font-medium block">
          {product.fabric} . {product.category}
        </span>
        <h4 className="font-serif text-sm text-[#1C1C1C] group-hover:text-[#540B0E] transition-colors font-medium mt-0.5">
          {product.name}
        </h4>
        <span className="font-sans text-xs font-semibold text-[#1C1C1C] block mt-1">
          ₹&nbsp;{product.price.toLocaleString()}
        </span>
      </div>
    </Link>
  );
}

// --- PRODUCT SKELETON GRID ---
export function ProductSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div key={idx} className="flex flex-col space-y-4">
          <Skeleton className="aspect-[3/4]" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  );
}
