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
      className={`${className ?? ""} mySwiper w-full`}
      style={{ height: "100%" }}
    >
      {ads ? (
        ads.map((ad, idx) => (
          <SwiperSlide key={idx} style={{ height: "100%" }}>
            {/* relative + w-full + h-full gives next/image fill a real sized box */}
            <div className="relative w-full min-h-[300px] md:min-h-[400px] h-full">
              <Image
                src={ad.imagePath}
                fill
                className="object-cover rounded-2xl"
                alt=""
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </SwiperSlide>
        ))
      ) : (
        <>
          {["/images/Home/ads.webp", "/images/Home/ads2.webp", "/images/Home/ads.webp"].map((src, idx) => (
            <SwiperSlide key={idx} style={{ height: "100%" }}>
              <div className="relative w-full min-h-[300px] md:min-h-[400px] h-full">
                <Image src={src} fill className="object-cover rounded-2xl" alt="" sizes="100vw" />
              </div>
            </SwiperSlide>
          ))}
        </>
      )}
    </Swiper>
  );
}
