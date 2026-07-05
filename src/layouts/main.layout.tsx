import { Outlet } from "react-router-dom";
import AnnouncementBar from "../components/AnnouncementBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SearchDrawer, CartDrawer, WishlistDrawer } from "../components/Drawers";
import MobileNavigation from "../components/MobileNavigation";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFB]">
      {/* Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#540B0E] text-[#FDFCFB] px-4 py-2.5 z-50 text-[10px] tracking-widest font-semibold font-sans uppercase rounded-none"
      >
        Skip to main content
      </a>

      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Header (will manage its own sticky/scrolled layout) */}
      <Header />

      {/* Main Content Area */}
      <main id="main-content" className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawers Overlays */}
      <SearchDrawer />
      <CartDrawer />
      <WishlistDrawer />
      <MobileNavigation />
    </div>
  );
}
