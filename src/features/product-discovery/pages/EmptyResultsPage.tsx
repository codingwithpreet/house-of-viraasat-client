import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";

interface EmptyResultsPageProps {
  query?: string;
  onSearchReset?: () => void;
}

export default function EmptyResultsPage({ query, onSearchReset }: EmptyResultsPageProps) {
  return (
    <div className="bg-[#FDFCFB] min-h-[70vh] flex items-center justify-center py-16 sm:py-24 text-center px-4">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center">
          <HelpCircle className="w-16 h-16 text-[#1C1C1C]/25 stroke-[1]" />
        </div>

        <span className="text-[9px] uppercase tracking-[0.4em] text-[#C5A059] font-medium font-sans">
          ATELIER REGISTRY
        </span>

        <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1C1C] font-normal tracking-wide leading-tight">
          No Results Found {query && `for "${query}"`}
        </h1>

        <p className="font-sans text-xs text-[#1C1C1C]/60 leading-relaxed">
          We could not find any masterpieces matching your inquiry. Please check your spelling,
          clear active filter parameters, or explore our signature collections.
        </p>

        {/* Suggestion list */}
        <div className="bg-[#F5F2ED] p-4 border border-[#E5E1DA]/50 text-left space-y-3 font-sans">
          <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-medium block">
            Suggested Collections
          </span>
          <div className="flex flex-col space-y-2 text-xs">
            <Link
              to="/products?category=sherwani"
              className="hover:text-[#540B0E] transition-colors"
            >
              • Imperial Sherwanis
            </Link>
            <Link to="/products?category=kurta" className="hover:text-[#540B0E] transition-colors">
              • Celebration Kurta Sets
            </Link>
            <Link
              to="/products?category=bandhgala"
              className="hover:text-[#540B0E] transition-colors"
            >
              • Midnight Velvet Jodhpuri Bandhgalas
            </Link>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          {onSearchReset && (
            <button
              onClick={onSearchReset}
              className="border border-[#1C1C1C] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase bg-[#1C1C1C] text-[#FDFCFB] hover:bg-[#540B0E] hover:border-[#540B0E] transition-all duration-300 rounded-none cursor-pointer"
            >
              Reset Search Query
            </button>
          )}
          <Link
            to="/products"
            className="border border-[#E5E1DA] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase hover:border-[#C5A059] transition-all duration-300 rounded-none inline-block text-[#1C1C1C]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
