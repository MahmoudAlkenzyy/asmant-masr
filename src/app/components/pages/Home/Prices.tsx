import React from "react";
import { PricesTable } from "./PricesTable";
import ImgSlider from "./ImgSlider";
import Image from "next/image";

export const Prices = () => {
  return (
    <section dir="rtl" className="bg-primary">
      <div className="containerr gap-4 flex flex-wrap md:flex-nowrap">
        <div className="md:w-2/3">
          <PricesTable />
        </div>
        <div className="md:w-1/3 w-full flex items-center  mb-4 ">
          {/* <ImgSlider /> */}
          <Image src="/images/Home/ResorcesImg.webp" alt="" width={500} height={500} className="rounded-2xl" />
        </div>
      </div>
    </section>
  );
};
