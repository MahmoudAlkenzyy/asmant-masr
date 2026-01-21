"use client";
import React from "react";
import { NewCardProps, NewsCard } from "./NewsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LatestNew } from "../../../page";
import { Item } from "../News/NewsTab";

export const News = ({ news }: { news: Item[] }) => {
  return (
    <section dir="rtl" className="bg-secoundry py-9">
      <div className="containerr">
        <h2 className="text-4xl font-bold mb-8 text-center">الأخبار</h2>

        <div className="flex justify-between items-center mb-6 relative">
          <h3 className="text-2xl font-semibold">أهم الأخبار</h3>
          <div className="flex gap-2 containerr justify-end">
            <button className="swiper-button-prev-custom bg-[#A6C7E033] p-2 rounded-full hover:bg-primary transition">
              <ArrowRight />
            </button>
            <button className="swiper-button-next-custom bg-[#A6C7E033] p-2 rounded-full hover:bg-primary transition">
              <ArrowLeft />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          loop={true}
          className="mt-4"
        >
          {news.map((newCard, i) => (
            <SwiperSlide key={i}>
              <NewsCard idx={i} news={newCard} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
