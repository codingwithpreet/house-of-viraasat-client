import { useEffect } from "react";
import { X } from "lucide-react";
import { sizeChart } from "../data/variants.data";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#1C1C1C]/50 backdrop-blur-xs" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-[#FDFCFB] w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto z-10 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#FDFCFB] border-b border-[#E5E1DA] px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 id="size-guide-title" className="font-serif text-lg text-[#1C1C1C] tracking-wide">
              Atelier Size Guide
            </h2>
            <p className="text-[10px] font-sans text-[#1C1C1C]/50 mt-0.5">
              All measurements in inches
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:opacity-60 transition-opacity cursor-pointer"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5 stroke-[1.25]" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
          {/* Sizing table */}
          <div>
            <h3 className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#C5A059] mb-4">
              Sherwani Size Chart
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-sans border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E1DA]">
                    {["Size", "Chest", "Waist", "Hip", "Shoulder", "Length"].map((h) => (
                      <th
                        key={h}
                        className="text-left py-2.5 pr-4 text-[9px] uppercase tracking-wider font-semibold text-[#1C1C1C]/60"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.map((row, idx) => (
                    <tr
                      key={row.size}
                      className={`border-b border-[#E5E1DA]/50 ${idx % 2 === 0 ? "bg-[#F5F2ED]/30" : ""}`}
                    >
                      <td className="py-3 pr-4 font-semibold text-[#1C1C1C]">{row.size}</td>
                      <td className="py-3 pr-4 text-[#1C1C1C]/70">{row.chest}</td>
                      <td className="py-3 pr-4 text-[#1C1C1C]/70">{row.waist}</td>
                      <td className="py-3 pr-4 text-[#1C1C1C]/70">{row.hip}</td>
                      <td className="py-3 pr-4 text-[#1C1C1C]/70">{row.shoulder}</td>
                      <td className="py-3 text-[#1C1C1C]/70">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to measure */}
          <div>
            <h3 className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#C5A059] mb-4">
              How to Measure
            </h3>
            <div className="space-y-4">
              {[
                {
                  label: "Chest",
                  instruction:
                    "Measure around the fullest part of your chest, keeping the tape horizontal.",
                },
                {
                  label: "Waist",
                  instruction:
                    "Measure around the narrowest part of your natural waist, 1 inch above the navel.",
                },
                {
                  label: "Hip",
                  instruction:
                    "Measure around the fullest part of your hip, approximately 8 inches below your waistline.",
                },
                {
                  label: "Shoulder",
                  instruction:
                    "Measure across your back from the tip of one shoulder to the other.",
                },
                {
                  label: "Length",
                  instruction:
                    "Measure from the top of your shoulder to your knee (standard sherwani length).",
                },
              ].map((m) => (
                <div key={m.label} className="flex gap-4">
                  <span className="text-[10px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C] w-20 flex-shrink-0 mt-0.5">
                    {m.label}
                  </span>
                  <p className="font-sans text-xs text-[#1C1C1C]/65 leading-relaxed">
                    {m.instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sizing note */}
          <div className="bg-[#F5F2ED] border border-[#E5E1DA] p-4">
            <p className="text-[10px] font-sans text-[#1C1C1C]/65 leading-relaxed">
              <span className="font-semibold text-[#1C1C1C]">Atelier Recommendation:</span> If you
              fall between two sizes, we recommend ordering the larger size. All House of Viraasat
              sherwanis include two complimentary alteration sessions to achieve a perfect fit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
