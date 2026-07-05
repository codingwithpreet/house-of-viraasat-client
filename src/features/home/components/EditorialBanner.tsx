import { Link } from "react-router-dom";

export default function EditorialBanner() {
  return (
    <section
      className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden bg-[#1C1C1C]"
      aria-label="Heritage Spotlight"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-black/50 z-1" />
      <img
        src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1600"
        alt="Heritage Loom Studio detail"
        loading="lazy"
        className="w-full h-full object-cover object-center"
      />

      {/* Central Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 z-2">
        <div className="max-w-2xl space-y-6">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium font-sans block">
            PRESERVING THE GENTLE ART
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#FDFCFB] font-light leading-tight tracking-wide">
            The Ancestral Textile Journals
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#FDFCFB]/80 max-w-lg mx-auto leading-relaxed font-light">
            Insights authored by our weavers and master tailors on dating back to the Rigveda, the
            royal art of sewing gold threads into heavy silk in our Jaipur atelier.
          </p>

          <div className="pt-4">
            <Link
              to="/products"
              className="inline-block bg-[#FDFCFB] text-[#1C1C1C] hover:bg-[#540B0E] hover:text-[#FDFCFB] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase transition-all duration-300 rounded-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#FDFCFB]"
            >
              Read Atelier Diaries
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
