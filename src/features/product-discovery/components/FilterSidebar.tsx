import { FilterAccordion } from "./DiscoveryComponents";
import { colors, sizes, fabrics, fits, occasions } from "../data/products.data";
import { priceRanges, availabilityOptions } from "../data/filters.data";

export interface FilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (val: string) => void;
  selectedPriceRange: string;
  onSelectPriceRange: (val: string) => void;
  selectedFabric: string;
  onSelectFabric: (val: string) => void;
  selectedOccasion: string;
  onSelectOccasion: (val: string) => void;
  selectedFit: string;
  onSelectFit: (val: string) => void;
  selectedAvailability: string;
  onSelectAvailability: (val: string) => void;
  selectedSize: string;
  onSelectSize: (val: string) => void;
  onClearAll: () => void;
}

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  selectedPriceRange,
  onSelectPriceRange,
  selectedFabric,
  onSelectFabric,
  selectedOccasion,
  onSelectOccasion,
  selectedFit,
  onSelectFit,
  selectedAvailability,
  onSelectAvailability,
  selectedSize,
  onSelectSize,
  onClearAll,
}: FilterSidebarProps) {
  return (
    <aside className="w-full space-y-6 text-left" role="search">
      <div className="flex justify-between items-center pb-2 border-b border-[#E5E1DA]">
        <h3 className="font-serif text-sm tracking-wider uppercase text-[#1C1C1C] font-semibold">
          Tailoring Filters
        </h3>
        <button
          onClick={onClearAll}
          className="text-[9px] uppercase tracking-wider text-[#540B0E] hover:underline font-sans font-medium cursor-pointer"
        >
          Clear All
        </button>
      </div>

      {/* Category Accordion */}
      <FilterAccordion title="Category">
        {["sherwani", "kurta", "bandhgala", "nehru-jacket", "accessories"].map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-2 text-xs font-sans text-[#1C1C1C]/75 cursor-pointer hover:text-[#1C1C1C]"
          >
            <input
              type="checkbox"
              checked={selectedCategory === cat}
              onChange={() => onSelectCategory(selectedCategory === cat ? "" : cat)}
              className="rounded-none border-[#E5E1DA] text-[#540B0E] focus:ring-[#540B0E]"
            />
            <span className="capitalize">{cat.replace("-", " ")}</span>
          </label>
        ))}
      </FilterAccordion>

      {/* Price Accordion */}
      <FilterAccordion title="Price Limit">
        {priceRanges.map((pr, i) => (
          <label
            key={i}
            className="flex items-center gap-2 text-xs font-sans text-[#1C1C1C]/75 cursor-pointer hover:text-[#1C1C1C]"
          >
            <input
              type="checkbox"
              checked={selectedPriceRange === pr.label}
              onChange={() => onSelectPriceRange(selectedPriceRange === pr.label ? "" : pr.label)}
              className="rounded-none border-[#E5E1DA] text-[#540B0E] focus:ring-[#540B0E]"
            />
            <span>{pr.label}</span>
          </label>
        ))}
      </FilterAccordion>

      {/* Fabrics Accordion */}
      <FilterAccordion title="Ancestral Fabric">
        {fabrics.map((fb) => (
          <label
            key={fb}
            className="flex items-center gap-2 text-xs font-sans text-[#1C1C1C]/75 cursor-pointer hover:text-[#1C1C1C]"
          >
            <input
              type="checkbox"
              checked={selectedFabric === fb}
              onChange={() => onSelectFabric(selectedFabric === fb ? "" : fb)}
              className="rounded-none border-[#E5E1DA] text-[#540B0E] focus:ring-[#540B0E]"
            />
            <span>{fb}</span>
          </label>
        ))}
      </FilterAccordion>

      {/* Occasion Accordion */}
      <FilterAccordion title="Ceremony / Occasion">
        {occasions.map((oc) => (
          <label
            key={oc.value}
            className="flex items-center gap-2 text-xs font-sans text-[#1C1C1C]/75 cursor-pointer hover:text-[#1C1C1C]"
          >
            <input
              type="checkbox"
              checked={selectedOccasion === oc.value}
              onChange={() => onSelectOccasion(selectedOccasion === oc.value ? "" : oc.value)}
              className="rounded-none border-[#E5E1DA] text-[#540B0E] focus:ring-[#540B0E]"
            />
            <span>{oc.label}</span>
          </label>
        ))}
      </FilterAccordion>

      {/* Fit Accordion */}
      <FilterAccordion title="Posture Fit">
        {fits.map((ft) => (
          <label
            key={ft}
            className="flex items-center gap-2 text-xs font-sans text-[#1C1C1C]/75 cursor-pointer hover:text-[#1C1C1C]"
          >
            <input
              type="checkbox"
              checked={selectedFit === ft}
              onChange={() => onSelectFit(selectedFit === ft ? "" : ft)}
              className="rounded-none border-[#E5E1DA] text-[#540B0E] focus:ring-[#540B0E]"
            />
            <span className="capitalize">{ft}</span>
          </label>
        ))}
      </FilterAccordion>

      {/* Availability Accordion */}
      <FilterAccordion title="Atelier Availability">
        {availabilityOptions.map((av) => (
          <label
            key={av.value}
            className="flex items-center gap-2 text-xs font-sans text-[#1C1C1C]/75 cursor-pointer hover:text-[#1C1C1C]"
          >
            <input
              type="checkbox"
              checked={selectedAvailability === av.value}
              onChange={() =>
                onSelectAvailability(selectedAvailability === av.value ? "" : av.value)
              }
              className="rounded-none border-[#E5E1DA] text-[#540B0E] focus:ring-[#540B0E]"
            />
            <span>{av.label}</span>
          </label>
        ))}
      </FilterAccordion>

      {/* Sizes Accordion */}
      <FilterAccordion title="Atelier Size">
        <div className="grid grid-cols-5 gap-2">
          {sizes.map((sz) => (
            <button
              key={sz}
              onClick={() => onSelectSize(selectedSize === sz ? "" : sz)}
              className={`border text-[10px] py-1.5 text-center font-sans uppercase transition-all rounded-none cursor-pointer ${
                selectedSize === sz
                  ? "bg-[#1C1C1C] text-[#FDFCFB] border-[#1C1C1C]"
                  : "border-[#E5E1DA] text-[#1C1C1C] hover:border-[#C5A059]"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </FilterAccordion>

      {/* Colors Accordion */}
      <FilterAccordion title="Noble Color">
        <div className="flex flex-wrap gap-2.5">
          {colors.map((cl) => (
            <button
              key={cl.name}
              onClick={() => {}}
              className="w-5 h-5 rounded-full border border-[#E5E1DA]/60 cursor-pointer relative flex items-center justify-center"
              style={{ backgroundColor: cl.hex }}
              title={cl.name}
            />
          ))}
        </div>
      </FilterAccordion>
    </aside>
  );
}
