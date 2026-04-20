"use client";

import { advertisementItem, advertisementType, Partner } from "../../../page";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../../../../contexts/LanguageContext";

export const Partenar = ({ partenars }: { partenars: advertisementItem[] }) => {
  const { t } = useLanguage();
  const logos = [
    "/images/Home/mondi.png",
    "/images/Home/MCG.png",
    "/images/Home/mondi.png",
    "/images/Home/MCG.png",
    "/images/Home/BMIC.png",
    "/images/Home/BMIC.png",
  ];

  return (
    <section dir="rtl" className="bg-primary py-20 my-10 overflow-hidden">
      <div className="relative w-full">
        <motion.div
          className="flex gap-14 w-max"
          animate={{ x: ["0%", "-50%"] }}
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
          {[...partenars, ...partenars].map((src, idx) => (
            <div key={`first-${idx}`} className="w-[180px] flex-shrink-0 flex items-center justify-center">
              <Image src={src.imagePath} alt={`Partner ${idx}`} width={200} height={120} className="object-contain" />
            </div>
          ))}

          {partenars.map((src, idx) => (
            <div key={`second-${idx}`} className="w-[180px] flex-shrink-0 flex items-center justify-center">
              <Image
                src={src.imagePath}
                alt={`Partner duplicate ${idx}`}
                width={200}
                height={120}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
