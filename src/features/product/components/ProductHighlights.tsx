import { Gem, Sparkles, Crown, Scissors, RefreshCw, Globe } from "lucide-react";
import type { ProductHighlight } from "../data/product.data";

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Gem,
  Sparkles,
  Crown,
  Scissors,
  RefreshCw,
  Globe,
};

interface ProductHighlightsProps {
  highlights: ProductHighlight[];
}

export default function ProductHighlights({ highlights }: ProductHighlightsProps) {
  return (
    <div className="py-5 border-t border-[#E5E1DA]">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {highlights.map((hl, idx) => {
          const Icon = iconMap[hl.icon] || Sparkles;
          return (
            <div
              key={idx}
              className="flex flex-col items-center text-center gap-2 p-3 bg-[#F5F2ED] border border-[#E5E1DA]/50 group hover:border-[#C5A059]/40 transition-colors"
            >
              <div className="w-8 h-8 flex items-center justify-center text-[#C5A059]">
                <Icon className="w-5 h-5" strokeWidth={1.25} />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C] block">
                  {hl.label}
                </span>
                <span className="text-[9px] font-sans text-[#1C1C1C]/55 leading-tight block mt-0.5">
                  {hl.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
