"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GlobalNavBtn from "./NavBtn";
import { usePathname } from "next/navigation";

const brandPink = "text-[oklch(65.35%_0.242_9.27)] ";

const GlobalNav = () => {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState(null);

  return (
    <header className="sticky top-0 z-50 w-full relative bg-[var(--background)] border-y-2 border-[oklch(65.35%_0.242_9.27)]">
      <div className="absolute top-0 left-0 w-6 h-6 bg-[oklch(65.35%_0.242_9.27)] [clip-path:polygon(0%_0%,100%_0%,0%_100%)]" />
      <div className="absolute bottom-0 right-0 w-6 h-6 bg-[oklch(65.35%_0.242_9.27)] [clip-path:polygon(100%_0%,100%_100%,0%_100%)]" />

      <div className="flex items-center justify-between py-4 mx-6 lg:mx-20">
        <Link href="/" aria-label="Go to homepage">
          <Image src="/assets/Logo.png" width={200} height={54} alt="Logo" className="cursor-pointer w-auto h-auto" />{" "}
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-10 items-center" role="navigation" aria-label="Main navigation" onMouseLeave={() => setHoveredPath(null)}>
          <GlobalNavBtn href="/" label="HOME" active={pathname === "/"} hovered={hoveredPath === "HOME"} onHover={() => setHoveredPath("HOME")} />

          <GlobalNavBtn href="/events" label="EVENTS" active={pathname === "/events"} hovered={hoveredPath === "EVENTS"} onHover={() => setHoveredPath("EVENTS")} />

          <GlobalNavBtn href="/book-table" label="BOOK TABLE" active={pathname === "/book-table"} hovered={hoveredPath === "BOOK TABLE"} onHover={() => setHoveredPath("BOOK TABLE")} />

          <GlobalNavBtn href="/contact" label="CONTACT US" active={pathname === "/contact"} hovered={hoveredPath === "CONTACT US"} onHover={() => setHoveredPath("CONTACT US")} />
        </nav>

        {/* BURGER BUTTON */}
        <button popoverTarget="mobile-menu" popoverTargetAction="toggle" className="md:hidden text-[var(--headlines)] z-50" aria-label="Open menu">
          {" "}
          <div className="w-6 h-0.5 bg-[var(--headlines)] mb-1"></div> <div className="w-6 h-0.5 bg-[var(--headlines)] mb-1"></div> <div className="w-6 h-0.5 bg-[var(--headlines)]"></div>{" "}
        </button>

        {/* MOBILE MENU */}
        <div id="mobile-menu" popover="auto" className="p-6">
          <button popoverTarget="mobile-menu" popoverTargetAction="hide" className="absolute top-8 right-8 text-[var(--headlines)] text-3xl font-light" aria-label="Close menu">
            ✕
          </button>

          <div className="flex flex-col gap-6 mt-12">
            {[
              { name: "HOME", href: "/" },
              { name: "EVENTS", href: "/events" },
              { name: "BOOK TABLE", href: "/book-table" },
              { name: "CONTACT US", href: "/contact" },
            ].map((link) => (
              <Link key={link.href} href={link.href} popoverTarget="mobile-menu" popoverTargetAction="hide" className={pathname === link.href ? brandPink : "text-[var(--headlines)] text-lg font-bold "}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalNav;
