import { useEffect } from "react";
import { X } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import type { FilterSidebarProps } from "./FilterSidebar";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filterProps: FilterSidebarProps; // Accept all filter props to pass down
}

export default function FilterDrawer({ isOpen, onClose, filterProps }: FilterDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1C1C]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm h-full bg-[#FDFCFB] shadow-2xl flex flex-col z-10 animate-slide-in-left">
        {/* Header */}
        <div className="h-16 px-6 border-b border-[#E5E1DA] flex items-center justify-between">
          <h2 className="font-serif text-sm tracking-[0.2em] text-[#1C1C1C] uppercase">
            Filter Atelier
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-[#1C1C1C] hover:opacity-60 transition-opacity cursor-pointer"
            aria-label="Close filters"
          >
            <X className="w-5 h-5 stroke-[1.25]" />
          </button>
        </div>

        {/* Scrollable Filters Body */}
        <div className="flex-grow overflow-y-auto p-6">
          <FilterSidebar {...filterProps} />
        </div>

        {/* Footer Actions */}
        <div className="border-t border-[#E5E1DA] p-6 bg-[#FDFCFB]">
          <button
            onClick={onClose}
            className="w-full bg-[#1C1C1C] text-[#FDFCFB] py-4 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#540B0E] transition-all rounded-none cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
