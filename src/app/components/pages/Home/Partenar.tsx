import React from "react";
import Image from "next/image";

export const Partenar = () => {
  return (
    <section className="bg-primary pb-10 pt-46 ">
      <div className=" flex justify-between items-center containerr  md:flex-row flex-col flex-wrap">
        <Image src={"/images/Home/Mondi.webp"} alt="" height={300} width={300} />
        <Image src={"/images/Home/MisrCement.webp"} alt="" height={300} width={300} />
        <Image src={"/images/Home/Bmic.webp"} alt="" height={300} width={300} />
        <Image src={"/images/Home/AC.webp"} alt="" height={300} width={300} />
      </div>
    </section>
  );
};
