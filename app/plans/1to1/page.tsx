import { CheckoutForm } from "@/components/checkout-form";
import { CalendarDaysIcon, CheckCircleIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { MotionReveal } from "@/components/motion-reveal";
import { SiteFooter } from "@/components/site-footer";
import { TopNav } from "@/components/top-nav";
import { hasStripePrice, oneToOnePlans } from "@/lib/site";

export default function OneToOnePlansPage() {
  const stripeByPlan = Object.fromEntries(oneToOnePlans.map((plan) => [plan.key, plan.stripePriceId]));
  const plans = [
    {
      key: "plan-1to1-starter" as const,
      name: "Standard",
      tagline: "Build foundational strength and technique.",
      cadence: "Monthly / 4 Sessions",
      features: [
        "4 training sessions per month",
        "Personalized fitness plan",
        "Nutrition guidance",
        "Monthly review",
      ],
      displayPrice: "€160 / month",
    },
    {
      key: "plan-1to1-transformation" as const,
      name: "Gold",
      tagline: "Comprehensive coaching for body and performance progress.",
      cadence: "Monthly / 8 Sessions",
      features: [
        "8 training sessions per month",
        "Custom training plan",
        "Bi-weekly progress tracking",
        "Nutrition guidance",
      ],
      displayPrice: "€300 / month",
      isPopular: true,
    },
    {
      key: "plan-1to1-elite" as const,
      name: "Elite",
      tagline: "Peak performance prep and sustained mastery.",
      cadence: "Monthly / 12 Sessions",
      features: [
        "12 training sessions per month",
        "Custom training plan",
        "Nutrition guidance",
        "Weekly progress tracking",
      ],
      displayPrice: "€400 / month",
    },
  ];

  return (
    <div className="min-h-screen bg-[#111c33] text-[#F5F0E8] flex flex-col">
      <TopNav />

      <main className="flex-1">
        <section className="relative flex min-h-[38vh] items-center justify-center overflow-hidden text-center">
          <div className="absolute inset-0 z-0 bg-[url('/1-to-1-background.png')] bg-contain bg-center bg-no-repeat brightness-110 saturate-110" />
          <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(8,10,16,0.62)_0%,rgba(10,12,19,0.72)_100%)]" />
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_22%_12%,rgba(184,149,42,0.16),transparent_42%),radial-gradient(circle_at_82%_20%,rgba(68,92,150,0.2),transparent_46%)]" />
          <div className="page-pattern absolute inset-0 z-0 opacity-20" />
          <div className="relative z-10 section-shell py-20">
            <h1 className="heading-font text-6xl text-white md:text-8xl">1-to-1 Training Plans</h1>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#111113] pb-[120px] pt-12">
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:24px_24px] opacity-35" />
          <div className="section-shell relative z-10">
            <div className="mx-auto mb-10 max-w-[800px] px-4">
              <div className="flex items-center justify-center gap-3 rounded-sm border border-accent-gold/50 bg-[#151518]/80 px-6 py-4 text-center shadow-[0_0_20px_rgba(184,149,42,0.1)] backdrop-blur-md">
                <LockClosedIcon className="h-6 w-6 text-accent-gold drop-shadow-[0_0_5px_rgba(184,149,42,0.5)]" aria-hidden="true" />
                <p className="font-body-main text-base font-bold tracking-wide text-accent-gold">
                  Plan content is delivered privately after purchase
                </p>
              </div>
            </div>

            <div className="grid items-stretch gap-6 md:grid-cols-3 md:gap-8">
              {plans.map((plan, index) => {
                const stripePriceId = stripeByPlan[plan.key];
                const enabled = hasStripePrice(stripePriceId);
                return (
                  <MotionReveal key={plan.key} delay={index * 0.08}>
                    <article
                      className={`relative flex h-full flex-col rounded-sm border p-8 transition-all duration-300 hover:-translate-y-1 ${
                        plan.isPopular
                          ? "z-10 border-accent-gold bg-[#1f2f52]/85 shadow-[0_0_30px_rgba(184,149,42,0.15)] md:scale-[1.03]"
                          : "border-[#343437] bg-[#151518]/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-accent-gold/30"
                      }`}
                    >
                      {plan.isPopular ? (
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-sm bg-accent-gold px-6 py-1.5 text-[0.82rem] font-bold uppercase tracking-[0.16em] text-[#131316] shadow-[0_0_15px_rgba(184,149,42,0.4)]">
                          Most Popular
                        </span>
                      ) : null}

                      <div className={`mb-6 border-b pb-6 ${plan.isPopular ? "mt-2 border-accent-gold/20" : "border-[#343437]"}`}>
                        <h2 className={`font-page-title text-[3rem] uppercase leading-none ${plan.isPopular ? "text-accent-gold" : "text-white"}`}>
                          {plan.name}
                        </h2>
                        <p className={`mt-2 text-[1.02rem] ${plan.isPopular ? "text-[#b7c6ee]" : "text-[#c5c6cf]"}`}>{plan.tagline}</p>
                      </div>

                      <div className="mb-8 flex-grow">
                        <div className="mb-6 flex items-center gap-2">
                          <CalendarDaysIcon className={`h-6 w-6 ${plan.isPopular ? "text-accent-gold" : "text-[#8f9098]"}`} aria-hidden="true" />
                          <span className={`font-button-label text-button-label uppercase ${plan.isPopular ? "text-white" : "text-[#c5c6cf]"}`}>
                            {plan.cadence}
                          </span>
                        </div>

                        <ul className="space-y-4">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                              <CheckCircleIcon className="mt-0.5 h-5 w-5 text-accent-gold" aria-hidden="true" />
                              <span className={`${plan.isPopular ? "text-white" : "text-[#e4e2e5]"}`}>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    <div className="mt-auto">
                      <div className="mb-6 text-center">
                        <p className="font-page-title text-[3.8rem] leading-none text-white">{plan.displayPrice}</p>
                      </div>

                        <CheckoutForm
                          className="mt-1"
                          planType={plan.key}
                          stripePriceId={stripePriceId}
                          enabled={enabled}
                          buttonLabel="Select Plan"
                          displayPrice={plan.displayPrice}
                          planDescription={plan.features.join(" | ")}
                        />
                      </div>
                    </article>
                  </MotionReveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
