"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Button() {
  return (
    <div className="flex justify-center gap-4 mb-8">
      {/* VIEW EVENTS */}
      <Link href="/events" className="block">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }} className="border-2 border-[var(--headlines)]/40 bg-[var(--background)]/10 backdrop-blur-sm">
          <div className="py-[14px] px-5 uppercase text-center font-bold text-[ var(--headlines)]">View events</div>
        </motion.div>
      </Link>

      {/* BOOK TABLE */}
      <Link href="/book-table" className="block">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }} className="p-[2px] bg-[linear-gradient(45deg,#f72a78_8%,#f72a78_85%,#ffffff_100%)]">
          <div className="py-[14px] px-5 uppercase text-center font-bold text-[ var(--headlines)] bg-gradient-to-r from-[#F72A78] to-[#B822B5]">Book table</div>
        </motion.div>
      </Link>
    </div>
  );
}
