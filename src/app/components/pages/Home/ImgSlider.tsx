"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function ImgSlider() {
  return (
    <Swiper pagination={true} modules={[Pagination, Navigation]} loop={true} className="mySwiper min-h-[300px]">
      <SwiperSlide className="h-full md:min-h-[400] min-h-[300px]">
        <Image src="/images/Home/ads.webp" fill className="object-contain rounded-2xl" alt="" />
      </SwiperSlide>
      <SwiperSlide className="h-full min-h-[400]">
        <Image src="/images/Home/ads2.webp" fill className="object-contain rounded-2xl" alt="" />
      </SwiperSlide>
      <SwiperSlide className="h-full min-h-[400]">
        <Image src="/images/Home/ads.webp" fill className="object-contain rounded-2xl" alt="" />
      </SwiperSlide>
    </Swiper>
  );
}
