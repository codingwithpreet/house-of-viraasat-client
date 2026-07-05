import { Link, useRouteError } from "react-router-dom";
import { ArrowLeft, RefreshCw, AlertTriangle, HelpCircle } from "lucide-react";

// --- SKELETON LOADER ---
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#E5E1DA] animate-pulse rounded-none ${className}`} aria-hidden="true" />
  );
}

// --- LOADING INDICATOR ---
export function Loader({
  size = "md",
  text = "LOADING...",
}: {
  size?: "sm" | "md" | "lg";
  text?: string;
}) {
  const sizeClasses = {
    sm: "w-4 h-4 border-t-2",
    md: "w-6 h-6 border-t-2",
    lg: "w-8 h-8 border-t-2",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div
        className={`${sizeClasses[size]} border-[#1C1C1C] border-r-transparent rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium font-sans">
          {text}
        </span>
      )}
    </div>
  );
}

// --- EMPTY STATE ---
interface EmptyStateProps {
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  actionLink?: string;
}

export function EmptyState({
  title,
  description,
  actionText,
  onAction,
  actionLink,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-md mx-auto">
      <HelpCircle className="w-12 h-12 text-[#1C1C1C]/30 stroke-[1] mb-6" />
      <h3 className="font-serif text-xl text-[#1C1C1C] mb-2">{title}</h3>
      {description && (
        <p className="font-sans text-xs text-[#1C1C1C]/60 leading-relaxed mb-8">{description}</p>
      )}
      {actionText && (
        <>
          {actionLink ? (
            <Link
              to={actionLink}
              className="inline-block border border-[#E5E1DA] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase hover:border-[#C5A059] transition-all duration-300 rounded-none"
            >
              {actionText}
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="border border-[#E5E1DA] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase hover:border-[#C5A059] transition-all duration-300 rounded-none cursor-pointer"
            >
              {actionText}
            </button>
          )}
        </>
      )}
    </div>
  );
}

// --- ERROR PAGE / 404 ---
export function ErrorPage({ isNotFound = false }: { isNotFound?: boolean }) {
  const error = useRouteError() as unknown;
  console.error(error);

  const title = isNotFound ? "404 - ATELIER ARCHIVE NOT FOUND" : "SARTORIAL SYSTEM INTERRUPTION";
  const message = isNotFound
    ? "The page or collection you are looking for has been moved or does not exist in our legacy archive."
    : "An unexpected tailoring environment error occurred. Rest assured, our digital weavers have been notified.";

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-16 bg-[#FDFCFB]">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center">
          <div className="border border-[#C5A059]/40 p-4 rounded-full">
            <AlertTriangle className="w-12 h-12 text-[#540B0E] stroke-[1]" />
          </div>
        </div>

        <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium font-sans">
          HOUSE OF VIRAASAT
        </span>

        <h1 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] font-normal leading-tight tracking-wide">
          {title}
        </h1>

        <p className="font-sans text-xs md:text-sm text-[#1C1C1C]/70 leading-relaxed">{message}</p>

        <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 border border-[#E5E1DA] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase hover:border-[#C5A059] transition-all duration-300 rounded-none bg-[#1C1C1C] text-[#FDFCFB]"
          >
            <ArrowLeft className="w-[13px] h-[13px] stroke-[1.5]" />
            Return to Atelier
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 border border-[#E5E1DA] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase hover:border-[#C5A059] transition-all duration-300 rounded-none text-[#1C1C1C] cursor-pointer"
          >
            <RefreshCw className="w-[13px] h-[13px] stroke-[1.5]" />
            Retry Connection
          </button>
        </div>
      </div>
    </div>
  );
}
