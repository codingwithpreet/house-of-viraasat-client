import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import type { LookItem } from "../data/related.data";

interface CompleteTheLookProps {
  items: LookItem[];
}

export default function CompleteTheLook({ items }: CompleteTheLookProps) {
  if (items.length === 0) return null;

  return (
    <section className="py-16 border-t border-[#E5E1DA]">
      <div className="text-center mb-10 space-y-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans">
          Curated by Atelier
        </span>
        <h2 className="font-serif text-2xl text-[#1C1C1C] font-light">Complete the Look</h2>
        <p className="font-sans text-xs text-[#1C1C1C]/55 max-w-md mx-auto">
          Pair your sherwani with these curated pieces for the complete ceremonial ensemble.
        </p>
      </div>

      {/* Vertical outfit chain */}
      <div className="max-w-sm mx-auto space-y-3">
        {items.map((item, idx) => (
          <div key={item.id}>
            <Link
              to={item.link}
              className="flex items-center gap-4 border border-[#E5E1DA] p-3 hover:border-[#C5A059] transition-all group bg-[#FDFCFB]"
            >
              {/* Thumbnail */}
              <div className="w-16 aspect-[3/4] flex-shrink-0 overflow-hidden bg-[#F5F2ED] border border-[#E5E1DA]/50">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Details */}
              <div className="flex-1 text-left">
                <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-medium font-sans block">
                  {item.type}
                </span>
                <h4 className="font-serif text-sm text-[#1C1C1C] group-hover:text-[#540B0E] transition-colors leading-tight mt-0.5">
                  {item.name}
                </h4>
                <span className="text-[11px] font-semibold font-sans text-[#1C1C1C] block mt-1">
                  ₹&nbsp;{item.price.toLocaleString("en-IN")}
                </span>
              </div>
            </Link>

            {/* Plus connector between items */}
            {idx < items.length - 1 && (
              <div className="flex justify-center py-1">
                <Plus className="w-4 h-4 text-[#1C1C1C]/30 stroke-[1.5]" />
              </div>
            )}
          </div>
        ))}

        {/* Add all to cart CTA */}
        <div className="pt-3">
          <button className="w-full border border-[#E5E1DA] py-4 text-[10px] uppercase tracking-[0.3em] font-medium font-sans text-[#1C1C1C] hover:border-[#C5A059] transition-all cursor-pointer">
            Shop the Full Look
          </button>
        </div>
      </div>
    </section>
  );
}
