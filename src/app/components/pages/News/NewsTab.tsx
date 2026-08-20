"use client";
import React, { useEffect, useState } from "react";
import { NewsCard } from "../Home/NewsCard";
import { fetchWithLanguage } from "@/lib/fetchWithLanguage";

import ImgSlider from "../Home/ImgSlider";
import { AdvertisementGroup, fetchAds } from "../../../../lib/api/Ads";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NewsTabProps {
  id: string;
}
export interface News {
  items: Item[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  content: string;
  categoryId?: string;
  category?: {
    id: string;
    name: string;
  };
  categoryName?: string;
  publishAt: string;
  images?: { filePath: string }[];
  videos?: unknown[];
}

export const NewsTab: React.FC<NewsTabProps> = ({ id }) => {
  const [news, setNews] = useState<News>();
  const [ads, setAds] = useState<AdvertisementGroup[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    const getNews = async () => {
      const res = await fetchWithLanguage(
        `https://cement.northeurope.cloudapp.azure.com:5000/api/News/GetAllNewsOffset?CategoryId=${id}&pageSize=12&pageNumber=${pageNumber}`,
      );
      const data = await res.json();
      setNews(data);
    };

    getNews();
  }, [id, pageNumber]);

  useEffect(() => {
    fetchAds({ pageName: "NewsPage" }).then((ads) => {
      setAds(ads);
    });
  }, []);

  useEffect(() => {
    setPageNumber(1);
  }, [id]);

  return (
    <div>
      <div className="grid md:grid-cols-4 items-center gap-6">
        {news?.items?.slice(0, 4).map((items) => (
          <NewsCard key={items.id} news={items} />
        ))}
        <ImgSlider ads={ads.find((ad) => ad.section === "SecondSectionLeft")?.items} className="col-span-2" />
        <ImgSlider ads={ads.find((ad) => ad.section === "SecondSectionRight")?.items} className="col-span-2" />
        {news?.items?.slice(4).map((items) => (
          <NewsCard key={items.id} news={items} />
        ))}
      </div>

      {news && news.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 py-10" dir="ltr">
          <button
            type="button"
            aria-label="Previous page"
            disabled={!news.hasPreviousPage}
            onClick={() => setPageNumber((currentPage) => currentPage - 1)}
            className="rounded-full border border-[#618FB5] p-2 text-[#618FB5] transition hover:bg-[#618FB5] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft size={18} />
          </button>

          {Array.from({ length: news.totalPages }, (_, index) => index + 1).map((page) => (
            <button
              type="button"
              key={page}
              aria-label={`Page ${page}`}
              aria-current={page === pageNumber ? "page" : undefined}
              onClick={() => setPageNumber(page)}
              className={`min-w-9 rounded-full border px-3 py-1 text-sm transition ${
                page === pageNumber
                  ? "border-[#618FB5] bg-[#618FB5] text-white"
                  : "border-gray-300 text-gray-700 hover:border-[#618FB5] hover:text-[#618FB5]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            aria-label="Next page"
            disabled={!news.hasNextPage}
            onClick={() => setPageNumber((currentPage) => currentPage + 1)}
            className="rounded-full border border-[#618FB5] p-2 text-[#618FB5] transition hover:bg-[#618FB5] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
