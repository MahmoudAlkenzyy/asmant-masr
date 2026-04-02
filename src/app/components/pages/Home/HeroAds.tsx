import React from "react";
import ImgSlider from "./ImgSlider";
import { advertisementItem } from "../../../page";

export const HeroAds = ({
  bg = "secoundry",
  rightAds,
  leftAds,
}: {
  bg?: string;
  rightAds: advertisementItem[];
  leftAds: advertisementItem[];
}) => {
  return (
    <section className={`bg-${bg}`}>
      <div className="containerr flex flex-col md:flex-row  min-h-[350px] py-5 gap-14">
        <ImgSlider ads={rightAds} />
        <ImgSlider ads={leftAds} />
      </div>
    </section>
  );
};
