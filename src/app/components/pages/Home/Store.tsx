"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StoreCard } from "./StoreCard";
import { prodactType } from "../../../page";

export const Store = ({ prodacts, isStore = false }: { prodacts: prodactType[]; isStore: boolean }) => {
  return (
    <section dir="rtl" className="bg-[#618FB5] py-9">
      <div className="containerr">
        <h2 className={`text-4xl font-bold mb-8 text-center ${isStore ? "text-[white]" : "text-[black]"}`}>المتجر</h2>

        <div className="flex justify-between items-center mb-6 relative">
          <h3 className="text-2xl font-semibold text-[white] text-nowrap"> انواع الأسمنت </h3>
          <div className="flex gap-2 containerr justify-end">
            <button className="swiper-button-prev-store bg-[#A6C7E0] text-black p-2 rounded-full hover:bg-primary transition">
              <ArrowRight size={16} />
            </button>
            <button className="swiper-button-next-store bg-[#A6C7E0] text-black p-2 rounded-full hover:bg-primary transition">
              <ArrowLeft size={16} />
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
          className="mt-4 "
        >
          {prodacts.map((cardInfo, i) => (
            <SwiperSlide key={i} className="  px-2 ">
              <StoreCard idx={i} cardInfo={cardInfo} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
