import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Heart, User, ShoppingBag, Menu } from "lucide-react";
import { useUIStore } from "../store/ui.store";

export default function Header() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const setSearchDrawerOpen = useUIStore((state) => state.setSearchDrawerOpen);
  const setCartDrawerOpen = useUIStore((state) => state.setCartDrawerOpen);
  const setWishlistDrawerOpen = useUIStore((state) => state.setWishlistDrawerOpen);
  const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine navbar styles based on route and scroll state
  const headerBgClass =
    isHome && !isScrolled
      ? "bg-transparent text-white border-transparent"
      : "bg-[#FDFCFB]/95 backdrop-blur-md border-b border-[#E5E1DA] text-[#1C1C1C]";

  const headerHeightClass = isScrolled ? "py-3" : "py-5";

  return (
    <header
      role="banner"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${headerBgClass} ${headerHeightClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Mobile Menu Toggle / Desktop Navigation */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-current hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-[18px] h-[18px] stroke-[1.25]" />
            </button>

            <nav className="hidden lg:flex items-center gap-8" role="navigation">
              <Link
                to="/"
                className="font-sans text-[11px] font-semibold uppercase tracking-wider hover:text-[#C5A059] transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="font-sans text-[11px] font-semibold uppercase tracking-wider hover:text-[#C5A059] transition-colors"
              >
                Collections
              </Link>
              <Link
                to="/"
                className="font-sans text-[11px] font-semibold uppercase tracking-wider hover:text-[#C5A059] transition-colors"
              >
                Our Heritage
              </Link>
            </nav>
          </div>

          {/* Center: Branding */}
          <div className="text-center flex flex-col items-center">
            <Link to="/" className="flex flex-col items-center group">
              <h1 className="font-serif text-xl sm:text-2xl tracking-[0.3em] font-light uppercase text-current">
                House of Viraasat
              </h1>
              <span className="font-sans text-[7px] tracking-[0.4em] uppercase opacity-60 mt-0.5">
                Heritage . Tailoring . Luxury
              </span>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSearchDrawerOpen(true)}
              className="p-2 text-current hover:text-[#C5A059] transition-colors cursor-pointer"
              aria-label="Search Collection"
            >
              <Search className="w-[18px] h-[18px] stroke-[1.25]" />
            </button>

            <button
              onClick={() => setWishlistDrawerOpen(true)}
              className="p-2 text-current hover:text-[#C5A059] transition-colors cursor-pointer relative"
              aria-label="View Wishlist"
            >
              <Heart className="w-[18px] h-[18px] stroke-[1.25]" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#540B0E] rounded-full" />
            </button>

            <Link
              to="/account/profile"
              className="p-2 text-current hover:text-[#C5A059] transition-colors"
              aria-label="Access Account Profile"
            >
              <User className="w-[18px] h-[18px] stroke-[1.25]" />
            </Link>

            <button
              onClick={() => setCartDrawerOpen(true)}
              className="p-2 text-current hover:text-[#C5A059] transition-colors cursor-pointer relative"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-[18px] h-[18px] stroke-[1.25]" />
              <span className="absolute -top-0.5 -right-0.5 bg-[#540B0E] text-[#FDFCFB] text-[8px] font-sans font-bold w-4 h-4 flex items-center justify-center rounded-full leading-none scale-90">
                2
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
