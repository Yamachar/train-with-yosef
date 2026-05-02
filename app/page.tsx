import Link from "next/link";
import Image from "next/image";
import { CalendarDaysIcon, GlobeAltIcon, UserIcon } from "@heroicons/react/24/outline";
import { ClientReviewsSection } from "@/components/client-reviews-section";
import { HeroDodecahedron } from "@/components/hero-dodecahedron";
import { HeroFrameVideo } from "@/components/hero-frame-video";
import { MotionReveal } from "@/components/motion-reveal";
import { SiteFooter } from "@/components/site-footer";
import { TopNav } from "@/components/top-nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#1A1A1A] flex flex-col">
      <TopNav />

      <main className="flex-1">
        <section className="relative h-[220vh] bg-slate-950 text-white">
          <div className="sticky top-0 flex min-h-screen items-center overflow-hidden pt-20">
            <HeroFrameVideo className="absolute inset-0 z-0 h-full w-full" />
            <div className="absolute inset-0 z-0 bg-slate-950/45" />
            <div className="absolute inset-0 z-0 bg-[length:50px_50px] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
            <div className="pointer-events-none absolute left-0 top-1/2 z-0 hidden -translate-y-1/2 select-none whitespace-nowrap font-page-title text-[25vw] text-transparent opacity-50 [-webkit-text-stroke:1px_rgba(255,255,255,0.05)] lg:block">
              PERFORMANCE
            </div>

            <div className="relative z-10 mx-auto mt-12 grid w-full max-w-[1280px] items-center gap-12 px-8 lg:grid-cols-2">
            <MotionReveal className="z-20 flex flex-col items-start gap-6 text-left">
              <h1 className="font-page-title text-[84px] leading-[0.85] tracking-tight text-white uppercase md:text-[120px]">
                Train Smart.
                <br />
                Lift Heavy.
                <br />
                <span className="text-accent-gold drop-shadow-[0_0_15px_rgba(212,175,90,0.3)]">See Results.</span>
              </h1>
              <p className="max-w-xl text-lg font-light tracking-wide text-[#c5c6cf]">
                High-performance coaching tailored for those who demand excellence. Elevate your strength,
                optimize your nutrition, and forge a resilient mindset.
              </p>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/plans/1to1"
                  className="font-button-label inline-flex items-center justify-center gap-2 bg-accent-gold px-8 py-4 text-button-label uppercase tracking-widest text-black transition-all duration-300 hover:bg-accent-gold-hover hover:shadow-[0_0_20px_rgba(212,175,90,0.4)]"
                >
                  View Training Plans
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/book"
                  className="font-button-label border border-accent-gold/50 px-8 py-4 text-button-label uppercase tracking-widest text-accent-gold backdrop-blur-sm transition-colors duration-300 hover:bg-accent-gold/10"
                >
                  Book Consultation
                </Link>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.15} className="relative z-10 hidden h-[600px] w-full items-center justify-center lg:flex">
              <div className="absolute flex h-[500px] w-[500px] rotate-45 items-center justify-center rounded-full border border-accent-gold/10">
                <div className="flex h-[400px] w-[400px] rotate-45 items-center justify-center border border-accent-gold/20">
                  <div className="relative flex h-[250px] w-[250px] items-center justify-center overflow-hidden border border-accent-gold/40 bg-gradient-to-tr from-accent-gold/20 via-accent-gold/5 to-transparent shadow-[0_0_50px_rgba(212,175,90,0.15)] backdrop-blur-md">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                    <div className="relative z-10 h-[230px] w-[230px]">
                      <HeroDodecahedron className="h-full w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </MotionReveal>
            </div>
          </div>
        </section>

        <section id="plans" className="relative overflow-hidden bg-slate-900 py-[120px] text-white">
          <div className="pointer-events-none absolute right-0 top-10 z-0 hidden select-none whitespace-nowrap font-page-title text-[15vw] text-transparent opacity-30 [-webkit-text-stroke:1px_rgba(255,255,255,0.05)] lg:block">
            COACHING
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-8">
            <MotionReveal className="mb-12 border-b border-white/10 pb-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <h2 className="font-page-title text-[68px] leading-none uppercase tracking-tighter text-white md:text-[80px]">
                  Coaching
                  <br />
                  <span className="text-accent-gold">Services</span>
                </h2>
                <p className="max-w-sm pb-2 text-right text-base font-light text-[#c5c6cf]">
                  Select the tier that aligns with your ambition. No compromises.
                </p>
              </div>
            </MotionReveal>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <MotionReveal>
                <Link
                  href="/plans/1to1"
                  className="group relative flex h-full flex-col gap-3 overflow-hidden border border-accent-gold/15 bg-[rgba(27,42,74,0.4)] p-10 backdrop-blur-[12px] transition-all duration-500 hover:-translate-y-3"
                >
                  <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <UserIcon className="mb-2 h-8 w-8 text-accent-gold transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
                  <h3 className="font-page-title text-4xl uppercase tracking-tight text-white">1-to-1 Training</h3>
                  <p className="mt-1 flex-grow text-sm font-light leading-relaxed text-[#c5c6cf]">
                    Bespoke in-person coaching focused on technique, progressive overload, and immediate
                    feedback for maximum results.
                  </p>
                  <span className="font-button-label mt-6 inline-flex items-center gap-2 text-button-label uppercase tracking-widest text-accent-gold transition-all group-hover:gap-4">
                    Explore Plan <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </MotionReveal>

              <MotionReveal delay={0.1}>
                <Link
                  href="/plans/online"
                  className="group relative flex h-full flex-col gap-3 overflow-hidden border border-accent-gold/15 bg-[rgba(27,42,74,0.4)] p-10 backdrop-blur-[12px] transition-all duration-500 hover:-translate-y-3"
                >
                  <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <GlobeAltIcon className="mb-2 h-8 w-8 text-accent-gold transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
                  <h3 className="font-page-title text-4xl uppercase tracking-tight text-white">Online Training</h3>
                  <p className="mt-1 flex-grow text-sm font-light leading-relaxed text-[#c5c6cf]">
                    Comprehensive digital programming, weekly check-ins, and video form analysis to keep you
                    accountable anywhere in the world.
                  </p>
                  <span className="font-button-label mt-6 inline-flex items-center gap-2 text-button-label uppercase tracking-widest text-accent-gold transition-all group-hover:gap-4">
                    Explore Plan <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <Link
                  href="/book"
                  className="group relative flex h-full flex-col gap-3 overflow-hidden border border-accent-gold/15 bg-[rgba(27,42,74,0.4)] p-10 backdrop-blur-[12px] transition-all duration-500 hover:-translate-y-3"
                >
                  <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <CalendarDaysIcon className="mb-2 h-8 w-8 text-accent-gold transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
                  <h3 className="font-page-title text-4xl uppercase tracking-tight text-white">Consultation</h3>
                  <p className="mt-1 flex-grow text-sm font-light leading-relaxed text-[#c5c6cf]">
                    A deep dive into your goals, current metrics, and lifestyle to determine the optimal path
                    forward before committing.
                  </p>
                  <span className="font-button-label mt-6 inline-flex items-center gap-2 text-button-label uppercase tracking-widest text-accent-gold transition-all group-hover:gap-4">
                    Book Now <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </MotionReveal>
            </div>
          </div>
        </section>

        <section id="about" className="relative overflow-hidden bg-slate-950 py-[120px] text-white">
          <div className="pointer-events-none absolute bottom-0 left-0 z-0 hidden translate-y-1/4 select-none whitespace-nowrap font-page-title text-[20vw] text-transparent opacity-20 [-webkit-text-stroke:1px_rgba(255,255,255,0.05)] lg:block">
            YOSEF
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-center gap-20 px-8 lg:grid-cols-2">
            <MotionReveal>
              <div className="relative mx-auto w-fit lg:mx-0">
                <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-[#B8952A] bg-[radial-gradient(circle_at_30%_30%,#f5f0e81f,transparent_65%)] md:h-[420px] md:w-[420px]">
                  <Image
                    src="/yosef-logo.png"
                    alt="Yosef logo placeholder portrait"
                    fill
                    className="object-cover grayscale contrast-125"
                    sizes="(min-width: 768px) 420px, 320px"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 flex h-24 w-24 items-center justify-center border-4 border-slate-950 bg-accent-gold text-center font-page-title text-3xl leading-[0.82] text-black shadow-[0_0_30px_rgba(212,175,90,0.3)] md:-bottom-8 md:-right-8 md:h-28 md:w-28 md:text-4xl">
                  3+
                  <br />
                  YRS
                </div>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h2 className="font-page-title text-[88px] leading-[0.85] uppercase tracking-tighter text-white md:text-[100px]">
                Meet
                <br />
                <span className="text-accent-gold">Yosef</span>
              </h2>

              <div className="mt-8 flex flex-col gap-6 text-lg font-light leading-relaxed text-[#c5c6cf]">
                <p>
                  With over a decade of experience in strength and conditioning, I specialize in transforming
                  potential into measurable performance. I do not offer shortcuts; I offer science-backed
                  programming, unwavering accountability, and a demand for excellence.
                </p>
                <p>
                  Whether you are stepping onto a platform or building a more resilient physique, the
                  philosophy stays the same: precise execution yields undeniable results.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-12 border-t border-white/10 pt-10">
                <div>
                  <p className="font-page-title text-6xl tracking-tighter text-accent-gold">500+</p>
                  <p className="font-button-label mt-2 text-sm uppercase tracking-widest text-[#c5c6cf]">
                    Clients transformed
                  </p>
                </div>
                <div>
                  <p className="font-page-title text-6xl tracking-tighter text-accent-gold">Elite</p>
                  <p className="font-button-label mt-2 text-sm uppercase tracking-widest text-[#c5c6cf]">
                    Master trainer
                  </p>
                </div>
              </div>
            </MotionReveal>
          </div>
        </section>

        <ClientReviewsSection />

        <section className="relative overflow-hidden border-t border-white/5 bg-slate-950 py-32">
          <div className="absolute inset-0 z-0 bg-[length:50px_50px] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] opacity-50" />

          <MotionReveal className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-10 px-8 text-center">
            <h2 className="font-page-title text-[64px] leading-[0.9] uppercase tracking-tighter text-white md:text-[90px]">
              Ready to Elevate
              <br />
              <span className="text-accent-gold">Your Performance?</span>
            </h2>
            <p className="max-w-2xl text-xl font-light text-[#c5c6cf]">
              Spaces for 1-to-1 and Online Coaching are strictly limited to ensure quality. Secure your spot
              today.
            </p>
            <Link
              href="/book"
              className="mt-2 bg-accent-gold px-12 py-6 font-button-label text-lg uppercase tracking-widest text-black transition-all duration-300 hover:bg-accent-gold-hover hover:shadow-[0_0_30px_rgba(212,175,90,0.3)]"
            >
              Start Your Journey
            </Link>
          </MotionReveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
