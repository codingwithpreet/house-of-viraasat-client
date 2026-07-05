import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { heroSlides } from "../data/hero.data";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative w-full h-[85vh] sm:h-[90vh] overflow-hidden bg-[#1C1C1C]"
      aria-label="Atelier Highlights"
    >
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-black/40 z-1" />
            <img
              src={slide.imageUrl}
              alt={slide.subtitle}
              className={`w-full h-full object-cover object-top transition-transform duration-[6000ms] ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 z-2">
              <div className="max-w-3xl space-y-4 sm:space-y-6">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#C5A059] font-medium font-sans block animate-fade-in">
                  {slide.title}
                </span>

                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FDFCFB] font-light leading-tight tracking-wide">
                  {slide.subtitle}
                </h2>

                <p className="font-sans text-xs sm:text-sm text-[#FDFCFB]/80 max-w-xl mx-auto leading-relaxed font-light">
                  {slide.tagline}
                </p>

                <div className="pt-4 sm:pt-6">
                  <Link
                    to={slide.ctaLink}
                    className="inline-block bg-[#FDFCFB] text-[#1C1C1C] hover:bg-[#540B0E] hover:text-[#FDFCFB] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase transition-all duration-300 rounded-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#FDFCFB]"
                  >
                    {slide.ctaText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
              index === currentSlide ? "bg-[#C5A059] w-6" : "bg-[#FDFCFB]/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
