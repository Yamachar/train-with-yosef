import { BookSessionCheckoutForm } from "@/components/book-session-checkout-form";
import { MotionReveal } from "@/components/motion-reveal";
import { SiteFooter } from "@/components/site-footer";
import { TopNav } from "@/components/top-nav";
import { bookSession, hasStripePrice } from "@/lib/site";

export default function BookPage() {
  const enabled = hasStripePrice(bookSession.stripePriceId);

  return (
    <div className="min-h-screen bg-[#131f39] text-[#F5F0E8] flex flex-col">
      <TopNav />

      <main className="flex-1">
        <section className="section-shell py-20 text-center">
          <MotionReveal>
            <h1 className="heading-font text-6xl text-white md:text-8xl">Book Consultation</h1>
            <p className="mx-auto mt-3 max-w-2xl text-[#d7dfeb]">
              One focused consultation to audit your current approach and map your next block.
            </p>
          </MotionReveal>
        </section>

        <section className="section-shell grid gap-6 md:grid-cols-3">
          {[
            { title: "Video Call", note: "60-minute high-focus session with Yosef." },
            { title: "Personalized Advice", note: "Specific recommendations for your body and goals." },
            { title: "Action Plan", note: "Clear tactical steps you can execute immediately." },
          ].map((item, idx) => (
            <MotionReveal key={item.title} delay={idx * 0.08}>
              <article className="feature-card rounded-xl bg-[#F5F0E8] p-7 text-[#1A1A1A]">
                <h2 className="heading-font text-4xl text-[#1B2A4A]">{item.title}</h2>
                <p className="mt-2 text-sm text-[#3e4860]">{item.note}</p>
              </article>
            </MotionReveal>
          ))}
        </section>

        <section className="section-shell py-16 text-center">
          <MotionReveal>
            <p className="text-sm uppercase tracking-[0.14em] text-[#D4AF5A]">Session Price</p>
            <p className="heading-font mt-1 text-7xl text-[#D4AF5A] md:text-8xl">{bookSession.displayPrice || "TBD"}</p>
          </MotionReveal>
        </section>

        <section className="section-shell pb-12">
          <MotionReveal>
            <h2 className="heading-font text-5xl text-white">How It Works</h2>
            <ol className="mt-4 space-y-3 text-[#d7dfeb]">
              <li>1. Pick your preferred date and time slot below.</li>
              <li>2. Confirm and continue to secure checkout payment.</li>
              <li>3. Get your payment confirmation and session follow-up details.</li>
            </ol>
          </MotionReveal>
        </section>

        <section className="section-shell pb-24">
          <MotionReveal className="rounded-xl border border-[#D4AF5A]/30 bg-[#10203b] p-6 md:p-8">
            <h2 className="heading-font text-5xl text-white">Choose Your Session Slot</h2>
            <p className="mt-2 text-sm text-[#c9d3e3]">Select your date first, then proceed directly to payment checkout.</p>
            <div className="mt-6">
              <BookSessionCheckoutForm stripePriceId={bookSession.stripePriceId} enabled={enabled} />
            </div>
          </MotionReveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
