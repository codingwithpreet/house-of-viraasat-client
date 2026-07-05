import { Link } from "react-router-dom";

export default function FeaturedCollection() {
  return (
    <section className="py-16 sm:py-24 bg-[#F5F2ED] border-y border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Editorial copy blocks (Left) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-semibold font-sans block">
              THE BRIDAL ANCESTRY
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1C1C] font-light leading-tight">
              The Royal Sherwani Heritage
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#1C1C1C]/70 leading-relaxed font-light">
              Crafted in collaboration with the weaver clusters of Varanasi and Jaipur, our
              signature Sherwanis are hand-loomed in pure raw silk. Detailed with intricate gold
              tilla and zardosi embroidery, each piece represents over 180 hours of legacy
              hand-tailoring.
            </p>

            <blockquote className="border-l border-[#C5A059] pl-4 py-1 italic font-serif text-sm text-[#1C1C1C]/80 my-4">
              "Woven threads that echo a centuries-old courtly royalty."
            </blockquote>

            <div className="pt-4">
              <Link
                to="/products?category=sherwani"
                className="inline-block bg-[#1C1C1C] text-[#FDFCFB] hover:bg-[#540B0E] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase transition-all duration-300 rounded-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#1C1C1C]"
              >
                Explore Sherwanis
              </Link>
            </div>
          </div>

          {/* Large image block (Right) */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 relative">
            {/* Outline decorative box */}
            <div className="absolute -inset-4 border border-[#C5A059]/20 pointer-events-none hidden lg:block" />

            <div className="col-span-8 overflow-hidden aspect-[3/4] border border-[#E5E1DA] bg-[#FDFCFB]">
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800"
                alt="Imperial Zardosi groom detail"
                loading="lazy"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-[1500ms]"
              />
            </div>

            <div className="col-span-4 overflow-hidden aspect-[3/4] border border-[#E5E1DA] bg-[#FDFCFB] mt-8">
              <img
                src="https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=500"
                alt="Gold thread tilla weaving detail"
                loading="lazy"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-[1500ms]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
