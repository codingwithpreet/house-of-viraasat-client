import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap gap-2 text-[10px] tracking-[0.15em] uppercase font-sans text-[#1C1C1C]/50">
        <li>
          <Link to="/" className="hover:text-[#C5A059] transition-colors">
            Atelier
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-[11px] h-[11px] stroke-[1.5] text-[#1C1C1C]/30" />
              <li>
                {isLast || !item.path ? (
                  <span className="text-[#1C1C1C] font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.path} className="hover:text-[#C5A059] transition-colors">
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
