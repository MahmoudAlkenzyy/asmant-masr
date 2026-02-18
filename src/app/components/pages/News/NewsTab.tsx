"use client";
import React, { useEffect, useState } from "react";
import { NewsCard } from "../Home/NewsCard";
import { fetchWithLanguage } from "@/lib/fetchWithLanguage";

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
  videos?: any[];
}

export const NewsTab: React.FC<NewsTabProps> = ({ id }) => {
  const [news, setNews] = useState<News>();
  const getNew = async () => {
    const res = await fetchWithLanguage(
      `https://cement.northeurope.cloudapp.azure.com:5000/api/News/GetAllNewsOffset?CategoryId=${id}`,
    );
    const data = await res.json();
    setNews(data);
  };
  useEffect(() => {
    getNew();
  }, [id]);

  return (
    <div className="grid md:grid-cols-4  items-center gap-6 ">
      {news?.items?.map((items) => (
        <NewsCard key={items.id} news={items} />
      ))}
    </div>
  );
};
