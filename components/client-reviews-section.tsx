"use client";

import { useMemo, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { MotionReveal } from "@/components/motion-reveal";

const REVIEWS = [
  {
    quote:
      "Yosef completely overhauled my approach to lifting. The programming is intense but incredibly structured. I hit numbers I did not think were possible in just 6 months.",
    name: "Mark K.",
  },
  {
    quote:
      "The online coaching is seamless. The feedback on my form videos is meticulous, and I feel just as accountable as if he were standing next to me in the gym.",
    name: "Sarah L.",
  },
  {
    quote:
      "No fluff, just results. If you are serious about getting stronger and moving better, Yosef is the standard. Worth every penny.",
    name: "Tom R.",
  },
  {
    quote:
      "I used to train hard with no clear direction. Yosef gave me a progression system that finally made my effort translate into measurable progress.",
    name: "Daniel A.",
  },
  {
    quote:
      "Every check-in is direct and useful. My technique, recovery, and confidence all improved because the plan was tailored to my real schedule.",
    name: "Nora H.",
  },
  {
    quote:
      "The consultation alone changed how I approach training blocks. I stopped guessing and started executing with purpose week after week.",
    name: "Omar T.",
  },
];

const REVIEWS_PER_PAGE = 3;

export function ClientReviewsSection() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(REVIEWS.length / REVIEWS_PER_PAGE);

  const visibleReviews = useMemo(() => {
    const start = page * REVIEWS_PER_PAGE;
    return REVIEWS.slice(start, start + REVIEWS_PER_PAGE);
  }, [page]);

  return (
    <section id="results" className="border-t border-white/5 bg-slate-900 py-[120px] text-white">
      <div className="mx-auto w-full max-w-[1280px] px-8">
        <MotionReveal className="mb-12 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-page-title text-[68px] leading-none uppercase tracking-tighter text-white md:text-[80px]">
              Client
              <br />
              <span className="text-accent-gold">Reviews</span>
            </h2>
            <div className="flex flex-col items-end gap-3 pb-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPage((prev) => (prev - 1 + totalPages) % totalPages)}
                  className="flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors hover:bg-white/5 hover:text-accent-gold"
                  aria-label="Previous review page"
                >
                  <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setPage((prev) => (prev + 1) % totalPages)}
                  className="flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors hover:bg-white/5 hover:text-accent-gold"
                  aria-label="Next review page"
                >
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="flex items-center gap-2" aria-label="Review pagination dots">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={`dot-${idx}`}
                    type="button"
                    onClick={() => setPage(idx)}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      idx === page ? "bg-accent-gold shadow-[0_0_12px_rgba(212,175,90,0.5)]" : "bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Go to review page ${idx + 1}`}
                    aria-current={idx === page ? "true" : "false"}
                  />
                ))}
              </div>
            </div>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {visibleReviews.map((item, idx) => (
            <MotionReveal key={`${page}-${item.name}`} delay={idx * 0.1}>
              <article className="group relative flex h-full flex-col gap-6 border border-accent-gold/15 bg-[rgba(27,42,74,0.4)] p-10 backdrop-blur-[12px]">
                <div className="flex gap-1 text-accent-gold/80">★★★★★</div>
                <p className="flex-grow text-lg font-light italic leading-relaxed text-white">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-6">
                  <p className="font-button-label text-sm uppercase tracking-widest text-accent-gold">{item.name}</p>
                </div>
                <span className="pointer-events-none absolute right-10 top-10 text-6xl text-white/5 transition-colors duration-500 group-hover:text-accent-gold/10">
                  &ldquo;
                </span>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
