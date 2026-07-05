import { Link } from "react-router-dom";
import { categories } from "../data/categories.data";

export default function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-24 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-12 sm:mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block">
            ATELIER SELECTIONS
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1C1C] font-normal tracking-wide">
            Browse by Signature Silhouettes
          </h2>
          <div className="w-12 h-px bg-[#C5A059]/40 mx-auto mt-4" />
        </div>

        {/* Scrollable Container (Mobile) or Grid (Desktop) */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-6 gap-6 pb-6 lg:pb-0 scrollbar-thin scrollbar-thumb-gold-200">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.path}
              className="flex-shrink-0 w-44 sm:w-56 lg:w-auto group flex flex-col relative"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] overflow-hidden border border-[#E5E1DA] bg-[#F5F2ED] rounded-none mb-3">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-[1000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
              </div>

              {/* Title label */}
              <div className="text-center">
                <h3 className="font-serif text-sm text-[#1C1C1C] group-hover:text-[#540B0E] transition-colors font-medium">
                  {cat.name}
                </h3>
                <span className="font-sans text-[9px] uppercase tracking-widest text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity duration-300 block mt-0.5">
                  View Collection →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
