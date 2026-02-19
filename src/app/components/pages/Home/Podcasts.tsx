"use client";
import React from "react";
import { NewsCard } from "./NewsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Podcasts = () => {
  const { t } = useLanguage();
  return (
    <section dir="rtl" className="bg-secoundry py-9">
      <div className="containerr">
        <h2 className="text-4xl font-bold mb-8 text-center ">{t("home.forum.title")}</h2>
        <div className="flex justify-between items-center mb-6 relative">
          <h3 className="text-2xl font-semibold text-nowrap ">{t("home.forum.subtitle")}</h3>
          <div className="flex gap-2  containerr justify-end">
            <button className="swiper-button-prev-podcasts bg-[#A6C7E033]  p-2 rounded-full hover:bg-primary transition">
              <ArrowRight />
            </button>
            <button className="swiper-button-next-podcasts bg-[#A6C7E033]  p-2 rounded-full hover:bg-primary transition">
              <ArrowLeft />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next-podcasts",
            prevEl: ".swiper-button-prev-podcasts",
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={true}
          className="mt-4"
        >
          {[...Array(4)].map((_, i) => (
            <SwiperSlide key={i}>
              <NewsCard ispodcast={true} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
