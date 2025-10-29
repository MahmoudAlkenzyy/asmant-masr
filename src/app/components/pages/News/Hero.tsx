import Image from "next/image";

export const Hero = ({ src = "/images/News/Hero.webp" }) => {
  return (
    <div className="relative">
      <img className="!w-full !h-full min-h-[250px] grayscale-25" src={src} alt="" />
      <img className="absolute  top-1/2 left-1/2 -translate-1/2 z-20 " src={"/images/News/image.png"} alt="" />
    </div>
  );
};
