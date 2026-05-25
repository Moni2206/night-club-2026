"use client";

import { useState } from "react";

const videos = [
  {
    poster: "/assets/content-img/video_poster.jpg",
    video: "/assets/media/video-crowd.mp4",
  },
  {
    poster: "/assets/content-img/track1.jpg",
    video: "/assets/media/video-dj-crowd1.mp4",
  },
  {
    poster: "/assets/content-img/track2.jpg",
    video: "/assets/media/video-dj-crowd-2.mp4",
  },
];

export default function Sektion5() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative mt-20 px-6 md:px-16">
      {/* TITLE */}
      <div className="text-center mb-10">
        <h2 className="text-[32px] md:text-[38px] font-bold bg-[url('/assets/bottom_line.png')] bg-bottom bg-no-repeat pb-2 [background-size:140%_18px]">LATEST VIDEO</h2>
      </div>

      {/* VIDEO */}
      <div className="relative overflow-hidden">
        <video src={videos[activeIndex].video} poster={videos[activeIndex].poster} controls className="w-full h-[350px] md:h-[600px] object-cover" />
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-10 mt-5">
        <button onClick={handlePrev} className="w-12 h-12 border-2 border-[var(--headlines)] flex items-center justify-center text-[var(--headlines)] text-xl hover:border-[var(--pink)] hover:text-[var(--pink)] transition">
          ◀
        </button>

        <button onClick={handleNext} className="w-12 h-12 border-2 border-[var(--headlines)] flex items-center justify-center text-[var(--headlines)] text-xl hover:border-[var(--pink)] hover:text-[var(--pink)] transition">
          ▶
        </button>
      </div>
    </section>
  );
}
