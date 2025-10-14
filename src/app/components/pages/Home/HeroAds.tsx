import React from "react";
import ImgSlider from "./ImgSlider";

export const HeroAds = () => {
  return (
    <section className=" bg-secoundry">
      <div className="containerr flex   min-h-[250px]">
        <ImgSlider />
        <ImgSlider />
      </div>
    </section>
  );
};
