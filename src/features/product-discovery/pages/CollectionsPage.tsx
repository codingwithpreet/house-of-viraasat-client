import { Link } from "react-router-dom";
import { collections } from "../data/collections.data";
import { categories } from "../data/categories.data";

import { useDocumentMetadata } from "../../../hooks/useDocumentMetadata";

export default function CollectionsPage() {
  useDocumentMetadata({
    title: "Signature Collections",
    description:
      "Explore the legacy collections of the House of Viraasat. From the Royal Groom Series to everyday heritage Kurta classics.",
    keywords: "groom collections, royal groom, designer kurtas, wedding collections",
  });

  return (
    <div className="bg-[#FDFCFB]">
      {/* Page Header */}
      <div className="py-16 text-center border-b border-[#E5E1DA]">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium font-sans">
          HOUSE OF VIRAASAT
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1C1C] font-light mt-4 tracking-wide">
          Our Complete Legacy Wardrobe
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#1C1C1C]/65 max-w-xl mx-auto leading-relaxed mt-4 font-light">
          Explore the full House of Viraasat selection of premium handcrafted traditional menswear
          and curated accessories.
        </p>
      </div>

      {/* Signature Collections Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        {collections.map((col, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={col.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Image Card (Right/Left based on parity) */}
              <div
                className={`lg:col-span-7 overflow-hidden aspect-[16/10] border border-[#E5E1DA] bg-[#F5F2ED] relative ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <img
                  src={col.imageUrl}
                  alt={col.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-[1500ms]"
                />
              </div>

              {/* Copy (Left/Right based on parity) */}
              <div
                className={`lg:col-span-5 space-y-5 text-left ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-semibold font-sans">
                  Signature Collection
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1C1C] font-normal leading-snug">
                  {col.name}
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#1C1C1C]/75 leading-relaxed font-light">
                  {col.description}
                </p>
                <div className="pt-2">
                  <Link
                    to={`/products?collection=${col.slug}`}
                    className="inline-block bg-[#1C1C1C] text-[#FDFCFB] hover:bg-[#540B0E] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase transition-all duration-300 rounded-none"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Categories Spotlight */}
      <div className="bg-[#F5F2ED] py-16 sm:py-24 border-t border-[#E5E1DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans">
              ATELIER SHAPES
            </span>
            <h3 className="font-serif text-xl sm:text-3xl text-[#1C1C1C] font-normal tracking-wide">
              Shop by Specific Silhouette
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.slice(0, 5).map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#E5E1DA] bg-[#FDFCFB] rounded-none mb-3">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-colors duration-300" />
                </div>
                <h4 className="font-serif text-xs sm:text-sm text-[#1C1C1C] group-hover:text-[#540B0E] transition-colors font-medium">
                  {cat.name}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
