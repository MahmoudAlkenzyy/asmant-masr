import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const Hero = () => {
  return (
    <section dir="rtl" className="bg-secoundry">
      <div className="min-h-screen relative flex flex-col md:flex-row containerr">
        {/* Background Line */}
        <div className="w-[90%] mx-auto absolute overflow-hidden inset-0">
          <svg
            className="w-full"
            width="1419"
            height="953"
            viewBox="0 0 1419 953"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1385 949C1446.5 666.5 1455 83.3 997 10.5C424.5 -80.5 306.5 853 3.5 467.5"
              stroke="#A6C7E0"
              strokeOpacity="0.2"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-14 px-6 md:px-0 mt-20 md:mt-0">
          <h2 className="text-4xl md:text-7xl font-bold">أسمنت مصر</h2>
          <p className="text-[#292E2B] opacity-50 text-xl md:text-3xl font-bold leading-relaxed">
            هو الموقع الأول المتخصص في صناعة الأسمنت والصناعات الاقتصادية المختلفة المرتبطة بها وتسعى لدعم هذه الصناعة
            وجميع الأطراف التي تتعامل معها
          </p>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-9">
            <div>
              <p className="font-bold text-2xl md:text-3xl">
                <span className="text-[#618FB5]">+</span>
                15الف
              </p>
              <p className="text-[#292E2B] opacity-50 text-lg md:text-2xl">شريك نجاح</p>
            </div>
            <div>
              <p className="font-bold text-2xl md:text-3xl">
                <span className="text-[#618FB5]">+</span>
                15الف
              </p>
              <p className="text-[#292E2B] opacity-50 text-lg md:text-2xl">شريك نجاح</p>
            </div>
            <div>
              <p className="font-bold text-2xl md:text-3xl">
                <span className="text-[#618FB5]">+</span>
                15الف
              </p>
              <p className="text-[#292E2B] opacity-50 text-lg md:text-2xl">شريك نجاح</p>
            </div>
          </div>

          <button className="bg-[#A6C7E0] self-start px-10 md:px-14 ps-8 py-4 flex gap-4 rounded-xl text-lg md:text-xl">
            تصفح منتجاتنا <ArrowLeft />
          </button>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center items-end mt-10 md:mt-0">
          <Image
            src={"/images/Home/HeroImage.webp"}
            className="w-[80%] md:w-full relative z-10 translate-y-[10%] md:translate-y-[20%]"
            alt=""
            height={900}
            width={450}
          />
        </div>
      </div>
    </section>
  );
};
