"use client";

import { Partner } from "../../../page";
import Image from "next/image";
import { motion } from "framer-motion";

export const Partenar = ({ partenar }: { partenar: Partner[] }) => {
  const logos = [
    "/images/Home/mondi.png",
    "/images/Home/MCG.png",
    "/images/Home/mondi.png",
    "/images/Home/MCG.png",
    "/images/Home/BMIC.png",
    "/images/Home/BMIC.png",
  ];

  return (
    <section className="bg-primary py-20 my-10 overflow-hidden">
      <div className="relative w-full">
        <motion.div
          className="flex gap-14 w-max"
          animate={{ x: ["50%", "0%"] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
          whileHover={{
            x: undefined,
            transition: { duration: 0 },
          }}
        >
          {[...logos, ...logos].map((src, idx) => (
            <div key={`first-${idx}`} className="w-[180px] flex-shrink-0 flex items-center justify-center">
              <Image src={src} alt={`Partner ${idx}`} width={200} height={120} className="object-contain" />
            </div>
          ))}

          {logos.map((src, idx) => (
            <div key={`second-${idx}`} className="w-[180px] flex-shrink-0 flex items-center justify-center">
              <Image src={src} alt={`Partner duplicate ${idx}`} width={200} height={120} className="object-contain" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
