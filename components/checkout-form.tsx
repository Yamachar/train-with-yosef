import { CheckoutPlanType } from "@/lib/site";

type CheckoutFormProps = {
  planType: CheckoutPlanType;
  stripePriceId: string;
  enabled: boolean;
  buttonLabel: string;
  displayPrice?: string;
  planDescription?: string;
  className?: string;
};

export function CheckoutForm({
  planType,
  stripePriceId,
  enabled,
  buttonLabel,
  displayPrice,
  planDescription,
  className,
}: CheckoutFormProps) {
  const canCheckout = enabled || (displayPrice?.trim().length ?? 0) > 0;

  return (
    <form action="/api/checkout" method="POST" className={className}>
      <input type="hidden" name="planType" value={planType} />
      <input type="hidden" name="priceId" value={stripePriceId} />
      <input type="hidden" name="displayPrice" value={displayPrice ?? ""} />
      <input type="hidden" name="planDescription" value={planDescription ?? ""} />
      <button
        type="submit"
        disabled={!canCheckout}
        className={`w-full rounded-md px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] transition ${
          canCheckout
            ? "gold-button"
            : "cursor-not-allowed border border-zinc-400 bg-zinc-300 text-zinc-600"
        }`}
      >
        {buttonLabel}
      </button>
    </form>
  );
}
