"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export const Hero = () => {
  const { t } = useLanguage();

  const slides = [
    {
      id: 1,
      image: "/images/Home/slide1.png",
      titleKey: "hero.slide1.title",
      buttonKey: "hero.slide1.button",
      link: "/news",
    },
    {
      id: 2,
      image: "/images/Home/slide2.png",
      titleKey: "hero.slide2.title",
      buttonKey: "hero.slide2.button",
      link: "/prices",
    },
    {
      id: 3,
      image: "/images/Home/slide3.png",
      titleKey: "hero.slide3.title",
      buttonKey: "hero.slide3.button",
      link: "/store",
    },
    {
      id: 4,
      image: "/images/Home/slide4.png",
      titleKey: "hero.slide4.title",
      buttonKey: "hero.slide4.button",
      link: "/partener",
    },
    {
      id: 5,
      image: "/images/Home/slide5.png",
      titleKey: "hero.slide5.title",
      buttonKey: "hero.slide5.button",
      link: "/producers",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section dir="rtl" className="bg-white relative">
      <div className="min-h-screen relative">
        <div className="w-full h-screen relative">
          <div className="absolute inset-0">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={slide.image}
                  className="w-full h-full object-cover"
                  alt={`Slide ${slide.id}`}
                  fill
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-10"></div>

          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center containerr px-6">
            <div className="max-w-4xl w-full text-center space-y-6">
              <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold leading-relaxed">
                {t(slides[currentSlide].titleKey)}
              </h2>
              <Link href={slides[currentSlide].link}>
                <button className="bg-[#51E482] text-black px-8 md:px-12 py-3 md:py-4 flex gap-3 rounded-xl text-lg md:text-xl hover:bg-[#4a7a9a] transition-colors mx-auto items-center">
                  {t(slides[currentSlide].buttonKey)} <ArrowLeft />
                </button>
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 right-6 md:right-12 flex items-center gap-4 z-30">
            <button
              onClick={prevSlide}
              className="bg-white/20 hover:bg-white/40 p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110 backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>

            <div className="flex gap-2 items-center">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 transition-all duration-300 rounded-full ${
                    index === currentSlide ? "h-12 bg-[#618FB5] w-2" : "h-8 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-white/20 hover:bg-white/40 p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110 backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
