"use client";

import Image from "next/image";
import Link from "next/link";

export function TopNav() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/plans/1to1", label: "1-to-1 Plans" },
    { href: "/plans/online", label: "Online Plans" },
  ];

  return (
    <header className="fixed full-width top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-4 md:px-12">
        <Link href="/" className="flex items-center gap-2" aria-label="Yosef PT home">
          <Image
            src="/yosef-logo.png"
            alt="Yosef personal trainer logo"
            width={52}
            height={52}
            loading="eager"
            className="h-9 w-9 rounded-full"
          />
          <span className="font-page-title text-2xl font-normal tracking-tighter text-accent-gold">Yosef Bouhamed</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-page-title tracking-widest uppercase text-slate-300 hover:text-accent-gold hover:opacity-80 transition-all duration-300 active:scale-95 transition-transform text-lg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/book"
          className="hidden bg-accent-gold px-6 py-3 text-black transition-colors duration-300 hover:bg-accent-gold-hover md:block font-button-label text-button-label uppercase tracking-widest active:scale-95"
        >
          Book Consultation
        </Link>
      </div>
    </header>
  );
}
