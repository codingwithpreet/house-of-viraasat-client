import { useState } from "react";
import { HelpCircle } from "lucide-react";
import type { ColorVariant, SizeVariant, FitVariant } from "../data/variants.data";
import SizeGuideModal from "./SizeGuideModal";

interface VariantSelectorProps {
  colors: ColorVariant[];
  sizes: SizeVariant[];
  fits: FitVariant[];
  fabricName: string;
  selectedColor: string;
  selectedSize: string;
  selectedFit: string;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
  onFitChange: (fit: string) => void;
}

export default function VariantSelector({
  colors,
  sizes,
  fits,
  fabricName,
  selectedColor,
  selectedSize,
  selectedFit,
  onColorChange,
  onSizeChange,
  onFitChange,
}: VariantSelectorProps) {
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Fabric Display */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]">
          Ancestral Fabric
        </span>
        <p className="text-xs font-sans text-[#1C1C1C]/70">{fabricName}</p>
      </div>

      {/* Color Swatches */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]">
            Colour —{" "}
            <span className="font-normal text-[#C5A059]">{selectedColor || "Select colour"}</span>
          </span>
        </div>
        <div className="flex gap-3 flex-wrap">
          {colors.map((color) => (
            <button
              key={color.name}
              disabled={!color.available}
              onClick={() => color.available && onColorChange(color.name)}
              title={color.available ? color.name : `${color.name} — unavailable`}
              aria-label={`Select ${color.name}${!color.available ? " (unavailable)" : ""}`}
              aria-pressed={selectedColor === color.name}
              className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer relative ${
                !color.available
                  ? "opacity-35 cursor-not-allowed"
                  : selectedColor === color.name
                    ? "border-[#1C1C1C] scale-110"
                    : "border-[#E5E1DA] hover:border-[#C5A059]"
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {!color.available && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="block w-6 h-px bg-[#1C1C1C]/50 rotate-45" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size Grid */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]">
            Size —{" "}
            <span className="font-normal text-[#C5A059]">{selectedSize || "Select size"}</span>
          </span>
          <button
            onClick={() => setSizeGuideOpen(true)}
            className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#1C1C1C]/50 hover:text-[#540B0E] transition-colors font-sans cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
            Size Guide
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {sizes.map((sv) => (
            <button
              key={sv.size}
              disabled={!sv.available}
              onClick={() => sv.available && onSizeChange(sv.size)}
              aria-label={`Size ${sv.label}${!sv.available ? " (unavailable)" : ""}`}
              aria-pressed={selectedSize === sv.size}
              className={`w-12 h-10 border text-[11px] font-medium font-sans tracking-wider transition-all rounded-none ${
                !sv.available
                  ? "border-[#E5E1DA] text-[#1C1C1C]/25 cursor-not-allowed line-through"
                  : selectedSize === sv.size
                    ? "bg-[#1C1C1C] text-[#FDFCFB] border-[#1C1C1C] cursor-pointer"
                    : "border-[#E5E1DA] text-[#1C1C1C] hover:border-[#C5A059] cursor-pointer"
              }`}
            >
              {sv.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fit Selector */}
      <div className="space-y-2.5">
        <span className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]">
          Posture Fit —{" "}
          <span className="font-normal text-[#C5A059]">{selectedFit || "Select fit"}</span>
        </span>
        <div className="flex flex-col gap-2">
          {fits.map((fit) => (
            <button
              key={fit.value}
              onClick={() => onFitChange(fit.value)}
              aria-pressed={selectedFit === fit.value}
              className={`flex items-start text-left gap-3 border p-3 transition-all rounded-none cursor-pointer ${
                selectedFit === fit.value
                  ? "border-[#1C1C1C] bg-[#F5F2ED]"
                  : "border-[#E5E1DA] hover:border-[#C5A059]"
              }`}
            >
              <span
                className={`w-3.5 h-3.5 mt-0.5 rounded-full border-2 flex-shrink-0 transition-colors ${
                  selectedFit === fit.value ? "border-[#1C1C1C] bg-[#1C1C1C]" : "border-[#E5E1DA]"
                }`}
              />
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C] block">
                  {fit.label}
                </span>
                <span className="text-[10px] font-sans text-[#1C1C1C]/55 leading-relaxed">
                  {fit.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
