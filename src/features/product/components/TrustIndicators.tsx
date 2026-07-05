import { ShieldCheck, BadgeCheck, Package, Star, RefreshCw } from "lucide-react";

const indicators = [
  {
    icon: ShieldCheck,
    label: "Secure Checkout",
    detail: "SSL encrypted 256-bit",
  },
  {
    icon: BadgeCheck,
    label: "Authenticity Guaranteed",
    detail: "Certified heritage handcraft",
  },
  {
    icon: Package,
    label: "Premium Packaging",
    detail: "Heritage gift box included",
  },
  {
    icon: Star,
    label: "Quality Inspected",
    detail: "Each piece inspected by master",
  },
  {
    icon: RefreshCw,
    label: "Easy Exchange",
    detail: "14-day size exchange policy",
  },
];

export default function TrustIndicators() {
  return (
    <div className="border-t border-[#E5E1DA] pt-5">
      <div className="flex flex-wrap gap-3 justify-between">
        {indicators.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2.5 min-w-[120px]">
              <div className="text-[#C5A059] flex-shrink-0">
                <Icon className="w-4 h-4" strokeWidth={1.25} />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C] block leading-tight">
                  {item.label}
                </span>
                <span className="text-[9px] font-sans text-[#1C1C1C]/50 block">{item.detail}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
