import React, { useState } from "react";
import { ShieldAlert, Check } from "lucide-react";
import { useToast } from "../../../providers/ToastProvider";

const inputCls =
  "w-full border border-[#E5E1DA] px-4 py-3 text-xs font-sans text-[#1C1C1C] placeholder-[#1C1C1C]/35 focus:outline-none focus:border-[#C5A059] bg-transparent rounded-none transition-colors";
const labelCls =
  "block text-[9px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]/60 mb-1.5";

export default function SecuritySection() {
  const { showToast } = useToast();
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simple strength validation checks
  const checks = {
    length: password.length >= 8,
    number: /\D*\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<-]/.test(password),
  };

  const strengthPercentage =
    (Object.values(checks).filter(Boolean).length / Object.keys(checks).length) * 100;

  const getStrengthLabel = () => {
    if (password.length === 0) return { label: "", color: "" };
    if (strengthPercentage <= 33) return { label: "Weak Sentry", color: "text-[#991B1B]" };
    if (strengthPercentage <= 66) return { label: "Moderate Sentry", color: "text-[#92400E]" };
    return { label: "Sovereign Sentry", color: "text-[#2A5C3A]" };
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!current || !password || !confirm) {
      showToast("Please complete all requested password parameters.", "error");
      return;
    }
    if (password !== confirm) {
      showToast("Confirmation password parameter does not match.", "error");
      return;
    }
    if (strengthPercentage < 100) {
      showToast(
        "Your new password does not meet the necessary sentinel strength guidelines.",
        "error",
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrent("");
      setPassword("");
      setConfirm("");
      showToast("Password updated successfully.", "success");
    }, 1000);
  };

  const strength = getStrengthLabel();

  return (
    <div className="space-y-8 text-left animate-fade-in">
      {/* Editorial Header */}
      <div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block mb-1">
          Atelier Sentinel
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1C1C] font-light tracking-wide">
          Security Credentials
        </h1>
        <p className="font-sans text-xs text-[#1C1C1C]/50 mt-1">
          Maintain active login password credentials to prevent unauthorized account access loops.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-md">
        {/* Current Password */}
        <div>
          <label className={labelCls} htmlFor="currentPassword">
            Current Password *
          </label>
          <input
            id="currentPassword"
            required
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="••••••••"
            className={inputCls}
          />
        </div>

        {/* New Password */}
        <div>
          <label className={labelCls} htmlFor="newPassword">
            New Password *
          </label>
          <input
            id="newPassword"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={inputCls}
          />
        </div>

        {/* Strength indicators */}
        {password.length > 0 && (
          <div className="space-y-3 p-4 border border-[#E5E1DA] bg-[#F5F2ED]/20 text-[10px] font-sans">
            <div className="flex justify-between font-semibold">
              <span className="text-[#1C1C1C]/50">Password Strength:</span>
              <span className={strength.color}>{strength.label}</span>
            </div>

            <div className="h-1 bg-[#E5E1DA] overflow-hidden">
              <div
                className={`h-full transition-all ${
                  strengthPercentage <= 33
                    ? "bg-[#991B1B]"
                    : strengthPercentage <= 66
                      ? "bg-[#92400E]"
                      : "bg-[#2A5C3A]"
                }`}
                style={{ width: `${strengthPercentage}%` }}
              />
            </div>

            <div className="space-y-1.5 text-[#1C1C1C]/60 pt-1">
              {[
                { checked: checks.length, label: "Minimum 8 characters length" },
                { checked: checks.number, label: "Contains at least 1 digit" },
                { checked: checks.special, label: "Contains 1 special character symbol (!@#$)" },
              ].map((c, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${c.checked ? "bg-[#2A5C3A] border-[#2A5C3A] text-white" : "border-[#E5E1DA]"}`}
                  >
                    {c.checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirm New Password */}
        <div>
          <label className={labelCls} htmlFor="confirmPassword">
            Confirm New Password *
          </label>
          <input
            id="confirmPassword"
            required
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            className={inputCls}
          />
        </div>

        {/* Alert box */}
        <div className="flex items-center gap-2.5 border border-[#E5E1DA] p-4 bg-[#F5F2ED]/40 text-xs font-sans text-[#1C1C1C]/65">
          <ShieldAlert className="w-5 h-5 text-[#991B1B] flex-shrink-0" strokeWidth={1.5} />
          <span>
            Updating password credentials immediately terminates all other active catalog session
            logins.
          </span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#1C1C1C] text-[#FDFCFB] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#540B0E] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? "UPDATING..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
