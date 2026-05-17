"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const pink = "oklch(65.35% 0.242 9.27)";

const sweepVariants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.45, ease: "easeInOut" } },
};

const textVariants = {
  rest: { color: "#ffffff" },
  hover: { color: pink, transition: { duration: 0.3 } },
};

export default function Button({ slug }) {
  return (
    <div className="flex justify-center mb-8">
      <motion.div initial="rest" whileHover="hover" animate="rest" className="relative w-full py-5 uppercase overflow-hidden text-center cursor-pointer">
        {/* TEXT */}
        <motion.span variants={textVariants} className="relative z-20">
          READ MORE
        </motion.span>

        {/* WHITE BASE LINES */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--headlines)]" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--headlines)]" />

        {/* TOP SWEEP */}
        <motion.div className="absolute top-0 left-0 h-[2px] w-full" style={{ backgroundColor: pink, transformOrigin: "right" }} variants={sweepVariants} />

        {/* BOTTOM SWEEP */}
        <motion.div className="absolute bottom-0 left-0 h-[2px] w-full" style={{ backgroundColor: pink, transformOrigin: "left" }} variants={sweepVariants} />
      </motion.div>
    </div>
  );
}
