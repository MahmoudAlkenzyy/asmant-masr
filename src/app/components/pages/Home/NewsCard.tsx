import { ArrowLeft, Play } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Item } from "../News/NewsTab";

export interface NewCardProps {
  ispodcast?: boolean;
  className?: string;
  news?: Item;
  idx?: number;
}
export const NewsCard: React.FC<NewCardProps> = ({ ispodcast = false, className = "", news, idx = 0 }) => {
  const images = [
    "/images/Home/news1.png",
    "/images/Home/news2.png",
    "/images/Home/news4.png",
    "/images/Home/news1.png",
  ];

  return (
    <Link href={`/new/${news?.id}`} className={`${className} my-2`}>
      <div dir="rtl" className="flex flex-col min-h-[400px] h-full w-full text-start">
        <Image
          className="rounded-xl !w-full h-full grow"
          src={images[idx] || "/images/Home/ads2.webp"}
          alt=""
          width={500}
          height={500}
        />
        <h3 className="text-xl font-medium my-4">{news?.title}</h3>
        <div className="flex flex-col justify-between">
          <p className="text-[#292E2B] opacity-50 ps-10">الصناع يواجهون نقص الأيدي العاملة الماهرة بسبب الهجرة</p>
          {!ispodcast && (
            <div className="bg-[#51E482] rounded-full  flex items-center justify-center w-10 h-10 me-auto font-thin mt-auto">
              <ArrowLeft className="cursor-pointer" />
            </div>
          )}
        </div>

        {ispodcast && (
          <button className="flex items-center gap-3 bg-[#A6C7E0] px-4 py-4 w-fit mt-4 rounded-xl">
            الإستماع الي البودكاست
            <Play fill="#000" className="rotate-y-180 relative" />
          </button>
        )}
      </div>
    </Link>
  );
};
