import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  ShoppingBag,
  MapPin,
  Settings,
  ShieldCheck,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import { useToast } from "../../../providers/ToastProvider";

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Overview", path: "/account", icon: LayoutDashboard },
    { label: "My Profile", path: "/account/profile", icon: User },
    { label: "Order History", path: "/account/orders", icon: ShoppingBag },
    { label: "Saved Addresses", path: "/account/addresses", icon: MapPin },
    { label: "Preferences", path: "/account/settings", icon: Settings },
    { label: "Security & Pass", path: "/account/security", icon: ShieldCheck },
  ];

  const handleLogout = () => {
    setLogoutModalOpen(false);
    showToast("Successfully logged out from your Atelier account.", "success");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile Sidebar Trigger */}
        <div className="lg:hidden flex items-center justify-between border border-[#E5E1DA] p-3 mb-6 bg-[#F5F2ED]/50">
          <span className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]">
            Atelier Workspace
          </span>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-semibold text-[#C5A059] font-sans"
          >
            <Menu className="w-4 h-4" />
            Menu
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Sidenav Panel (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 border border-[#E5E1DA] bg-[#FDFCFB] p-6 space-y-6">
            <div className="border-b border-[#E5E1DA] pb-6">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold font-sans block mb-1">
                Welcome Back
              </span>
              <h3 className="font-serif text-lg text-[#1C1C1C]">Arjun Mehta</h3>
              <span className="text-[9px] text-[#1C1C1C]/45 uppercase tracking-widest block mt-0.5">
                Viraasat Gold Patron
              </span>
            </div>

            <nav
              className="flex flex-col gap-1.5"
              role="navigation"
              aria-label="Account navigation"
            >
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.path ||
                  (item.path !== "/account" && pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 border text-[11px] uppercase tracking-widest font-semibold font-sans transition-all duration-300 ${
                      active
                        ? "bg-[#1C1C1C] border-[#1C1C1C] text-[#FDFCFB]"
                        : "border-transparent text-[#1C1C1C]/60 hover:border-[#E5E1DA] hover:text-[#1C1C1C]"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                    {item.label}
                  </Link>
                );
              })}

              <button
                onClick={() => setLogoutModalOpen(true)}
                className="flex items-center gap-3 px-4 py-3 border border-transparent text-[11px] uppercase tracking-widest font-semibold font-sans text-[#991B1B] hover:border-[#991B1B]/20 hover:bg-[#991B1B]/5 transition-all duration-300 mt-4 text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                Logout
              </button>
            </nav>
          </aside>

          {/* RIGHT: Content Section */}
          <main className="lg:col-span-9 border border-[#E5E1DA] bg-[#FDFCFB] p-6 sm:p-8">
            {children}
          </main>
        </div>
      </div>

      {/* MOBILE DRAWER NAV */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex justify-start"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-[#1C1C1C]/45 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 h-full bg-[#FDFCFB] shadow-2xl flex flex-col z-10 p-6">
            <div className="flex items-center justify-between border-b border-[#E5E1DA] pb-4 mb-6">
              <div>
                <h3 className="font-serif text-base text-[#1C1C1C]">Arjun Mehta</h3>
                <span className="text-[8px] text-[#C5A059] uppercase tracking-widest block">
                  Gold Patron
                </span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 cursor-pointer">
                <X className="w-5 h-5 stroke-[1.25]" />
              </button>
            </div>

            <nav className="flex flex-col gap-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.path ||
                  (item.path !== "/account" && pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 border text-[10px] uppercase tracking-widest font-semibold font-sans transition-all ${
                      active
                        ? "bg-[#1C1C1C] border-[#1C1C1C] text-[#FDFCFB]"
                        : "border-transparent text-[#1C1C1C]/65 hover:border-[#E5E1DA]"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                    {item.label}
                  </Link>
                );
              })}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLogoutModalOpen(true);
                }}
                className="flex items-center gap-3 px-4 py-3 border border-transparent text-[10px] uppercase tracking-widest font-semibold font-sans text-[#991B1B] hover:bg-[#991B1B]/5 mt-4 text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* LOGOUT CONFIRMATION DIALOG */}
      {logoutModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-title"
        >
          <div
            className="absolute inset-0 bg-[#1C1C1C]/50 backdrop-blur-xs"
            onClick={() => setLogoutModalOpen(false)}
          />
          <div className="relative bg-[#FDFCFB] max-w-sm w-full p-6 border border-[#E5E1DA] shadow-2xl space-y-5 z-10 text-center">
            <div className="w-12 h-12 rounded-full bg-[#991B1B]/5 border border-[#991B1B]/20 flex items-center justify-center mx-auto text-[#991B1B]">
              <LogOut className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h4 id="logout-title" className="font-serif text-base text-[#1C1C1C] tracking-wide">
                Confirm Departure
              </h4>
              <p className="font-sans text-xs text-[#1C1C1C]/55 leading-relaxed mt-2">
                Are you sure you wish to log out from the House of Viraasat atelier catalog session?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="flex-1 bg-[#991B1B] text-[#FDFCFB] py-3 text-[10px] uppercase tracking-widest font-medium font-sans hover:bg-[#1C1C1C] transition-all cursor-pointer"
              >
                Log Out
              </button>
              <button
                onClick={() => setLogoutModalOpen(false)}
                className="flex-1 border border-[#E5E1DA] py-3 text-[10px] uppercase tracking-widest font-medium font-sans text-[#1C1C1C] hover:border-[#C5A059] transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
