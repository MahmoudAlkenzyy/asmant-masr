"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { advertisementItem } from "../../../page";

export default function ImgSlider({ ads, className }: { ads?: advertisementItem[]; className?: string }) {
  const images = ads?.map((ad) => ad.imagePath) ?? [
    "/images/Home/ads.webp",
    "/images/Home/ads2.webp",
    "/images/Home/ads.webp",
  ];

  return (
    <Swiper
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      modules={[Pagination, Autoplay]}
      loop
      className={`w-full h-full ${className ?? ""}`}
    >
      {images.map((src, idx) => (
        <SwiperSlide className="!flex !items-stretch" key={idx}>
          <img
            src={src}
            alt=""
            className="block w-full h-full min-w-full min-h-full object-fill rounded-2xl"
            draggable={false}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
