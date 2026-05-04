"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Fortæller os hvilken side vi er på

  const brandPink = "text-[oklch(65.35%_0.242_9.27)] bg-[url('/assets/bottom_line2.png')] bg-bottom bg-no-repeat pb-2 bg-contain";
  // Farvevariabel (med understregninger)
  return (
    <nav className="relative w-full bg-black px-6 md:px-25 py-4 flex items-center justify-between border-y-2 border-[oklch(65.35%_0.242_9.27)]">
      {/* Pink hjørner */}
      <div className="absolute top-0 left-0 w-6 h-6 bg-[oklch(65.35%_0.242_9.27)] [clip-path:polygon(0%_0%,100%_0%,0%_100%)]"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 bg-[oklch(65.35%_0.242_9.27)] [clip-path:polygon(100%_0%,100%_100%,0%_100%)]"></div>

      {/* Logo Sektion */}
      <div className="flex items-center gap-4">
        <img src="/assets/icon/Logo_main.svg" alt="Logo" className=" md:block h-12 w-auto" />
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8">
        {[
          { name: "HOME", href: "/" },
          { name: "EVENTS", href: "/events" },
          { name: "BOOK TABLE", href: "/book-table" },
          { name: "CONTACT US", href: "/contact" },
        ].map((link) => (
          <Link key={link.href} href={link.href} className={`font-bold transition-colors hover:text-[oklch(65.35%_0.242_9.27)] ${pathname === link.href ? brandPink : "text-white"}`}>
            {link.name}
          </Link>
        ))}
      </div>

      {/* Burger Knap (Vises kun på mobil) */}
      <button onClick={() => setIsOpen(true)} className="md:hidden text-white z-50">
        <div className="w-6 h-0.5 bg-white mb-1"></div>
        <div className="w-6 h-0.5 bg-white mb-1"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </button>

      {/* Mobil Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-start pt-45 gap-8">
          {/* justify-start rykker indholdet op i toppen, pt-32 bestemmer afstanden fra toppen */}

          {/* Luk knap */}
          <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-white text-3xl font-light">
            ✕
          </button>

          {/* Links */}
          {[
            { name: "HOME", href: "/" },
            { name: "EVENTS", href: "/events" },
            { name: "BOOK TABLE", href: "/book-table" },
            { name: "CONTACT US", href: "/contact" },
          ].map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`text-lg font-bold tracking-widest ${pathname === link.href ? brandPink : "text-white"}`}>
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
