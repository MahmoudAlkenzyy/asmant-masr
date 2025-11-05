"use client";
import React, { useEffect, useState } from "react";
import { NewsCard } from "../Home/NewsCard";
import { Item } from "../../../components/pages/News/NewsTab";

export const RelatedNews = () => {
  const [news, setNews] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://back.talkstent.com/api/News/GetAllNewsOffset", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data = await res.json();
        setNews(data?.items?.slice(0, 5) || []);
      } catch (error) {
        console.error("❌ Fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="col-span-1 grid grid-cols-1 px-6 text-center py-6 text-gray-500">جارٍ تحميل الأخبار...</div>;
  }

  return (
    <div className="col-span-1 grid grid-cols-1 px-6">
      {news.length > 0 ? (
        news.map((item) => <NewsCard key={item.id} news={item} />)
      ) : (
        <p className="text-center text-gray-500 py-6">لا توجد أخبار متاحة</p>
      )}
    </div>
  );
};
