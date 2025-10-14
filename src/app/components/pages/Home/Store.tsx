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
import { StoreCard } from "./StoreCard";

export const Store = () => {
  return (
    <section dir="rtl" className="bg-primary py-9">
      <div className="containerr">
        <h2 className="text-4xl font-bold mb-8 text-center text-[white]">المتجر</h2>

        <div className="flex justify-between items-center mb-6 relative">
          <h3 className="text-2xl font-semibold text-[white]">أكثر المبيعات </h3>
          <div className="flex gap-2 containerr justify-end">
            <button className="swiper-button-prev-store bg-[#A6C7E0] text-white p-2 rounded-md hover:bg-primary transition">
              <ArrowRight />
            </button>
            <button className="swiper-button-next-store bg-[#A6C7E0] text-white p-2 rounded-md hover:bg-primary transition">
              <ArrowLeft />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".swiper-button-next-store",
            prevEl: ".swiper-button-prev-store",
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          loop={true}
          className="mt-4"
        >
          {[...Array(5)].map((_, i) => (
            <SwiperSlide key={i}>
              <StoreCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
