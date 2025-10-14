import Image from "next/image";

export const Hero = () => {
  return (
    <div className="relative">
      <Image className="!w-full" src={"/images/News/Hero.webp"} width={1900} height={500} alt="" />
      <Image
        className="absolute  top-1/2 left-1/2 -translate-1/2 z-20"
        src={"/images/News/image.png"}
        width={500}
        height={250}
        alt=""
      />
    </div>
  );
};
