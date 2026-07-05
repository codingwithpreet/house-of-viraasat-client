import React, { useState } from "react";
import { useToast } from "../../../providers/ToastProvider";

const inputCls =
  "w-full border border-[#E5E1DA] px-4 py-3 text-xs font-sans text-[#1C1C1C] focus:outline-none focus:border-[#C5A059] bg-transparent rounded-none transition-colors";
const labelCls =
  "block text-[9px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]/60 mb-1.5";

export default function SettingsSection() {
  const { showToast } = useToast();
  const [lang, setLang] = useState("en-IN");
  const [currency, setCurrency] = useState("INR");
  const [comms, setComms] = useState({
    newsletter: true,
    orders: true,
    marketing: false,
    offers: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Preferences and communications settings updated.", "success");
  };

  return (
    <div className="space-y-8 text-left animate-fade-in">
      {/* Editorial Header */}
      <div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block mb-1">
          Preferences Workspace
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1C1C] font-light tracking-wide">
          Account Settings
        </h1>
        <p className="font-sans text-xs text-[#1C1C1C]/50 mt-1">
          Configure preferred language parameters and tailor communication subscription settings.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Personalization Section */}
        <div className="space-y-4">
          <h3 className="font-serif text-base text-[#1C1C1C] border-b border-[#E5E1DA] pb-2">
            Localizations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls} htmlFor="language">
                Preferred Language
              </label>
              <select
                id="language"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className={inputCls}
              >
                <option value="en-IN">English (Indian)</option>
                <option value="hi">Hindi (हिन्दी)</option>
                <option value="pb">Punjabi (ਪੰਜਾਬੀ)</option>
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="currency">
                Preferred Currency
              </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={inputCls}
              >
                <option value="INR">INR (₹) Indian Rupee</option>
                <option value="USD">USD ($) US Dollar</option>
                <option value="GBP">GBP (£) British Pound</option>
              </select>
            </div>
          </div>
        </div>

        {/* Communication preferences */}
        <div className="space-y-4">
          <h3 className="font-serif text-base text-[#1C1C1C] border-b border-[#E5E1DA] pb-2">
            Communication Permissions
          </h3>

          <div className="space-y-3">
            {[
              {
                id: "orders",
                label: "Order Tracking Alerts",
                desc: "Receive real-time transactional SMS/Email notifications on order status revisions.",
              },
              {
                id: "newsletter",
                label: "Atelier Newsletters",
                desc: "Receive seasonal lookbooks, heritage histories, and behind-the-scenes craft stories.",
              },
              {
                id: "offers",
                label: "Private Client Invitations",
                desc: "Accredited early-access pass notifications to limited-run collections and private trunk shows.",
              },
              {
                id: "marketing",
                label: "Third-Party Customizations",
                desc: "Allow partner cookies to optimize browsing recommendations (no private contact information shared).",
              },
            ].map((pref) => (
              <label
                key={pref.id}
                className="flex items-start gap-4 p-4 border border-[#E5E1DA] hover:border-[#C5A059] transition-all bg-[#F5F2ED]/10 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={comms[pref.id as keyof typeof comms]}
                  onChange={(e) => setComms({ ...comms, [pref.id]: e.target.checked })}
                  className="w-4 h-4 mt-0.5 border-[#E5E1DA] text-[#1C1C1C] focus:ring-[#C5A059] rounded-none cursor-pointer"
                />
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C] block">
                    {pref.label}
                  </span>
                  <span className="text-[10px] font-sans text-[#1C1C1C]/50 leading-relaxed block mt-0.5">
                    {pref.desc}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#1C1C1C] text-[#FDFCFB] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#540B0E] transition-all duration-300 cursor-pointer"
        >
          Update Settings
        </button>
      </form>
    </div>
  );
}
