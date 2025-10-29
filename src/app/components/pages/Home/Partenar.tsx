import React from "react";
import Image from "next/image";
import { Partner } from "../../../page";

export const Partenar = ({ partenar }: { partenar: Partner[] }) => {
  return (
    <section className="bg-primary pb-10 pt-46 ">
      <div className=" flex justify-between items-center containerr  md:flex-row flex-col flex-wrap">
        {[
          "/images/Home/Lafarge.webp",
          "/images/Home/cemex.webp",
          //   "/images/Home/MisrCement2.webp",
          //   "/images/Home/cemex.webp",
          "/images/Home/MisrCement2.webp",
          "/images/Home/cemex.webp",
        ].map((imagePath) => {
          return <Image className="bg-white" src={imagePath} alt="" height={300} width={300} />;
        })}
      </div>
    </section>
  );
};
