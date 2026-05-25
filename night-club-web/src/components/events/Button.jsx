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

export default function Button({ href, onClick, children = "READ MORE" }) {
  const Content = (
    <motion.div initial="rest" whileHover="hover" animate="rest" className="relative w-30 py-3 uppercase overflow-hidden text-center cursor-pointer">
      <motion.span variants={textVariants} className="relative z-20">
        {children}
      </motion.span>

      <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--headlines)]" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--headlines)]" />

      <motion.div className="absolute top-0 left-0 h-[2px] w-1/3" style={{ backgroundColor: pink, transformOrigin: "right" }} variants={sweepVariants} />

      <motion.div className="absolute bottom-0 left-0 h-[2px] w-1/3" style={{ backgroundColor: pink, transformOrigin: "left" }} variants={sweepVariants} />
    </motion.div>
  );

  //  LINK MODE
  if (href) {
    return (
      <div className="flex  md:justify-end justify-center mb-8">
        <Link href={href} className="w-full">
          {Content}
        </Link>
      </div>
    );
  }

  //  BUTTON MODE
  return (
    <div className="flex md:justify-end justify-center mb-8" onClick={onClick}>
      {Content}
    </div>
  );
}
