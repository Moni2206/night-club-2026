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
      <Link href={`/events/${slug}`} className="w-full block">
        <motion.div initial="rest" whileHover="hover" animate="rest" className="relative w-full py-5 uppercase overflow-hidden text-center cursor-pointer">
          {/* TEXT */}
          <motion.span variants={textVariants} className="relative z-20">
            Book Now
          </motion.span>

          {/* WHITE BASE LINES */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-white" />
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />

          {/* TOP SWEEP */}
          <motion.div className="absolute top-0 left-0 h-[2px] w-full" style={{ backgroundColor: pink, transformOrigin: "right" }} variants={sweepVariants} />

          {/* BOTTOM SWEEP */}
          <motion.div className="absolute bottom-0 left-0 h-[2px] w-full" style={{ backgroundColor: pink, transformOrigin: "left" }} variants={sweepVariants} />
        </motion.div>
      </Link>
    </div>
  );
}

// ("use client");

// import Link from "next/link";
// import { motion } from "framer-motion";

// const pink = "oklch(65.35% 0.242 9.27)";

// const Button = ({ slug }) => {
//   return (
//     <div className="flex justify-center mb-8">
//       <Link href={`/events/${slug}`} className="w-full">
//         <motion.button whileHover={{ scale: 1.03, y: -2 }} transition={{ duration: 0.35, ease: "easeInOut" }} className="relative overflow-hidden px-[10rem] py-5 w-full text-center uppercase text-white">
//           {/* WHITE BASE LINES */}
//           <div className="absolute top-0 left-0 w-full h-[2px] bg-white" />
//           <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />

//           {/* TOP PINK (RIGHT → LEFT) */}
//           <motion.div
//             className="absolute top-0 left-0 w-full h-[2px] z-10"
//             style={{
//               backgroundColor: pink,
//               transformOrigin: "right",
//             }}
//             initial={{ scaleX: 0 }}
//             whileHover={{ scaleX: 1 }}
//             transition={{ duration: 0.4, ease: "easeInOut" }}
//           />

//           {/* BOTTOM PINK (LEFT → RIGHT) */}
//           <motion.div
//             className="absolute bottom-0 left-0 w-full h-[2px] z-10"
//             style={{
//               backgroundColor: pink,
//               transformOrigin: "left",
//             }}
//             initial={{ scaleX: 0 }}
//             whileHover={{ scaleX: 1 }}
//             transition={{ duration: 0.4, ease: "easeInOut" }}
//           />

//           <span className="relative z-20">Book Now!</span>
//         </motion.button>
//       </Link>
//     </div>
//   );
// };

// export default Button;
