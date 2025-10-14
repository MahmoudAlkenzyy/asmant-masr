"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// @ts-expect-error: importing CSS files for Swiper styles
import "swiper/css";
// @ts-expect-error: importing navigation styles for Swiper
import "swiper/css/navigation";
// @ts-expect-error: importing pagination styles for Swiper
import "swiper/css/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

export const Producers = () => {
  return (
    <section dir="rtl" className="bg-primary py-9 text-white">
      <div className="containerr">
        <h2 className="text-4xl font-bold mb-8 text-center">المنتجين وشركاء النجاح</h2>

        <div className="flex justify-between items-center mb-6 relative">
          <h3 className="text-2xl font-semibold">شركاء النجاح</h3>
          <div className="flex gap-2 justify-end">
            <button className="swiper-button-prev-producers bg-[#A6C7E0] text-white p-2 rounded-md hover:bg-[#4C7A9E] transition">
              <ArrowRight />
            </button>
            <button className="swiper-button-next-producers bg-[#A6C7E0] text-white p-2 rounded-md hover:bg-[#4C7A9E] transition">
              <ArrowLeft />
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
          ].map((src, i) => (
            <SwiperSlide key={i} className="flex items-center justify-center bg-white rounded-xl py-5">
              <div className="relative w-[80%] h-[120px]">
                <Image src={src} alt="producer logo" fill className="object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
