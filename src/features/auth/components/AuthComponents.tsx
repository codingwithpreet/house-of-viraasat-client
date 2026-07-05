import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Check, X } from "lucide-react";
import Input from "../../../components/Input";

// --- AUTH LAYOUT (Centering + Desktop Editorial Image) ---
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#FDFCFB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 border border-[#E5E1DA] bg-[#FDFCFB]">
        {/* Left/Right Column: Image Side (Hidden on Mobile) */}
        <div className="hidden lg:block lg:col-span-5 relative bg-[#1C1C1C] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-1" />
          <img
            src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800"
            alt="Atelier Tailoring Heritage"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute bottom-8 left-8 right-8 z-10 space-y-2">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans">
              HOUSE OF VIRAASAT
            </span>
            <h3 className="font-serif text-lg text-[#FDFCFB] font-light leading-relaxed">
              Preserving the legacy of imperial tailoring.
            </h3>
          </div>
        </div>

        {/* Right/Left Column: Auth Card (Always visible) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center py-10 px-6 sm:px-12 lg:px-16">
          {children}
        </div>
      </div>
    </div>
  );
}

// --- AUTH CARD ---
export function AuthCard({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-md mx-auto space-y-8">{children}</div>;
}

// --- AUTH HEADER ---
interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="text-center space-y-3">
      <div className="flex flex-col items-center">
        <Link
          to="/"
          className="font-serif text-lg tracking-[0.25em] font-light uppercase text-[#1C1C1C]"
        >
          HOUSE OF VIRAASAT
        </Link>
        <span className="font-sans text-[7px] tracking-[0.35em] uppercase opacity-50 mt-0.5">
          Heritage . Tailoring . Luxury
        </span>
      </div>
      <h2 className="font-serif text-2xl text-[#1C1C1C] font-normal tracking-wide mt-4">{title}</h2>
      {subtitle && (
        <p className="font-sans text-xs text-[#1C1C1C]/65 max-w-sm mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// --- PASSWORD INPUT WITH TOGGLE ---
interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function PasswordInput({ label, error, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        label={label}
        error={error}
        type={showPassword ? "text" : "password"}
        className="pr-10"
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 bottom-3 p-1 text-[#1C1C1C]/40 hover:text-[#1C1C1C] transition-colors cursor-pointer"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4 stroke-[1.25]" />
        ) : (
          <Eye className="w-4 h-4 stroke-[1.25]" />
        )}
      </button>
    </div>
  );
}

// --- PASSWORD STRENGTH CHECKLIST ---
export function PasswordStrength({ value = "" }: { value?: string }) {
  const rules = [
    { label: "At least 8 characters", valid: value.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(value) },
    { label: "One lowercase letter", valid: /[a-z]/.test(value) },
    { label: "One numerical digit", valid: /[0-9]/.test(value) },
    { label: "One special character", valid: /[^A-Za-z0-9]/.test(value) },
  ];

  return (
    <div className="bg-[#F5F2ED] p-4 border border-[#E5E1DA]/50 space-y-2 mt-2">
      <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-medium font-sans block mb-1">
        Sartorial Security Checklist
      </span>
      <ul className="space-y-1.5">
        {rules.map((rule, idx) => (
          <li key={idx} className="flex items-center gap-2 text-[10px] font-sans">
            {rule.valid ? (
              <Check className="w-3.5 h-3.5 text-[#2A5C3A]" />
            ) : (
              <X className="w-3.5 h-3.5 text-[#991B1B]" />
            )}
            <span className={rule.valid ? "text-[#2A5C3A] font-medium" : "text-[#1C1C1C]/50"}>
              {rule.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- AUTH DIVIDER ---
export function AuthDivider() {
  return (
    <div className="relative flex items-center justify-center my-6">
      <div className="absolute inset-x-0 h-px bg-[#E5E1DA]" />
      <span className="relative px-3 bg-[#FDFCFB] text-[9px] uppercase tracking-widest text-[#1C1C1C]/45 font-sans">
        OR ATELIER OPTIONS
      </span>
    </div>
  );
}
