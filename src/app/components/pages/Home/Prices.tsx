import React from "react";
import { PricesTable, pricesType } from "./PricesTable";
import Image from "next/image";

export const Prices = ({ prices }: { prices: pricesType[] }) => {
  return (
    <section dir="rtl" className="bg-primary">
      <div className="containerr gap-4 flex flex-wrap md:flex-nowrap md:px-10 ">
        <div className="md:w-2/3 mb-4 w-full">
          <PricesTable prices={prices} />
        </div>
        <div className="md:w-1/3 w-full flex items-center  mb-4 ">
          <Image src="/images/Home/ResorcesImg.webp" alt="" width={500} height={500} className="rounded-2xl" />
        </div>
      </div>
    </section>
  );
};
