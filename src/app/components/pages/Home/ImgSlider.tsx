"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { advertisementItem } from "../../../page";

export default function ImgSlider({ ads, className }: { ads?: advertisementItem[]; className?: string }) {
  return (
    <Swiper
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={true}
      modules={[Pagination, Navigation, Autoplay]}
      loop={true}
      className={`${className} mySwiper min-h-[300px]`}
    >
      {ads ? (
        ads.map((ad, idx) => (
          <SwiperSlide key={idx} className="h-full md:min-h-[400] min-h-[300px]">
            <Image src={ad.imagePath} fill className="object-contain rounded-2xl" alt="" />
          </SwiperSlide>
        ))
      ) : (
        <>
          <SwiperSlide className="h-full md:min-h-[400] min-h-[300px]">
            <Image src="/images/Home/ads.webp" fill className="object-contain rounded-2xl" alt="" />
          </SwiperSlide>
          <SwiperSlide className="h-full min-h-[400]">
            <Image src="/images/Home/ads2.webp" fill className="object-contain rounded-2xl" alt="" />
          </SwiperSlide>
          <SwiperSlide className="h-full min-h-[400]">
            <Image src="/images/Home/ads.webp" fill className="object-contain rounded-2xl" alt="" />
          </SwiperSlide>
        </>
      )}
    </Swiper>
  );
}
