"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Button from "@/components/events/Button";

const BASE_URL = "https://night-club-th9v.onrender.com";

export default function GalleryClient({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!images.length) return null;

  const layouts = [
    "col-span-4 row-span-2",
    "col-span-3 row-span-2",
    "col-span-2 row-span-2",
    "col-span-3 row-span-2",
    "col-span-4 row-span-2",
    "col-span-4 row-span-2",
    "col-span-4 row-span-2",
    "col-span-4 row-span-2",
    "col-span-4 row-span-2",
    "col-span-4 row-span-2",
    "col-span-3 row-span-2",
    "col-span-3 row-span-2",
    "col-span-3 row-span-2",
    "col-span-3 row-span-2",
  ];

  const safeIndex = selectedIndex !== null ? selectedIndex % images.length : null;

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev === null || prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev === null || prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, nextImage, prevImage]);

  const cards = [
    {
      ids: [1, 4, 7, 12, 14],
      title: "Night Club",
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    },
    {
      ids: [2, 5, 8, 11],
      title: "Restaurant",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.",
    },
    {
      ids: [3, 6, 9, 10, 13],
      title: "Bar",
      text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin.",
    },
  ];
  const getCardFromImageId = (id) => {
    return cards.find((card) => card.ids.includes(id));
  };
  return (
    <section className="mx-auto py-20 overflow-hidden lg:grid-cols-[200px]">
      {/* TITLE */}
      <div className="text-center mb-12">
        <h2 className="text-[32px] md:text-[38px] font-bold bg-[url('/assets/bottom_line.png')] bg-bottom bg-no-repeat pb-2 [background-size:140%_18px]">NIGHT CLUB GALLERY</h2>
      </div>

      {/* GALLERY */}
      <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[140px] gap-0">
        {" "}
        {images.slice(0, 14).map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            className={`${layouts[index] || "col-span-4 row-span-1"} overflow-hidden cursor-pointer relative group`}
            onClick={() => setSelectedIndex(index)}
          >
            <img src={`${BASE_URL}${image.asset.url}`} alt={image.asset.alt || "Gallery image"} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/20  md:hover:bg-black/0 transition-all duration-500" />
            {/* TOP LINE */} <div className="absolute top-0 left-0 w-20 h-20 bg-[var(--pink)] [clip-path:polygon(0_0,100%_0,0_100%)] opacity-0 md:group-hover:opacity-100 transition-all duration-[1000ms]" />{" "}
            <div className="absolute top-0 -left-full w-full h-[2px] bg-[var(--pink)] md:group-hover:left-0 transition-all z-20" />
            {/* BOTTOM LINE */}
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-[var(--pink)] [clip-path:polygon(100%_0,100%_100%,0_100%)] opacity-0 md:group-hover:opacity-100 transition-all duration-[1000ms]" />{" "}
            <div className="absolute bottom-0 -right-full w-full h-[2px] bg-[var(--pink)] md:group-hover:right-0 transition-all z-20" />{" "}
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {selectedIndex !== null &&
        (() => {
          const image = images[safeIndex];
          const card = getCardFromImageId(image.id);

          return (
            <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
              <button onClick={() => setSelectedIndex(null)} className="absolute top-6 right-6 text-white text-5xl">
                ×
              </button>

              {/* PREV */}
              <button onClick={prevImage} className="absolute left-6 text-white text-6xl">
                ‹
              </button>

              {/* CONTENT */}
              <div className="flex flex-col items-center gap-6 bg-[var(--hoverBg)]  ">
                <motion.img key={image.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} src={`${BASE_URL}${image.asset.url}`} alt={image.asset.alt} className="max-w-[80vw] max-h-[60vh] object-contain" />

                {card && (
                  <div className="text-white max-w-xl  ">
                    <h3 className=" text-center text-xl font-bold mb-3">{card.title}</h3>
                    <p className="text-base opacity-80 leading-6">{card.text}</p>
                  </div>
                )}
                {/* ={`/events/${image.slug}`} */}
                <Button href={`/events`} />
              </div>

              {/* NEXT */}
              <button onClick={nextImage} className="absolute right-6 text-white text-6xl">
                ›
              </button>
            </div>
          );
        })()}
    </section>
  );
}
