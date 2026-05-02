import Link from "next/link";

export function SiteFooter() {
  return (
    <footer id="contact" className="w-full border-t border-accent-gold/20 bg-black">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-8 px-12 py-16 md:flex-row">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="font-page-title mb-2 text-2xl tracking-wider text-accent-gold" aria-label="Yosef home">
            Yosef Bouhamed
          </Link>
          <p className="text-center text-sm font-light uppercase tracking-wide text-slate-500 md:text-left">
            © 2026 Yosef Bouhamed. High-Performance Coaching. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-button-label text-xs uppercase tracking-widest text-slate-400 transition-colors hover:text-accent-gold"
          >
            Instagram
          </a>
          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="font-button-label text-xs uppercase tracking-widest text-slate-400 transition-colors hover:text-accent-gold"
          >
            WhatsApp
          </a>
          <a href="#" className="font-button-label text-xs uppercase tracking-widest text-slate-400 transition-colors hover:text-accent-gold">
            Terms
          </a>
          <a href="#" className="font-button-label text-xs uppercase tracking-widest text-slate-400 transition-colors hover:text-accent-gold">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
