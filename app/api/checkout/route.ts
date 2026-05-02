import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  checkoutPlanLabel,
  CheckoutPlanType,
  hasStripePrice,
  normalize,
  siteBaseUrl,
} from "@/lib/site";

const stripeSecretKey = normalize(process.env.STRIPE_SECRET_KEY);

function getStripeClient() {
  if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }
  return new Stripe(stripeSecretKey);
}

function isPlanType(value: string): value is CheckoutPlanType {
  return value in checkoutPlanLabel;
}

function parseEuroAmountToCents(value: string, fallbackCents: number) {
  const normalized = value.replace(/[^0-9.,]/g, "").replace(",", ".");
  const parsed = Number.parseFloat(normalized);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallbackCents;
  }
  return Math.round(parsed * 100);
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const priceId = normalize(String(form.get("priceId") ?? ""));
    const rawPlanType = normalize(String(form.get("planType") ?? ""));
    const displayPrice = normalize(String(form.get("displayPrice") ?? ""));
    const planDescription = normalize(String(form.get("planDescription") ?? ""));
    const bookingDate = normalize(String(form.get("bookingDate") ?? ""));
    const bookingTime = normalize(String(form.get("bookingTime") ?? ""));

    const planType: CheckoutPlanType = isPlanType(rawPlanType) ? rawPlanType : "book-session";

    if (planType === "book-session" && (!bookingDate || !bookingTime)) {
      return NextResponse.redirect(new URL("/cancel?reason=missing-slot", siteBaseUrl), 303);
    }

    const successUrl =
      planType === "book-session"
        ? `${siteBaseUrl}/book/confirmed?session_id={CHECKOUT_SESSION_ID}&bookingDate=${encodeURIComponent(bookingDate)}&bookingTime=${encodeURIComponent(bookingTime)}`
        : `${siteBaseUrl}/success?session_id={CHECKOUT_SESSION_ID}`;

    const stripe = getStripeClient();
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    if (!hasStripePrice(priceId)) {
      const fallbackCents = planType === "book-session" ? 1500 : 1000;
      const unitAmount = parseEuroAmountToCents(displayPrice, fallbackCents);

      const fallbackDescription =
        planType === "book-session"
          ? `Preferred slot: ${bookingDate} ${bookingTime}`
          : "Custom private coaching package";

      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: checkoutPlanLabel[planType],
            description: planDescription || fallbackDescription,
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      });
    } else {
      lineItems.push({ price: priceId, quantity: 1 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      metadata: {
        planType,
        planLabel: checkoutPlanLabel[planType],
        planDescription,
        displayPrice,
        bookingDate,
        bookingTime,
      },
      success_url: successUrl,
      cancel_url: `${siteBaseUrl}/cancel`,
    });

    if (!session.url) {
      return NextResponse.redirect(new URL("/cancel?reason=no-session-url", siteBaseUrl), 303);
    }

    return NextResponse.redirect(session.url, 303);
  } catch {
    return NextResponse.redirect(new URL("/cancel?reason=stripe-error", siteBaseUrl), 303);
  }
}
