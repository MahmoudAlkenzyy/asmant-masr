import React from "react";
import ImgSlider from "../Home/ImgSlider";

export const Ads = () => {
  return (
    <div className="flex flex-col md:flex-row containerr gap-10 pb-7">
      <ImgSlider />
      <ImgSlider />
    </div>
  );
};
