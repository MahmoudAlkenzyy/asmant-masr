"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

export default function ImgSlider() {
  return (
    <Swiper pagination={true} modules={[Pagination, Navigation]} loop={true} className="mySwiper min-h-[300px]">
      <SwiperSlide className="h-full min-h-[300]">Slide 1</SwiperSlide>
      <SwiperSlide className="h-full min-h-[300]">Slide 2</SwiperSlide>
      <SwiperSlide className="h-full min-h-[300]">Slide 3</SwiperSlide>
    </Swiper>
  );
}
