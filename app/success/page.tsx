import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { TopNav } from "@/components/top-nav";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1B2A4A] text-[#F5F0E8]">
      <TopNav />
      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 text-center">
        <div className="page-pattern absolute inset-0 opacity-20" />
        <div className="relative z-10 max-w-xl">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#B8952A] bg-[#132543] text-6xl text-[#D4AF5A]">
            ✓
          </div>
          <h1 className="heading-font mt-7 text-6xl text-white md:text-7xl">Payment Confirmed</h1>
          <p className="mt-3 text-[#d7dfeb]">Thank you. Your transaction completed successfully.</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="gold-button rounded-md px-6 py-3 text-sm">
              Back to Home
            </Link>
            <Link href="/plans/1to1" className="outline-gold-button rounded-md px-6 py-3 text-sm">
              View Plans
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
