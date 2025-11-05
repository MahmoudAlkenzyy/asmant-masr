import React from "react";
import ImgSlider from "./ImgSlider";

export const HeroAds = ({ bg = "secoundry" }) => {
  return (
    <section className={`bg-${bg}`}>
      <div className="containerr flex flex-col md:flex-row  min-h-[350px] py-5 gap-14">
        <ImgSlider />
        <ImgSlider />
      </div>
    </section>
  );
};
