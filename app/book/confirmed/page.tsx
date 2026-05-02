import { Suspense } from "react";
import Link from "next/link";
import { BookingSlotSummary } from "@/components/booking-slot-summary";
import { MotionReveal } from "@/components/motion-reveal";
import { SiteFooter } from "@/components/site-footer";
import { TopNav } from "@/components/top-nav";

export default function BookingConfirmedPage() {
  return (
    <div className="min-h-screen bg-[#111c33] text-[#F5F0E8] flex flex-col">
      <TopNav />

      <main className="section-shell flex-1 py-16">
        <MotionReveal>
          <div className="rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-5">
            <p className="heading-font text-3xl text-[#D4AF5A]">Payment Verified</p>
            <p className="mt-2 text-sm text-[#d7dfeb]">
              Your payment went through successfully. Your booking request has been received.
            </p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.1} className="mt-8">
          <div className="cal-frame rounded-xl bg-[#132543] p-6 md:p-8">
            <h2 className="heading-font text-5xl text-white">Booking Request Confirmed</h2>
            <p className="mt-3 text-sm text-[#d7dfeb]">
              We will review your selected date and time, then send your final session confirmation by email.
            </p>
            <Suspense fallback={<div className="mt-4 h-24 animate-pulse rounded-lg bg-white/5" />}>
              <BookingSlotSummary />
            </Suspense>
            <p className="mt-2 text-sm text-[#d7dfeb]">
              If your preferred slot is not available, we will contact you with the closest alternatives.
            </p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.2} className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/book" className="gold-button inline-flex rounded-md px-6 py-3 text-sm">
              Book Another Session
            </Link>
            <Link href="/" className="outline-gold-button inline-flex rounded-md px-6 py-3 text-sm">
              Return Home
            </Link>
          </div>
        </MotionReveal>
      </main>

      <SiteFooter />
    </div>
  );
}
