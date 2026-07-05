import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Heart, MapPin, Package, ShieldCheck } from "lucide-react";
import type { CustomerProfile, OrderHistoryRecord } from "../data/account.data";

interface DashboardSectionProps {
  profile: CustomerProfile;
  recentOrder?: OrderHistoryRecord;
}

export default function DashboardSection({ profile, recentOrder }: DashboardSectionProps) {
  return (
    <div className="space-y-8 text-left animate-fade-in">
      {/* Editorial Header */}
      <div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block mb-1">
          Patron Space
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1C1C] font-light tracking-wide">
          Atelier Overview
        </h1>
        <p className="font-sans text-xs text-[#1C1C1C]/50 mt-1">
          Welcome back to the House of Viraasat. Explore your couture history, saved measurements,
          and rewards.
        </p>
      </div>

      {/* Loyalty & Profile Completion Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Loyalty Membership Card */}
        <div className="border border-[#C5A059]/40 bg-[#F5F2ED] p-6 space-y-4 relative overflow-hidden group">
          <div className="absolute right-0 bottom-0 opacity-5 translate-x-4 translate-y-4 select-none pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <Trophy className="w-48 h-48" />
          </div>

          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-[#C5A059]" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]">
              VIRAASAT LOYALTY CLUB
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-xl text-[#1C1C1C] font-normal">{profile.loyaltyTier}</h3>
            <p className="text-[10px] font-sans text-[#1C1C1C]/60 tracking-wider">
              Member since {profile.memberSince}
            </p>
          </div>

          <div className="pt-2 border-t border-[#E5E1DA] flex items-center justify-between">
            <div>
              <span className="text-[8px] uppercase tracking-widest text-[#1C1C1C]/50 block">
                Accrued Points
              </span>
              <span className="font-serif text-lg font-bold text-[#540B0E]">
                {profile.loyaltyPoints}
              </span>
            </div>
            <Link
              to="/account/settings"
              className="text-[9px] uppercase tracking-widest font-semibold font-sans text-[#C5A059] hover:text-[#1C1C1C] transition-colors flex items-center gap-1"
            >
              Benefits Guide <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Profile Completion Card */}
        <div className="border border-[#E5E1DA] p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]/50 block">
              Atelier Profile Setup
            </span>
            <h3 className="font-serif text-base text-[#1C1C1C] font-normal">
              Completion: {profile.profileCompletion}%
            </h3>
            <p className="font-sans text-xs text-[#1C1C1C]/55 leading-relaxed">
              Add your measurement details and body profile coordinates to unlock perfect-fit
              predictions.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 pt-2">
            <div className="h-1 bg-[#E5E1DA] overflow-hidden">
              <div
                className="h-full bg-[#1C1C1C] transition-all duration-1000"
                style={{ width: `${profile.profileCompletion}%` }}
              />
            </div>
            <Link
              to="/account/profile"
              className="text-[9px] uppercase tracking-widest font-semibold font-sans text-[#C5A059] hover:text-[#1C1C1C] transition-colors flex items-center gap-1 self-start"
            >
              Complete Sizing Profile <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Summary Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Recent Order Summary */}
        <div className="border border-[#E5E1DA] p-5 space-y-4 text-xs font-sans flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#E5E1DA] pb-2.5">
              <Package className="w-4 h-4 text-[#C5A059]" strokeWidth={1.5} />
              <span className="font-semibold text-[#1C1C1C] uppercase tracking-wider">
                Latest Order
              </span>
            </div>
            {recentOrder ? (
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] text-[#1C1C1C]/50 block">Order ID</span>
                  <span className="font-serif font-semibold text-[#1C1C1C]">
                    {recentOrder.orderNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <span className="text-[10px] text-[#1C1C1C]/50 block">Status</span>
                    <span className="text-[#540B0E] font-semibold">{recentOrder.status}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#1C1C1C]/50 block">Total Liabilities</span>
                    <span className="font-serif font-semibold text-[#1C1C1C]">
                      ₹{recentOrder.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-[#1C1C1C]/50">No orders placed yet.</p>
            )}
          </div>
          {recentOrder && (
            <Link
              to={`/account/orders/${recentOrder.id}`}
              className="text-[9px] uppercase tracking-widest font-semibold text-[#C5A059] hover:text-[#1C1C1C] transition-colors flex items-center gap-1 pt-2"
            >
              Track Order Details <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        {/* Default Address Widget */}
        <div className="border border-[#E5E1DA] p-5 space-y-4 text-xs font-sans flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#E5E1DA] pb-2.5">
              <MapPin className="w-4 h-4 text-[#C5A059]" strokeWidth={1.5} />
              <span className="font-semibold text-[#1C1C1C] uppercase tracking-wider">
                Default Address
              </span>
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-[#1C1C1C] block">Arjun Mehta</span>
              <p className="text-[#1C1C1C]/65 leading-relaxed line-clamp-2">
                Flat 12B, Prestige Towers, Linking Road, Bandra West, Mumbai, Maharashtra – 400050
              </p>
            </div>
          </div>
          <Link
            to="/account/addresses"
            className="text-[9px] uppercase tracking-widest font-semibold text-[#C5A059] hover:text-[#1C1C1C] transition-colors flex items-center gap-1 pt-2"
          >
            Address Book <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Wishlist Summary Widget */}
        <div className="border border-[#E5E1DA] p-5 space-y-4 text-xs font-sans flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#E5E1DA] pb-2.5">
              <Heart className="w-4 h-4 text-[#C5A059]" strokeWidth={1.5} />
              <span className="font-semibold text-[#1C1C1C] uppercase tracking-wider">
                Atelier Wishlist
              </span>
            </div>
            <p className="text-[#1C1C1C]/65 leading-relaxed">
              You have 3 luxury pieces saved in your digital registry.
            </p>
          </div>
          <Link
            to="/wishlist"
            className="text-[9px] uppercase tracking-widest font-semibold text-[#C5A059] hover:text-[#1C1C1C] transition-colors flex items-center gap-1 pt-2"
          >
            Explore Wishlist <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Security Reassurance */}
      <div className="flex items-center gap-2.5 border border-[#E5E1DA] p-4 bg-[#F5F2ED]/40 text-xs font-sans text-[#1C1C1C]/60">
        <ShieldCheck className="w-5 h-5 text-[#2A5C3A] flex-shrink-0" strokeWidth={1.5} />
        <span>
          Your account is secured with multi-factor authentication. Registered data complies with
          GDPR privacy directives.
        </span>
      </div>
    </div>
  );
}
