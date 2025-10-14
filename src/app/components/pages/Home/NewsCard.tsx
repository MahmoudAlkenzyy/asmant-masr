import { ArrowLeft, Play } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export const NewsCard = ({ ispodcast = false }) => {
  return (
    <Link href={"/new"}>
      <div dir="rtl" className="flex flex-col min-h-[400px] w-full text-start">
        <Image
          className="rounded-xl !w-full"
          src={"/images/Home/ads2.webp"}
          alt=""
          width={500}
          height={500}
          objectFit=""
        />
        <h3 className="text-xl font-medium my-4">عضو بغرفة الأخشاب والأثاث</h3>
        <div className="flex flex-col justify-between">
          <p className="text-[#292E2B] opacity-50 ps-10">الصناع يواجهون نقص الأيدي العاملة الماهرة بسبب الهجرة</p>
          {!ispodcast && (
            <div className="bg-[#A6C7E0] rounded-full  flex items-center justify-center w-10 h-10 me-auto font-thin mt-auto">
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
