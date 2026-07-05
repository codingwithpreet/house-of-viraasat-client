import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export default function Badge({ children, variant = "outline", className = "" }: BadgeProps) {
  const baseStyle =
    "inline-block text-[8px] tracking-[0.2em] uppercase py-1 px-2.5 font-sans font-medium rounded-none";

  const variants = {
    primary: "bg-[#540B0E] text-[#FDFCFB]",
    secondary: "bg-[#1C1C1C] text-[#FDFCFB]",
    outline: "bg-transparent text-[#C5A059] border border-[#C5A059]/30",
  };

  return <span className={`${baseStyle} ${variants[variant]} ${className}`}>{children}</span>;
}
