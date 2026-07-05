import { Link } from "react-router-dom";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { ArrowLeft, Compass, ShieldCheck, ShoppingBag, UserCheck, Settings } from "lucide-react";

export default function DebugPage() {
  useDocumentMetadata({
    title: "Atelier Debug Map",
  });

  const sections = [
    {
      title: "Core & Homepage",
      icon: Compass,
      routes: [
        { path: "/", label: "Main Landing Homepage", desc: "Hero banners, choices showcase, newsletter & story blocks" },
      ],
    },
    {
      title: "Authentication Module",
      icon: ShieldCheck,
      routes: [
        { path: "/login", label: "Login Access", desc: "Email/password credentials entrance page" },
        { path: "/register", label: "Register Account", desc: "New member credentials enrollment form" },
        { path: "/forgot-password", label: "Forgot Password Reset Request", desc: "Request recovery OTP validation mail" },
        { path: "/reset-password", label: "Reset Password Form", desc: "Setup new credentials form page" },
        { path: "/verify-email", label: "Verify Email OTP", desc: "6-digit OTP verification panel code" },
        { path: "/verification-pending", label: "Verification Pending State", desc: "Pending confirmation fallback page" },
        { path: "/auth-success", label: "Auth Registration Success Screen", desc: "Success verification confirmation" },
      ],
    },
    {
      title: "Product Discovery & Details",
      icon: ShoppingBag,
      routes: [
        { path: "/collections", label: "Collections Landing", desc: "Signature legacy collection story cards" },
        { path: "/products", label: "Atelier Catalog Listing", desc: "Product discovery grid listing with active filter sidebar" },
        { path: "/category/sherwanis", label: "Category: Sherwanis", desc: "Category filtered listing catalog view" },
        { path: "/search?q=Cream", label: "Search Results for 'Cream'", desc: "Products matching query results list panel" },
        { path: "/products/p1", label: "PDP: Maharaja Cream Sherwani", desc: "Hover zoom gallery, sizing variant selector, guide modals" },
      ],
    },
    {
      title: "Commerce Experience",
      icon: ShoppingBag,
      routes: [
        { path: "/wishlist", label: "My Atelier Wishlist", desc: "Saved item list, sorting, remove actions, recommended cards" },
        { path: "/cart", label: "Atelier Shopping Bag", desc: "Subtotal summary, coupon apply codes (try ROYAL10), gift notes" },
        { path: "/checkout", label: "Secure Multi-Step Checkout", desc: "Address lists, billing settings, UPI/Card validation, order review" },
        { path: "/order-success", label: "Order Confirmed Success Screen", desc: "Confirmation, timelines track cards, accessories suggestions" },
      ],
    },
    {
      title: "Customer Account Workspace",
      icon: UserCheck,
      routes: [
        { path: "/account", label: "Account Overview Dashboard", desc: "Welcome member loyalty points card and completion widgets" },
        { path: "/account/profile", label: "My Profile Editor", desc: "Avatar upload panel and personal detail forms" },
        { path: "/account/orders", label: "Order History Records", desc: "Filterable log grids of past atelier transactions" },
        { path: "/account/orders/o1", label: "Active Order details", desc: "Tailoring progress checkpoints timeline and invoice triggers" },
        { path: "/account/addresses", label: "Addresses CRUD Book", desc: "Create, read, update, set defaults, delete address selectors" },
        { path: "/account/settings", label: "Preferences & Localization Settings", desc: "SMS alerts, currency preferences, newsletters checkboxes" },
        { path: "/account/security", label: "Security: Change Password", desc: "Sentinel strength metric checker forms" },
      ],
    },
    {
      title: "System Feedback States",
      icon: Settings,
      routes: [
        { path: "/non-existent-page", label: "404 Page (Not Found)", desc: "Triggers default not found error fallback screen" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
        
        {/* Header */}
        <div className="border-b border-[#E5E1DA] pb-6 mb-10">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium font-sans">
            DEVELOPMENT WIDGET
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1C1C] font-light mt-2 tracking-wide">
            Atelier Page Directory Map
          </h1>
          <p className="font-sans text-xs text-[#1C1C1C]/50 mt-2">
            A secure layout index mapping all 22+ active customer-facing pages and states built across 8 modules.
          </p>
        </div>

        {/* Grid of Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div key={idx} className="border border-[#E5E1DA] p-6 bg-[#FDFCFB] space-y-4 shadow-xs">
                <div className="flex items-center gap-2.5 border-b border-[#E5E1DA] pb-3 text-[#C5A059]">
                  <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
                  <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#1C1C1C]">
                    {section.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {section.routes.map((route, rIdx) => (
                    <div key={rIdx} className="group flex flex-col gap-0.5">
                      <Link
                        to={route.path}
                        className="font-serif text-xs font-semibold text-[#1C1C1C] hover:text-[#540B0E] transition-colors inline-flex items-center gap-1.5"
                      >
                        {route.label}
                        <ArrowLeft className="w-3 h-3 rotate-180 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </Link>
                      <span className="text-[9px] font-sans text-[#1C1C1C]/50 tracking-wider">
                        Route: <code className="text-[#540B0E] font-mono">{route.path}</code>
                      </span>
                      <p className="font-sans text-[10px] text-[#1C1C1C]/60 leading-relaxed mt-0.5">
                        {route.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="text-center mt-12 pt-6 border-t border-[#E5E1DA]">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#1C1C1C] text-[#FDFCFB] py-3.5 px-6 text-[10px] uppercase tracking-widest font-sans hover:bg-[#540B0E] transition-all"
          >
            Go to Landing Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}
