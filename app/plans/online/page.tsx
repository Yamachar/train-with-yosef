import { MotionReveal } from "@/components/motion-reveal";
import { SiteFooter } from "@/components/site-footer";
import { StepperRecommender } from "@/components/stepper-recommender";
import { TopNav } from "@/components/top-nav";

export default function OnlinePlansPage() {
  return (
    <div className="min-h-screen bg-[#0f192f] text-[#F5F0E8] flex flex-col">
      <TopNav />

      <main className="flex-1">
        <section className="relative flex min-h-[38vh] items-center justify-center overflow-hidden text-center">
          <div className="absolute inset-0 z-0 bg-[url('/1-to-1-background.png')] bg-contain bg-center bg-no-repeat brightness-110 saturate-110" />
          <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(8,10,16,0.62)_0%,rgba(10,12,19,0.72)_100%)]" />
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_22%_12%,rgba(184,149,42,0.16),transparent_42%),radial-gradient(circle_at_82%_20%,rgba(68,92,150,0.2),transparent_46%)]" />
          <div className="page-pattern absolute inset-0 z-0 opacity-20" />
          <MotionReveal className="section-shell relative z-10 py-20">
            <h1 className="heading-font text-6xl text-white md:text-8xl">Online Training Plans</h1>
            <p className="mx-auto mt-3 max-w-2xl text-[#d7dfeb]">
              Answer five quick steps and get your most suitable program recommendation.
            </p>
          </MotionReveal>
        </section>

        <section className="bg-[radial-gradient(circle_at_top,#1b2a4a,#101b33_50%,#0c1528_100%)] py-20">
          <MotionReveal className="section-shell">
            <StepperRecommender />
          </MotionReveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
