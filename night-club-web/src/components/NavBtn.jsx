"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const DURATION = 0.3;
const STAGGER = 0.02;

const brandPink = "text-[oklch(65.35%_0.242_9.27)]";

const NavBtn = ({ href, label, active, hovered, onHover }) => {
  const shouldAnimate = hovered && !active;

  return (
    <motion.div onMouseEnter={onHover}>
      <Link href={href} className={`relative px-4 py-2 block cursor-pointer transition-colors ${active ? `${brandPink}` : "text-white"}`}>
        <div className="relative overflow-hidden h-6">
          {/* TOP TEXT */}
          <div className="flex">
            {label.split("").map((l, i) => (
              <motion.span
                key={i}
                className="inline-block whitespace-pre"
                initial={{ y: 0 }}
                animate={shouldAnimate ? { y: "-100%" } : { y: 0 }}
                transition={{
                  duration: DURATION,
                  ease: "easeInOut",
                  delay: STAGGER * i,
                }}
              >
                {l}
              </motion.span>
            ))}
          </div>

          {/* BOTTOM TEXT */}
          {!active && (
            <div className="absolute inset-0 flex">
              {label.split("").map((l, i) => (
                <motion.span
                  key={i}
                  className="inline-block whitespace-pre text-[oklch(65.35%_0.242_9.27)]"
                  initial={{ y: "100%" }}
                  animate={shouldAnimate ? { y: 0 } : { y: "100%" }}
                  transition={{
                    duration: DURATION,
                    ease: "easeInOut",
                    delay: STAGGER * i,
                  }}
                >
                  {l}
                </motion.span>
              ))}
            </div>
          )}
        </div>
        {(hovered || active) && <div className="absolute bottom-0 left-0 w-full h-3 bg-[url('/assets/bottom_line2.png')] bg-center bg-no-repeat bg-contain" />}{" "}
      </Link>
    </motion.div>
  );
};

export default NavBtn;
