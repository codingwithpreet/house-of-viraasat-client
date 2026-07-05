import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2, ZoomIn } from "lucide-react";
import type { ProductImage } from "../data/product.data";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % images.length) + images.length) % images.length);
    },
    [images.length],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isModalOpen) {
        if (e.key === "ArrowRight") goNext();
        if (e.key === "ArrowLeft") goPrev();
        if (e.key === "Escape") setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isModalOpen, goNext, goPrev]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnail Strip — vertical on desktop, horizontal on mobile */}
      <div className="flex flex-row lg:flex-col gap-2 lg:w-20 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto lg:max-h-[640px]">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setActiveIndex(idx)}
            className={`flex-shrink-0 w-16 lg:w-20 aspect-[3/4] overflow-hidden border-2 transition-all duration-200 rounded-none cursor-pointer ${
              idx === activeIndex
                ? "border-[#1C1C1C]"
                : "border-[#E5E1DA] hover:border-[#C5A059]/60"
            }`}
            aria-label={`View image ${idx + 1}`}
            aria-current={idx === activeIndex}
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Primary Image Display */}
      <div className="flex-1 relative group">
        {/* Main image with zoom */}
        <div
          className="relative aspect-[3/4] bg-[#F5F2ED] border border-[#E5E1DA] overflow-hidden cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <img
            src={activeImage.url}
            alt={activeImage.alt}
            className={`w-full h-full object-cover object-top transition-transform duration-300 ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            style={isZoomed ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : undefined}
          />

          {/* Image counter */}
          <div className="absolute bottom-4 left-4 bg-[#1C1C1C]/60 text-[#FDFCFB] text-[10px] font-sans px-3 py-1.5 tracking-wider backdrop-blur-xs">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Fullscreen trigger */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-4 right-4 p-2 bg-[#FDFCFB]/80 hover:bg-[#FDFCFB] border border-[#E5E1DA]/50 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            aria-label="Open fullscreen gallery"
          >
            <Maximize2 className="w-4 h-4 stroke-[1.25]" />
          </button>

          {/* Zoom hint */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-[#1C1C1C]/60 text-[#FDFCFB] text-[9px] font-sans px-3 py-1.5 tracking-wider backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3 h-3" />
            Hover to zoom
          </div>
        </div>

        {/* Prev / Next Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#FDFCFB]/80 hover:bg-[#FDFCFB] border border-[#E5E1DA]/50 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#FDFCFB]/80 hover:bg-[#FDFCFB] border border-[#E5E1DA]/50 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 stroke-[1.5]" />
            </button>
          </>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0A0A0A]/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image gallery"
        >
          {/* Close button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 p-3 text-[#FDFCFB]/70 hover:text-[#FDFCFB] transition-colors cursor-pointer z-10"
            aria-label="Close fullscreen gallery"
          >
            <X className="w-6 h-6 stroke-[1.25]" />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[#FDFCFB]/60 text-[11px] font-sans uppercase tracking-widest">
            {activeIndex + 1} of {images.length}
          </div>

          {/* Prev */}
          <button
            onClick={goPrev}
            className="absolute left-4 sm:left-8 p-3 text-[#FDFCFB]/70 hover:text-[#FDFCFB] transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 stroke-[1]" />
          </button>

          {/* Main full image */}
          <div className="w-full max-w-2xl px-16">
            <img
              src={activeImage.url}
              alt={activeImage.alt}
              className="w-full max-h-[85vh] object-contain"
            />
          </div>

          {/* Next */}
          <button
            onClick={goNext}
            className="absolute right-4 sm:right-8 p-3 text-[#FDFCFB]/70 hover:text-[#FDFCFB] transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 stroke-[1]" />
          </button>

          {/* Thumbnail strip inside modal */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setActiveIndex(idx)}
                className={`w-12 aspect-[3/4] overflow-hidden border-2 transition-all cursor-pointer rounded-none ${
                  idx === activeIndex
                    ? "border-[#C5A059]"
                    : "border-[#FDFCFB]/20 hover:border-[#FDFCFB]/50"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              >
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
