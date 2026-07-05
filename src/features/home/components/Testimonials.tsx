import { Star } from "lucide-react";
import { testimonials } from "../data/testimonials.data";

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block">
            GUEST EXPERIENCES
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1C1C] font-normal tracking-wide">
            Testimonials from our Patrons
          </h2>
          <div className="w-12 h-px bg-[#C5A059]/40 mx-auto mt-4" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="border border-[#E5E1DA] p-8 flex flex-col justify-between text-left space-y-6 bg-[#FDFCFB]"
            >
              {/* Star Rating */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059] stroke-none" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-serif text-xs sm:text-sm text-[#1C1C1C]/80 leading-relaxed italic">
                "{t.review}"
              </p>

              {/* Customer Identity */}
              <div className="border-t border-[#E5E1DA]/60 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-sans text-xs font-semibold text-[#1C1C1C] uppercase tracking-wider">
                    {t.name}
                  </h4>
                  <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-medium block mt-0.5">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
