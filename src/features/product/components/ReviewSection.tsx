import { Star, PenLine } from "lucide-react";
import { reviews, ratingBreakdown, overallRating, totalReviews } from "../data/reviews.data";

interface ReviewSectionProps {
  sectionRef?: React.RefObject<HTMLDivElement | null>;
}

function StarDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${cls} ${
            s <= Math.round(rating)
              ? "fill-[#C5A059] text-[#C5A059]"
              : "fill-transparent text-[#E5E1DA]"
          }`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function ReviewSection({ sectionRef }: ReviewSectionProps) {
  return (
    <section ref={sectionRef} className="py-16 border-t border-[#E5E1DA]">
      <div className="max-w-4xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block mb-2">
              Customer Reviews
            </span>
            <h2 className="font-serif text-2xl text-[#1C1C1C] font-light">What Our Patrons Say</h2>
          </div>
          <button className="inline-flex items-center gap-2 border border-[#E5E1DA] py-3 px-5 text-[10px] uppercase tracking-widest font-medium font-sans text-[#1C1C1C] hover:border-[#C5A059] transition-all cursor-pointer self-start">
            <PenLine className="w-3.5 h-3.5 stroke-[1.5]" />
            Write a Review
          </button>
        </div>

        {/* Rating Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 p-6 bg-[#F5F2ED] border border-[#E5E1DA]">
          {/* Score */}
          <div className="flex flex-col items-center justify-center text-center border-b sm:border-b-0 sm:border-r border-[#E5E1DA] pb-6 sm:pb-0 sm:pr-6">
            <span className="font-serif text-6xl text-[#1C1C1C] font-light">{overallRating}</span>
            <StarDisplay rating={overallRating} size="lg" />
            <span className="text-xs font-sans text-[#1C1C1C]/50 mt-2">
              out of 5 · {totalReviews} reviews
            </span>
          </div>

          {/* Breakdown Bars */}
          <div className="col-span-2 space-y-2.5">
            {ratingBreakdown.map((row) => (
              <div key={row.stars} className="flex items-center gap-3">
                <span className="text-[10px] font-sans text-[#1C1C1C]/60 w-4 text-right flex-shrink-0">
                  {row.stars}★
                </span>
                <div className="flex-1 h-1.5 bg-[#E5E1DA] overflow-hidden">
                  <div
                    className="h-full bg-[#C5A059] transition-all duration-700"
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
                <span className="text-[10px] font-sans text-[#1C1C1C]/50 w-7 flex-shrink-0">
                  {row.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Review Cards */}
        <div className="space-y-8">
          {reviews.map((review) => (
            <article key={review.id} className="border-b border-[#E5E1DA] pb-8">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-sans text-sm font-semibold text-[#1C1C1C]">
                      {review.author}
                    </span>
                    {review.verified && (
                      <span className="text-[9px] uppercase tracking-wider text-[#2A5C3A] bg-[#2A5C3A]/8 border border-[#2A5C3A]/20 px-2 py-0.5 font-medium font-sans">
                        Verified Purchase
                      </span>
                    )}
                    {review.occasion && (
                      <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-medium font-sans">
                        · {review.occasion}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-sans text-[#1C1C1C]/40 mt-0.5 block">
                    {review.location} · {review.date}
                  </span>
                </div>
                <StarDisplay rating={review.rating} />
              </div>

              <h4 className="font-sans text-sm font-semibold text-[#1C1C1C] mb-2">
                {review.title}
              </h4>
              <p className="font-sans text-sm text-[#1C1C1C]/65 leading-relaxed">{review.body}</p>
            </article>
          ))}
        </div>

        {/* Load More placeholder */}
        <div className="mt-8 text-center">
          <button className="border border-[#E5E1DA] py-4 px-10 text-[10px] uppercase tracking-widest font-medium font-sans text-[#1C1C1C] hover:border-[#C5A059] transition-all cursor-pointer">
            Load More Reviews ({totalReviews - reviews.length} remaining)
          </button>
        </div>
      </div>
    </section>
  );
}
