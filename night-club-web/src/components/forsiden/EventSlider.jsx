"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

export default function EventSlider({ initialEvents, baseUrl }) {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const displayEvents = initialEvents.filter((event) => event.isFeatured).slice(0, 6);

  // CHECK MOBILE
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const totalPages = isMobile ? 6 : 3;

  const scrollToPage = (pageIndex) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const containerWidth = container.clientWidth;

    container.scrollTo({
      left: pageIndex * containerWidth,
      behavior: "smooth",
    });

    setActiveIndex(pageIndex);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;

      if (containerWidth > 0) {
        const newIndex = Math.round(scrollLeft / containerWidth);

        if (newIndex !== activeIndex && newIndex < totalPages) {
          setActiveIndex(newIndex);
        }
      }
    };

    const container = scrollContainerRef.current;

    container?.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => container?.removeEventListener("scroll", handleScroll);
  }, [activeIndex, totalPages]);

  return (
    <>
      {/* SLIDER */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {displayEvents.map((event) => (
          <div key={event.id} className="min-w-[90%] sm:min-w-[70%] md:min-w-[50%] snap-start relative group overflow-hidden h-[500px]">
            {" "}
            <img src={`${baseUrl}${event.asset.url}`} alt={event.asset.alt} className="w-full h-full object-cover" />
            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <div className="absolute top-0 left-[-100%] w-full h-[2px] bg-[var(--pink)] group-hover:left-0 transition-all z-20" />
            <div className="absolute bottom-0 right-[-100%] w-full h-[2px] bg-[var(--pink)] group-hover:right-0 transition-all z-20" />
            {/* CORNER SHAPES */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-[var(--pink)] [clip-path:polygon(0_0,100%_0,0_100%)] opacity-0 group-hover:opacity-100 transition-all z-20" />
            <div className="absolute bottom-0 mb-[54px] right-0 w-20 h-20 bg-[var(--pink)] [clip-path:polygon(100%_0,100%_100%,0_100%)] opacity-0 group-hover:opacity-100 transition-all z-50" />
            {/* HOVER CONTENT */}
            <div className="absolute inset-0 flex flex-col justify-end items-center opacity-0 group-hover:opacity-100 transition-all duration-700 z-30">
              <div className="flex flex-col items-center justify-center flex-1">
                <Link href={`/book-table?event=${event.id}`} className="bg-[var(--pink)] text-white px-8 py-3 uppercase text-sm font-bold hover:bg-white hover:text-[var(--pink)] transition-colors duration-300">
                  Book Now
                </Link>
              </div>

              <div className="w-full bg-black/90 p-6 pb-20 ">
                <h3 className="text-white text-2xl font-bold mb-3"> {event.title}</h3>

                <p className="text-white text-sm leading-6">{event.excerpt}</p>
              </div>
            </div>
            {/* BOTTOM PINK  */}
            <div className="absolute bottom-0 left-0 right-0 bg-[var(--pink)] px-8 py-4 flex items-center gap-3 z-40">
              <span className="text-white text-sm">{event.title}</span>
              <span className="text-white text-sm font-bold">{event.location}</span>
              <span className="text-white text-sm font-bold ml-auto">
                {new Date(event.date).toLocaleDateString("da-DK", {
                  day: "numeric",
                  month: "short",
                })}
                ·{" "}
                {new Date(event.date).toLocaleTimeString("da-DK", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-3 py-10">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToPage(i)}
            aria-label={`Gå til side ${i + 1}`}
            className={`w-4 h-4 block transition-all duration-300 transform ${activeIndex === i ? "bg-white scale-110" : "border border-white opacity-50 hover:opacity-100"}`}
          />
        ))}
      </div>
    </>
  );
}
