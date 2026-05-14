"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GlobalNavBtn from "./NavBtn";
import { usePathname } from "next/navigation";

const brandPink = "text-[oklch(65.35%_0.242_9.27)] bg-[url('/assets/bottom_line2.png')] bg-bottom bg-no-repeat pb-2 bg-contain";

const GlobalNav = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);

  return (
    <header className=" sticky top-0 z-50 relative w-full full-width nav-style bg-black border-y-2 border-[oklch(65.35%_0.242_9.27)] sticky top-0 z-50">
      <div className="absolute top-0 left-0 w-6 h-6 bg-[oklch(65.35%_0.242_9.27)] [clip-path:polygon(0%_0%,100%_0%,0%_100%)]"></div>

      <div className="absolute bottom-0 right-0 w-6 h-6 bg-[oklch(65.35%_0.242_9.27)] [clip-path:polygon(100%_0%,100%_100%,0%_100%)]"></div>

      <div className="flex items-center justify-between py-4 mx-6 lg:mx-20">
        {/* LOGO */}
        <Link href="/">
          <Image src="/assets/Logo.png" width={200} height={54} alt="Logo" className="cursor-pointer" />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-5" onMouseLeave={() => setHoveredPath(null)}>
          <GlobalNavBtn href="/" label="HOME" active={pathname === "/"} hovered={hoveredPath === "HOME"} onHover={() => setHoveredPath("HOME")} />

          <GlobalNavBtn href="/events" label="EVENTS" active={pathname === "/events"} hovered={hoveredPath === "EVENTS"} onHover={() => setHoveredPath("EVENTS")} />

          <GlobalNavBtn href="/book-table" label="BOOK TABLE" active={pathname === "/book-table"} hovered={hoveredPath === "BOOK TABLE"} onHover={() => setHoveredPath("BOOK TABLE")} />

          <GlobalNavBtn href="/contact" label="CONTACT US" active={pathname === "/contact"} hovered={hoveredPath === "CONTACT US"} onHover={() => setHoveredPath("CONTACT US")} />
        </nav>

        {/* BURGER BUTTON */}
        <button onClick={() => setIsOpen(true)} className="md:hidden text-white z-50">
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-start pt-45 gap-8">
            {/* CLOSE BUTTON */}
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-white text-3xl font-light">
              ✕
            </button>

            {/* MOBILE LINKS */}
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
      </div>
    </header>
  );
};

export default GlobalNav;
