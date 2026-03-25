"use client";

import { ArrowLeft, Play } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Item } from "../News/NewsTab";
import { useLanguage } from "@/contexts/LanguageContext";

export interface NewCardProps {
  ispodcast?: boolean;
  className?: string;
  news?: Item;
  idx?: number;
}

export const NewsCard: React.FC<NewCardProps> = ({ ispodcast = false, className = "", news, idx = 0 }) => {
  const { t } = useLanguage();
  const images = [
    "/images/Home/news1.png",
    "/images/Home/news2.png",
    "/images/Home/news4.png",
    "/images/Home/news1.png",
  ];

  return (
    <Link href={`/new/${news?.id}`} className={`${className} block h-full`}>
      {/* Card — flex column so it fills the slide height */}
      <div
        dir="rtl"
        className="flex flex-col h-full w-full text-start bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        {/* ── Fixed-height image area ── */}
        <div className="relative w-full shrink-0" style={{ height: "350px" }}>
          <Image
            className="object-cover rounded-t-xl"
            src={news?.images?.[0]?.filePath || images[idx % images.length] || "/images/Home/ads2.webp"}
            alt={news?.title || ""}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* ── Text content — grows to fill remaining space ── */}
        <div className="flex flex-col flex-1 p-3 gap-2">
          {/* Title — clamped to 2 lines so all cards stay aligned */}
          <h3
            className="text-base font-semibold leading-snug"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.8rem" /* reserves 2-line height even for short titles */,
            }}
          >
            {news?.title}
          </h3>

          {/* Description — clamped to 2 lines */}
          <p
            className="text-sm text-[#292E2B] opacity-50"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.4rem",
            }}
          >
            {news?.description}
          </p>

          {/* ── Footer — pushed to bottom by flex-1 spacer ── */}
          <div className="mt-auto">
            {!ispodcast && (
              <div className="flex items-center justify-between w-full pt-2">
                <p className="text-sm text-[#292E2B] opacity-50">{news?.publishAt?.split("T")[0]}</p>
                <div className="bg-[#51E482] rounded-full flex items-center justify-center w-9 h-9 shrink-0">
                  <ArrowLeft size={16} className="cursor-pointer" />
                </div>
              </div>
            )}

            {ispodcast && (
              <button className="flex items-center gap-3 bg-[#A6C7E0] px-4 py-3 w-fit mt-2 rounded-xl text-sm">
                {t("newscard.listen_podcast")}
                <Play fill="#000" size={14} className="rotate-y-180 relative" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
