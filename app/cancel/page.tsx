import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F0E8] px-6 text-center text-[#1A1A1A]">
      <div className="max-w-xl">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#1B2A4A] text-6xl text-[#1B2A4A]">
          ×
        </div>
        <h1 className="heading-font mt-7 text-6xl text-[#1B2A4A] md:text-7xl">Payment Cancelled</h1>
        <p className="mt-3 text-[#495266]">No charge was made. You can return anytime and complete checkout when ready.</p>

        <Link href="/book" className="outline-gold-button mt-8 inline-flex rounded-md px-6 py-3 text-sm">
          Go Back
        </Link>
      </div>
    </main>
  );
}
