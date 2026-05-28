"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const DURATION = 0.3;
const STAGGER = 0.02;

export default function NavBtn({ href, label, active, hovered, onHover }) {
  const shouldAnimate = hovered && !active;

  return (
    <motion.div onMouseEnter={onHover}>
      <Link href={href} className={`relative px-4 py-2 block cursor-pointer ${active ? "text-[var(--pink)]" : "text-[var(--headlines)]"}`}>
        <div className="relative overflow-hidden h-6 whitespace-nowrap flex items-center">
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
                {l === " " ? "\u00A0" : l}
              </motion.span>
            ))}
          </div>

          {!active && (
            <div className="absolute inset-0 flex text-[var(--pink)]">
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
                  {l === " " ? "\u00A0" : l}
                </motion.span>
              ))}
            </div>
          )}
        </div>

        {(hovered || active) && <div className="absolute bottom-0 left-0 w-full h-3 bg-[url('/assets/bottom_line2.png')] bg-contain bg-no-repeat bg-center" />}
      </Link>
    </motion.div>
  );
}
