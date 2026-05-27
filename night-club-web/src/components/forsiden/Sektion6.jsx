"use client";

import { useState, useEffect } from "react";
import { FaTwitter } from "react-icons/fa";

const BASE_URL = "https://night-club-th9v.onrender.com";

async function getTestimonials() {
  try {
    const res = await fetch(`${BASE_URL}/testimonials`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Status: ${res.status}`);

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      throw new Error("API did not return JSON");
    }

    const testimonials = await res.json();

    return testimonials.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error("Error fetching testimonials:", error.message);
    return [];
  }
}

const Sektion6 = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getTestimonials().then((data) => setTestimonials(data));
  }, []);

  const totalPages = testimonials.length;

  const scrollToPage = (index) => {
    setActiveIndex(index);
  };

  return (
    <section
      className="relative py-20 md:px-24 text-[var(--headlines)] overflow-hidden"
      style={{
        backgroundImage: "url('/assets/bg/footerbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-[var(--background)]/90" />

      {/* content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center md:px-30 py-10">
        {/* TESTIMONIAL CONTENT */}
        {testimonials.length > 0 && testimonials[activeIndex] && (
          <>
            <img src={`${BASE_URL}${testimonials[activeIndex].asset.url}`} alt={testimonials[activeIndex].asset.alt} className="mx-auto" />

            <h3 className="text-[18px] md:text-[24px] font-bold pb-2">{testimonials[activeIndex].name}</h3>

            <p className="text-[var(--headlines)] mt-4 px-6 md:px-12">{testimonials[activeIndex].content}</p>

            {/* SOCIAL LINKS */}
            <div className="flex justify-center gap-4 mt-6">
              <div className="w-10 h-10 border border[ var(--headlines)]-/30 flex items-center justify-center">
                {testimonials[activeIndex].facebook && (
                  <a href={testimonials[activeIndex].facebook} target="_blank" rel="noopener noreferrer">
                    <img src="/assets/icon/facebook.png" alt="facebook" />
                  </a>
                )}
              </div>
              <div className="w-10 h-10 border border[ var(--headlines)]-/30 flex items-center justify-center">
                {testimonials[activeIndex].twitter && (
                  <a href={testimonials[activeIndex].twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter size={22} />
                  </a>
                )}
              </div>

              <div className="w-10 h-10 border border[ var(--headlines)]-/30 flex items-center justify-center">
                {testimonials[activeIndex].twitter && (
                  <a href={testimonials[activeIndex].twitter} target="_blank" rel="noopener noreferrer">
                    <img src="/assets/icon/snapchat.png" alt="icon" />
                  </a>
                )}
              </div>
            </div>
          </>
        )}

        {/* PAGINATION DOTS */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 py-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToPage(i)}
                aria-label={`Gå til side ${i + 1}`}
                className={`w-4 h-4 block transition-all duration-300 ${activeIndex === i ? "bg-[var(--pink)]" : "border border-[var(--headlines)] opacity-50 hover:opacity-100"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Sektion6;
