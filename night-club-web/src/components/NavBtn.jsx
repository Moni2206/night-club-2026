"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const DURATION = 0.3;
const STAGGER = 0.02;

const pink = "oklch(65.35% 0.242 9.27)";

export default function NavBtn({ href, label, active }) {
  const [hovered, setHovered] = useState(false);
  const shouldAnimate = hovered && !active;

  return (
    <motion.div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Link href={href} className={`relative px-4 py-2 block cursor-pointer ${active ? "text-[oklch(65.35%_0.242_9.27)]" : "text-white"}`}>
        <div className="relative overflow-hidden h-6">
          {/* TOP TEXT */}
          <div className="flex">
            {label.split("").map((l, i) => (
              <motion.span
                key={i}
                initial={{ y: 0 }}
                animate={shouldAnimate ? { y: "-100%" } : { y: 0 }}
                transition={{
                  duration: DURATION,
                  delay: STAGGER * i,
                  ease: "easeInOut",
                }}
              >
                {l}
              </motion.span>
            ))}
          </div>

          {/* BOTTOM TEXT */}
          {!active && (
            <div className="absolute inset-0 flex text-[oklch(65.35%_0.242_9.27)]">
              {label.split("").map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%" }}
                  animate={shouldAnimate ? { y: 0 } : { y: "100%" }}
                  transition={{
                    duration: DURATION,
                    delay: STAGGER * i,
                    ease: "easeInOut",
                  }}
                >
                  {l}
                </motion.span>
              ))}
            </div>
          )}
        </div>

        {/* underline */}
        {(hovered || active) && <div className="absolute bottom-0 left-0 w-full h-3 bg-[url('/assets/bottom_line2.png')] bg-contain bg-no-repeat bg-center" />}
      </Link>
    </motion.div>
  );
}
