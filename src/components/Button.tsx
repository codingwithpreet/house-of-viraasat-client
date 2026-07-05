import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  isLoading = false,
  loadingText = "PROCESSING...",
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-block text-center rounded-none text-[11px] font-medium tracking-[0.3em] uppercase transition-all duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#540B0E] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#1C1C1C] text-[#FDFCFB] border border-[#1C1C1C] py-4 px-8 hover:bg-[#540B0E] hover:border-[#540B0E]",
    secondary:
      "bg-transparent text-[#1C1C1C] border border-[#E5E1DA] py-4 px-8 hover:border-[#C5A059]",
    ghost: "bg-transparent text-[#1C1C1C] hover:text-[#540B0E] py-2 tracking-[0.3em]",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-3 h-3 border border-[#FDFCFB]/30 border-t-[#FDFCFB] rounded-full animate-spin" />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
