import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", type = "text", id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-[#1C1C1C]/60"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={`bg-transparent border ${
            error ? "border-[#991B1B]" : "border-[#E5E1DA]"
          } rounded-none py-3 px-4 text-xs font-sans placeholder-[#1C1C1C]/40 text-[#1C1C1C] focus:border-[#C5A059] focus:outline-none transition-colors w-full ${className}`}
          {...props}
        />
        {error && (
          <span className="block text-[10px] text-[#991B1B] tracking-wide font-sans mt-1">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
