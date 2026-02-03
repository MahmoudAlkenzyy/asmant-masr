import React from "react";
import { PricesTable, pricesType } from "./PricesTable";
import Image from "next/image";

export const Prices = ({ prices }: { prices: pricesType[] }) => {
  console.log({ prices });

  return (
    <section dir="rtl" className="">
      <div className="containerr gap-4 md:px-10 ">
        <div className=" mb-4 w-full">{prices.length > 0 && <PricesTable prices={prices} />}</div>
        {/* <div className="md:w-1/3 w-full flex items-center  mb-4 ">
          <Image src="/images/Home/ResorcesImg.webp" alt="" width={500} height={500} className="rounded-2xl" />
        </div> */}
      </div>
    </section>
  );
};
