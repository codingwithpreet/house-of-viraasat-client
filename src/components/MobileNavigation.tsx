import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, ChevronRight } from "lucide-react";
import { useUIStore } from "../store/ui.store";

export default function MobileNavigation() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  if (!mobileMenuOpen) return null;

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1C1C]/40 backdrop-blur-xs transition-opacity duration-500"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Panel (Slides out from Left) */}
      <div className="relative w-full max-w-xs h-full bg-[#FDFCFB] shadow-2xl flex flex-col z-10 animate-slide-in-left">
        {/* Header */}
        <div className="h-16 px-6 border-b border-[#E5E1DA] flex items-center justify-between">
          <span className="font-serif text-xs tracking-[0.2em] text-[#C5A059] uppercase">
            Atelier Menu
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 -mr-2 text-[#1C1C1C] hover:opacity-60 transition-opacity cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 stroke-[1.25]" />
          </button>
        </div>

        {/* Links Body */}
        <div className="flex-grow overflow-y-auto px-6 py-8 space-y-6">
          <div className="space-y-4">
            <button
              onClick={() => handleNavClick("/")}
              className="w-full flex items-center justify-between text-left font-serif text-base text-[#1C1C1C] hover:text-[#C5A059] py-2 cursor-pointer"
            >
              <span>Atelier Home</span>
              <ChevronRight className="w-4 h-4 opacity-45 stroke-[1.25]" />
            </button>
            <button
              onClick={() => handleNavClick("/products")}
              className="w-full flex items-center justify-between text-left font-serif text-base text-[#1C1C1C] hover:text-[#C5A059] py-2 cursor-pointer"
            >
              <span>Sovereign Collections</span>
              <ChevronRight className="w-4 h-4 opacity-45 stroke-[1.25]" />
            </button>
            <button
              onClick={() => handleNavClick("/")}
              className="w-full flex items-center justify-between text-left font-serif text-base text-[#1C1C1C] hover:text-[#C5A059] py-2 cursor-pointer"
            >
              <span>Heritage Story</span>
              <ChevronRight className="w-4 h-4 opacity-45 stroke-[1.25]" />
            </button>
          </div>

          <div className="border-t border-[#E5E1DA] pt-6 space-y-4">
            <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-medium block">
              Noble Account
            </span>
            <button
              onClick={() => handleNavClick("/login")}
              className="w-full text-left font-sans text-xs uppercase tracking-wider text-[#1C1C1C]/70 hover:text-[#1C1C1C] block py-1 cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => handleNavClick("/register")}
              className="w-full text-left font-sans text-xs uppercase tracking-wider text-[#1C1C1C]/70 hover:text-[#1C1C1C] block py-1 cursor-pointer"
            >
              Register Account
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#E5E1DA] p-6 text-center text-[9px] tracking-wider uppercase text-[#1C1C1C]/40">
          House of Viraasat Atelier
        </div>
      </div>
    </div>
  );
}
