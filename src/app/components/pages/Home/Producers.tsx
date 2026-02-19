"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Partner } from "../../../page";
import { useLanguage } from "@/contexts/LanguageContext";

export const Producers = ({
  producers,
  isPartner = false,
  isTrue = false,
}: {
  producers: Partner[];
  isPartner: boolean;
  isTrue: boolean;
}) => {
  const { t } = useLanguage();
  return (
    <section dir="rtl" className={`${isPartner ? "" : "bg-white text-whit"} py-9 e`}>
      <div className="containerr">
        <h2 className="text-4xl font-bold mb-8 text-center">
          {isTrue ? t("home.agents.title") : t("home.producers.title")}
        </h2>

        <div className="flex justify-between items-center mb-6 relative">
          <h3 className="text-2xl font-semibold"> </h3>
          <div className="flex gap-2 justify-end">
            <button className="swiper-button-prev-producers bg-[#A6C7E0] text-black p-2 rounded-full hover:bg-[#4C7A9E] transition">
              <ArrowRight size={16} />
            </button>
            <button className="swiper-button-next-producers bg-[#A6C7E0] text-black p-2 rounded-full hover:bg-[#4C7A9E] transition">
              <ArrowLeft size={16} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".swiper-button-next-producers",
            prevEl: ".swiper-button-prev-producers",
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          loop={true}
          className="mt-4"
        >
          {[
            "/images/Home/Lafarge.webp",
            "/images/Home/cemex.webp",
            "/images/Home/MisrCement2.webp",
            "/images/Home/cemex.webp",
            "/images/Home/MisrCement2.webp",
            "/images/Home/cemex.webp",
          ].map((imagePath, i) => (
            <SwiperSlide key={i} className="flex items-center justify-center bg-white rounded-xl py-5">
              <div className="relative w-[80%] h-[120px] mx-auto">
                <Image src={imagePath} alt="producer logo" fill className="!object-contain w-full mx-auto" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
