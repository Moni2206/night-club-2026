"use client";

import Image from "next/image";
import BtnBook from "@/components/forsiden/HeroBtnBook";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const MotionImage = motion.create(Image);

const heroImages = ["/assets/bg/header_bg_1.jpg", "/assets/bg/header_bg_2.jpg"];

const Hero = () => {
  // låser billedet så det ikke skifter ved re-render
  const [randomImage] = useState(heroImages[Math.floor(Math.random() * heroImages.length)]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* LOADER */}
      {!loaded && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <img src="/assets/loader/madbars.gif" alt="loader" className="w-20" />
        </div>
      )}

      {/* HERO */}
      {loaded && (
        <>
          {/* BACKGROUND */}
          <div className="absolute inset-0 -z-10">
            <Image src={randomImage} alt="hero" fill priority className="object-cover object-center" />
          </div>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/50" />

          {/* CONTENT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <MotionImage src="/assets/icon/Logo.svg" alt="Logo" width={563} height={63} initial={{ rotateX: 90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: 0.7 }} style={{ transformPerspective: 1000 }} />

            <h3 className="text-[32px] md:text-[38px] font-bold text-white animate-tagline bg-[url('/assets/bottom_line.png')] bg-bottom bg-no-repeat pb-2 [background-size:140%_18px]">HAVE A GOOD TIME</h3>

            <div className="mt-6">
              <BtnBook />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
