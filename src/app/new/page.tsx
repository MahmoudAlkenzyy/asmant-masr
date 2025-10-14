import React from "react";
import { Hero } from "../components/pages/News/Hero";
import { NewsCard } from "../components/pages/Home/NewsCard";
import Image from "next/image";

export default function Page() {
  return (
    <div className=" bg-secoundry">
      <Hero />
      <div className="containerr">
        <div className="grid grid-cols-4  items-center gap-6 ">
          <div className="col-span-1 gird grid-cols-1 mt-5 px-6 ">
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
          </div>
          <div className="col-span-3 h-full flex flex-col justify-start items-center mt-5 gap-6">
            <Image src={"/images/Home/ads.webp"} className="rounded-xl !w-full " alt="" height={200} width={1000} />
            <p className="text-2xl font-semibold">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, ad nam aliquam blanditiis facilis commodi
              et necessitatibus, similique ducimus facere molestias. Fuga aperiam ducimus voluptate assumenda
              dignissimos pariatur voluptatum reprehenderit quo distinctio, soluta, nobis, ut asperiores ipsum. Labore
              voluptate, corporis saepe nulla animi debitis eveniet quae tempora quo quod iure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
