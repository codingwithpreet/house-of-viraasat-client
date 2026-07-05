import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { SearchSuggestions, SearchResultCard } from "../components/DiscoveryComponents";
import EmptyResultsPage from "./EmptyResultsPage";
import { products } from "../data/products.data";

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Cream Zardosi Sherwani",
    "Brocade Bundi Set",
  ]);

  // Sync state if URL search query changes
  useMemo(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Add to recent searches list
    if (!recentSearches.includes(searchQuery.trim())) {
      setRecentSearches([searchQuery.trim(), ...recentSearches.slice(0, 4)]);
    }

    setSearchParams({ q: searchQuery.trim() });
  };

  const handleSuggestionClick = (keyword: string) => {
    setSearchQuery(keyword);
    setSearchParams({ q: keyword });
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  // Filter products by search query
  const searchResults = useMemo(() => {
    if (!queryParam.trim()) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(queryParam.toLowerCase()) ||
        p.category.toLowerCase().includes(queryParam.toLowerCase()) ||
        p.fabric.toLowerCase().includes(queryParam.toLowerCase()),
    );
  }, [queryParam]);

  if (queryParam && searchResults.length === 0) {
    return <EmptyResultsPage query={queryParam} onSearchReset={() => setSearchParams({})} />;
  }

  return (
    <div className="bg-[#FDFCFB] min-h-[80vh] py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 space-y-12">
        {/* Search Title */}
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium font-sans">
            ATELIER REGISTRY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1C1C] font-light">
            Search Collections
          </h1>
        </div>

        {/* Big Search Form */}
        <form onSubmit={handleSearchSubmit} className="flex border-b border-[#1C1C1C] pb-3">
          <input
            type="text"
            placeholder="Search sherwanis, kurtas, accessories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none text-base font-sans text-[#1C1C1C] placeholder-[#1C1C1C]/35 focus:outline-none"
            autoFocus
          />
          <button type="submit" className="p-2 cursor-pointer" aria-label="Perform search">
            <Search className="w-5 h-5 stroke-[1.25]" />
          </button>
        </form>

        {/* Search Results list */}
        {queryParam ? (
          <div className="space-y-6">
            <div className="text-[11px] uppercase tracking-wider text-[#1C1C1C]/50 font-semibold border-b border-[#E5E1DA] pb-2 text-left">
              Found <span className="text-[#1C1C1C]">{searchResults.length}</span> results for "
              {queryParam}"
            </div>
            <div className="divide-y divide-[#E5E1DA]/40">
              {searchResults.map((product) => (
                <SearchResultCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="text-left space-y-3">
                <div className="flex justify-between items-baseline border-b border-[#E5E1DA] pb-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium font-sans">
                    Recent Searches
                  </span>
                  <button
                    onClick={handleClearRecent}
                    className="text-[9px] uppercase tracking-wider text-[#1C1C1C]/40 hover:text-[#540B0E] font-sans"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((kw) => (
                    <button
                      key={kw}
                      onClick={() => handleSuggestionClick(kw)}
                      className="border border-[#E5E1DA] hover:border-[#C5A059] py-2 px-3 text-[10px] uppercase font-sans text-[#1C1C1C] transition-all rounded-none cursor-pointer"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Suggestions component */}
            <SearchSuggestions onKeywordClick={handleSuggestionClick} />
          </div>
        )}
      </div>
    </div>
  );
}
