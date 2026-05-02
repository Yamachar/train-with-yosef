export type CheckoutPlanType =
  | "book-session"
  | "plan-1to1-starter"
  | "plan-1to1-transformation"
  | "plan-1to1-elite";

export type PlanCardData = {
  key: CheckoutPlanType;
  name: string;
  tagline: string;
  duration: string;
  features: string[];
  displayPrice: string;
  stripePriceId: string;
  isPopular?: boolean;
};

export const siteBaseUrl =
  normalize(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000";

export const calBookingUrl =
  normalize(process.env.NEXT_PUBLIC_CAL_BOOKING_URL) || "https://cal.com";

export function normalize(value: string | undefined): string {
  return value?.trim() ?? "";
}

export function hasStripePrice(value: string): boolean {
  return value.length > 0;
}

export const oneToOnePlans: PlanCardData[] = [
  {
    key: "plan-1to1-starter",
    name: "Starter",
    tagline: "Build solid movement patterns and baseline strength.",
    duration: "4 Weeks / 8 Sessions",
    features: [
      "Initial movement screening",
      "Personalized lifting split",
      "Weekly progress adjustment",
    ],
    displayPrice: normalize(process.env.NEXT_PUBLIC_DISPLAY_PRICE_1TO1_STARTER),
    stripePriceId: normalize(process.env.STRIPE_PRICE_1TO1_STARTER) || "price_1TSldIDe8RUQaOS0NPxJMB1Z",
  },
  {
    key: "plan-1to1-transformation",
    name: "Transformation",
    tagline: "High-accountability coaching for measurable physique change.",
    duration: "12 Weeks / 24 Sessions",
    features: [
      "Everything in Starter",
      "Advanced periodized blocks",
      "Nutrition and recovery framework",
      "Priority coach support",
    ],
    displayPrice: normalize(process.env.NEXT_PUBLIC_DISPLAY_PRICE_1TO1_TRANSFORMATION),
    stripePriceId: normalize(process.env.STRIPE_PRICE_1TO1_TRANSFORMATION) || "price_1TSldVDe8RUQaOS0Xwgirj5D",
    isPopular: true,
  },
  {
    key: "plan-1to1-elite",
    name: "Elite",
    tagline: "Long-term performance partnership for serious lifters.",
    duration: "24 Weeks / 48 Sessions",
    features: [
      "Everything in Transformation",
      "Competition prep planning",
      "Deep analytics and testing",
    ],
    displayPrice: normalize(process.env.NEXT_PUBLIC_DISPLAY_PRICE_1TO1_ELITE),
    stripePriceId: normalize(process.env.STRIPE_PRICE_1TO1_ELITE) || "price_1TSldsDe8RUQaOS0RLiL9xGW",
  },
];

export const bookSession = {
  displayPrice: "€15",
  stripePriceId: normalize(process.env.STRIPE_PRICE_BOOK_SESSION) || "price_1TSlcgDe8RUQaOS0xiYc0ao9",
};

export const checkoutPlanLabel: Record<CheckoutPlanType, string> = {
  "book-session": "1-to-1 Consultation",
  "plan-1to1-starter": "Starter 1-to-1 Plan",
  "plan-1to1-transformation": "Transformation 1-to-1 Plan",
  "plan-1to1-elite": "Elite 1-to-1 Plan",
};
