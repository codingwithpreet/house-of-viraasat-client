import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import {
  CollectionHero,
  CollectionHeader,
  ProductGrid,
  FilterChip,
  Pagination,
} from "../components/DiscoveryComponents";
import FilterSidebar from "../components/FilterSidebar";
import FilterDrawer from "../components/FilterDrawer";
import { products } from "../data/products.data";

import { useDocumentMetadata } from "../../../hooks/useDocumentMetadata";

export default function ProductListingPage() {
  useDocumentMetadata({
    title: "Atelier Catalog & Collections",
    description:
      "Browse the curated House of Viraasat catalog. View our bespoke handcrafted collections, including wedding Sherwanis, Nehru Jackets, and Bandhgalas.",
    keywords:
      "sherwanis, bandhgalas, kurtas, Nehru jackets, designer wedding wear, mens luxury fashion",
  });

  const [searchParams, setSearchParams] = useSearchParams();

  // Reading query parameters
  const categoryParam = searchParams.get("category") || "";
  const collectionParam = searchParams.get("collection") || "";

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedFabric, setSelectedFabric] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [selectedFit, setSelectedFit] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeSort, setActiveSort] = useState("newest");

  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sync state with URL if params change
  useMemo(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useMemo(() => {
    if (collectionParam) {
      // If collection parameter is active, clear others for focus
    }
  }, [collectionParam]);

  // Clearing all filters
  const handleClearAll = () => {
    setSelectedCategory("");
    setSelectedPriceRange("");
    setSelectedFabric("");
    setSelectedOccasion("");
    setSelectedFit("");
    setSelectedAvailability("");
    setSelectedSize("");
    setSearchParams({});
    setCurrentPage(1);
  };

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory && p.category !== selectedCategory) return false;
        if (collectionParam && p.collection !== collectionParam) return false;
        if (selectedFabric && p.fabric !== selectedFabric) return false;
        if (selectedOccasion && p.occasion !== selectedOccasion) return false;
        if (selectedFit && p.fit !== selectedFit) return false;
        if (selectedAvailability === "in-stock" && !p.inStock) return false;
        if (selectedAvailability === "out-of-stock" && p.inStock) return false;
        if (selectedSize && !p.sizes.includes(selectedSize)) return false;

        // Price limit filters
        if (selectedPriceRange) {
          if (selectedPriceRange.includes("Under ₹25,000") && p.price >= 25000) return false;
          if (
            selectedPriceRange.includes("₹25,000 - ₹50,000") &&
            (p.price < 25000 || p.price > 50000)
          )
            return false;
          if (
            selectedPriceRange.includes("₹50,000 - ₹1,00,000") &&
            (p.price < 50000 || p.price > 100000)
          )
            return false;
          if (selectedPriceRange.includes("Above ₹1,00,000") && p.price <= 100000) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (activeSort === "price-asc") return a.price - b.price;
        if (activeSort === "price-desc") return b.price - a.price;
        if (activeSort === "bestsellers") return b.rating - a.rating;
        // Default: newest
        return b.id.localeCompare(a.id);
      });
  }, [
    selectedCategory,
    collectionParam,
    selectedPriceRange,
    selectedFabric,
    selectedOccasion,
    selectedFit,
    selectedAvailability,
    selectedSize,
    activeSort,
  ]);

  // Pagination calculations
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const activeChips = useMemo(() => {
    const chips = [];
    if (selectedCategory) chips.push({ label: `Category: ${selectedCategory}`, type: "cat" });
    if (selectedFabric) chips.push({ label: `Fabric: ${selectedFabric}`, type: "fabric" });
    if (selectedOccasion) chips.push({ label: `Occasion: ${selectedOccasion}`, type: "occasion" });
    if (selectedFit) chips.push({ label: `Fit: ${selectedFit}`, type: "fit" });
    if (selectedSize) chips.push({ label: `Size: ${selectedSize}`, type: "size" });
    if (selectedPriceRange) chips.push({ label: selectedPriceRange, type: "price" });
    return chips;
  }, [
    selectedCategory,
    selectedFabric,
    selectedOccasion,
    selectedFit,
    selectedSize,
    selectedPriceRange,
  ]);

  const removeChip = (type: string) => {
    if (type === "cat") setSelectedCategory("");
    if (type === "fabric") setSelectedFabric("");
    if (type === "occasion") setSelectedOccasion("");
    if (type === "fit") setSelectedFit("");
    if (type === "size") setSelectedSize("");
    if (type === "price") setSelectedPriceRange("");
  };

  const filterSidebarProps = {
    selectedCategory,
    onSelectCategory: setSelectedCategory,
    selectedPriceRange,
    onSelectPriceRange: setSelectedPriceRange,
    selectedFabric,
    onSelectFabric: setSelectedFabric,
    selectedOccasion,
    onSelectOccasion: setSelectedOccasion,
    selectedFit,
    onSelectFit: setSelectedFit,
    selectedAvailability,
    onSelectAvailability: setSelectedAvailability,
    selectedSize,
    onSelectSize: setSelectedSize,
    onClearAll: handleClearAll,
  };

  return (
    <div className="bg-[#FDFCFB]">
      {/* 1. Immersive Collection Hero */}
      <CollectionHero
        title={collectionParam ? "The Signature Series" : "Our Complete Legacy Wardrobe"}
        description={
          collectionParam
            ? "Explore our custom-curated editorial drops, hand-tailored using pure raw silk and gold wire work."
            : "Hand-tailored traditional menswear blending royal Indian heritage with minimal contemporary designs."
        }
        imageUrl="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1200"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Trail */}
        <Breadcrumbs
          items={[
            { label: "Atelier Collections", path: "/collections" },
            { label: "Legacy Wardrobe" },
          ]}
        />

        {/* Dynamic header and sorting */}
        <CollectionHeader
          count={filteredProducts.length}
          onSortChange={setActiveSort}
          activeSort={activeSort}
          onOpenFilters={() => setIsFilterOpen(true)}
        />

        {/* Active Filter Chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 py-4">
            {activeChips.map((chip, idx) => (
              <FilterChip key={idx} label={chip.label} onRemove={() => removeChip(chip.type)} />
            ))}
          </div>
        )}

        {/* Content Split: Left Sidebar Filters, Right Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Desktop Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <FilterSidebar {...filterSidebarProps} />
          </div>

          {/* Right Product Grid */}
          <div className="col-span-1 lg:col-span-9 space-y-12">
            {paginatedProducts.length > 0 ? (
              <>
                <ProductGrid products={paginatedProducts} columns={3} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="py-20 text-center space-y-4">
                <h3 className="font-serif text-xl text-[#1C1C1C]">No Masterpieces Found</h3>
                <p className="text-xs text-[#1C1C1C]/50 max-w-xs mx-auto">
                  Adjust your filter choices or clear all options to browse the complete atelier
                  collection.
                </p>
                <button
                  onClick={handleClearAll}
                  className="border border-[#1C1C1C] py-3 px-6 text-[10px] uppercase tracking-widest text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FDFCFB] transition-all rounded-none cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filterProps={filterSidebarProps}
      />
    </div>
  );
}
