import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast],
  );

  const typeConfig = {
    success: {
      color: "border-[#2A5C3A] bg-[#2A5C3A]/5 text-[#2A5C3A]",
      icon: CheckCircle,
    },
    error: {
      color: "border-[#991B1B] bg-[#991B1B]/5 text-[#991B1B]",
      icon: AlertTriangle,
    },
    warning: {
      color: "border-[#92400E] bg-[#92400E]/5 text-[#92400E]",
      icon: AlertTriangle,
    },
    info: {
      color: "border-[#C5A059] bg-[#C5A059]/5 text-[#C5A059]",
      icon: Info,
    },
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Portal/Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          const config = typeConfig[toast.type];
          const Icon = config.icon;

          return (
            <div
              key={toast.id}
              role="alert"
              className={`flex items-start gap-3 border p-4 bg-[#FDFCFB] shadow-lg pointer-events-auto transition-all duration-300 animate-slide-up rounded-none ${config.color}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div className="flex-1 text-xs font-sans font-medium tracking-wide text-[#1C1C1C]">
                {toast.message}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-[#1C1C1C]/40 hover:text-[#1C1C1C] transition-colors cursor-pointer"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}
