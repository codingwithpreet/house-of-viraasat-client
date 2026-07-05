import React, { useState } from "react";
import { Camera, ShieldCheck } from "lucide-react";
import { useToast } from "../../../providers/ToastProvider";
import type { CustomerProfile } from "../data/account.data";

interface ProfileSectionProps {
  profile: CustomerProfile;
  onUpdate: (updated: Partial<CustomerProfile>) => void;
}

const inputCls =
  "w-full border border-[#E5E1DA] px-4 py-3 text-xs font-sans text-[#1C1C1C] placeholder-[#1C1C1C]/35 focus:outline-none focus:border-[#C5A059] bg-transparent rounded-none transition-colors";
const labelCls =
  "block text-[9px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]/60 mb-1.5";

export default function ProfileSection({ profile, onUpdate }: ProfileSectionProps) {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    dob: "1994-08-15",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim()) {
      showToast("Please fill in all mandatory fields.", "error");
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      onUpdate(form);
      setIsLoading(false);
      showToast("Profile details updated successfully.", "success");
    }, 800);
  };

  return (
    <div className="space-y-8 text-left animate-fade-in">
      {/* Editorial Header */}
      <div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block mb-1">
          Identity Workspace
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1C1C] font-light tracking-wide">
          My Profile
        </h1>
        <p className="font-sans text-xs text-[#1C1C1C]/50 mt-1">
          Keep your registry contact parameters current to receive tailoring order alerts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Uploader Section */}
        <div className="flex items-center gap-6 pb-4 border-b border-[#E5E1DA]">
          <div className="relative group w-20 h-20 rounded-full overflow-hidden border border-[#E5E1DA] bg-[#F5F2ED] flex items-center justify-center">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-serif text-2xl text-[#1C1C1C]/40">
                {profile.fullName.charAt(0)}
              </span>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              title="Upload profile photo"
              aria-label="Upload profile photo"
            />
          </div>
          <div>
            <h4 className="font-serif text-sm text-[#1C1C1C]">{profile.fullName}</h4>
            <p className="text-[10px] font-sans text-[#1C1C1C]/50 mt-0.5">
              PNG or JPG. Max file size: 2MB.
            </p>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="fullName">
              Full Name *
            </label>
            <input
              id="fullName"
              required
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="phone">
              Phone Number *
            </label>
            <input
              id="phone"
              required
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputCls}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="email">
              Email Address (Locked)
            </label>
            <input
              id="email"
              disabled
              type="email"
              value={form.email}
              className={`${inputCls} opacity-50 bg-[#F5F2ED] cursor-not-allowed`}
            />
            <span className="text-[9px] font-sans text-[#1C1C1C]/40 block mt-1">
              Contact atelier support to update your registered email identity.
            </span>
          </div>
          <div>
            <label className={labelCls} htmlFor="dob">
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
              className={inputCls}
            />
          </div>
        </div>

        {/* Security Alert */}
        <div className="flex items-center gap-2.5 border border-[#E5E1DA] p-4 bg-[#F5F2ED]/40 text-xs font-sans text-[#1C1C1C]/65">
          <ShieldCheck className="w-5 h-5 text-[#2A5C3A] flex-shrink-0" strokeWidth={1.5} />
          <span>
            Verifying revisions secures your membership profile against identity loop fraud.
          </span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#1C1C1C] text-[#FDFCFB] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#540B0E] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? "SAVING..." : "Save Details"}
        </button>
      </form>
    </div>
  );
}
