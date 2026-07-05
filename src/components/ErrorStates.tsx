import { AlertOctagon, ShieldAlert, Settings, WifiOff } from "lucide-react";
import Button from "./Button";

// ─── RETRY BUTTON ────────────────────────────────────────────────────────────
export function RetryButton({
  onClick,
  label = "RETRY OPERATION",
}: {
  onClick?: () => void;
  label?: string;
}) {
  return (
    <Button variant="secondary" onClick={onClick} className="px-6 py-2.5">
      {label}
    </Button>
  );
}

// ─── ERROR CARD ──────────────────────────────────────────────────────────────
interface ErrorCardProps {
  title: string;
  description: string;
  onRetry?: () => void;
}

export function ErrorCard({ title, description, onRetry }: ErrorCardProps) {
  return (
    <div className="border border-[#991B1B]/35 bg-[#991B1B]/5 p-6 text-left space-y-4">
      <div className="flex gap-3">
        <AlertOctagon className="w-5 h-5 text-[#991B1B] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
        <div>
          <h3 className="font-serif text-sm font-semibold text-[#1C1C1C] uppercase tracking-wider">
            {title}
          </h3>
          <p className="font-sans text-xs text-[#1C1C1C]/65 leading-relaxed mt-1">{description}</p>
        </div>
      </div>
      {onRetry && (
        <div className="flex justify-end pt-2">
          <RetryButton onClick={onRetry} />
        </div>
      )}
    </div>
  );
}

// ─── NETWORK ERROR PANEL ──────────────────────────────────────────────────────
export function NetworkErrorPanel({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 max-w-md mx-auto space-y-5">
      <div className="border border-[#E5E1DA] p-4 rounded-full bg-[#F5F2ED]">
        <WifiOff className="w-8 h-8 text-[#1C1C1C]/40 stroke-[1.25]" />
      </div>
      <div>
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans">
          Connection Interrupted
        </span>
        <h2 className="font-serif text-xl text-[#1C1C1C] font-light mt-1">Network offline</h2>
        <p className="font-sans text-xs text-[#1C1C1C]/55 leading-relaxed mt-2">
          It appears you are currently offline. Please check your network connection parameters and
          retry.
        </p>
      </div>
      {onRetry && <RetryButton onClick={onRetry} label="RETRY CONNECTION" />}
    </div>
  );
}

// ─── SERVER ERROR PANEL (500) ─────────────────────────────────────────────────
export function ServerErrorPanel({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 max-w-md mx-auto space-y-5">
      <div className="border border-[#E5E1DA] p-4 rounded-full bg-[#F5F2ED]">
        <AlertOctagon className="w-8 h-8 text-[#991B1B] stroke-[1.25]" />
      </div>
      <div>
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans">
          Error Code 500
        </span>
        <h2 className="font-serif text-xl text-[#1C1C1C] font-light mt-1">
          Sartorial Server Interruption
        </h2>
        <p className="font-sans text-xs text-[#1C1C1C]/55 leading-relaxed mt-2">
          Our digital looms encountered an internal calculation loop. Rest assured, our systems
          engineers have been paged.
        </p>
      </div>
      {onRetry && <RetryButton onClick={onRetry} label="RETRY HANDSHAKE" />}
    </div>
  );
}

// ─── ACCESS DENIED PANEL (403/401) ────────────────────────────────────────────
export function AccessDeniedPanel() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 max-w-md mx-auto space-y-5">
      <div className="border border-[#540B0E]/20 p-4 rounded-full bg-[#540B0E]/5">
        <ShieldAlert className="w-8 h-8 text-[#540B0E] stroke-[1.25]" />
      </div>
      <div>
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans">
          Atelier Security
        </span>
        <h2 className="font-serif text-xl text-[#1C1C1C] font-light mt-1">Restricted Access</h2>
        <p className="font-sans text-xs text-[#1C1C1C]/55 leading-relaxed mt-2">
          Your credentials do not grant access to this secure atelier catalog section. Please log in
          with a credentialed account.
        </p>
      </div>
    </div>
  );
}

// ─── MAINTENANCE PANEL ────────────────────────────────────────────────────────
export function MaintenancePanel() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 max-w-md mx-auto space-y-5">
      <div className="border border-[#E5E1DA] p-4 rounded-full bg-[#F5F2ED]">
        <Settings className="w-8 h-8 text-[#C5A059] stroke-[1.25]" />
      </div>
      <div>
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans">
          Scheduled Downtime
        </span>
        <h2 className="font-serif text-xl text-[#1C1C1C] font-light mt-1">Atelier Enhancements</h2>
        <p className="font-sans text-xs text-[#1C1C1C]/55 leading-relaxed mt-2">
          We are currently refreshing our sartorial display systems to showcase the latest couture
          lines. Please return shortly.
        </p>
      </div>
    </div>
  );
}
