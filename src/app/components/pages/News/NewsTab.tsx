"use client";
import React, { useEffect, useState } from "react";
import { NewsCard } from "../Home/NewsCard";

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
  categoryName: string;
  publishAt: Date;
  images: any[];
  videos: any[];
}

export const NewsTab: React.FC<NewsTabProps> = ({ id }) => {
  const [news, setNews] = useState<News>();
  const getNew = async () => {
    const res = await fetch(`https://back.talkstent.com/api/News/GetAllNewsOffset?CategoryId=${id}`);
    const data = await res.json();
    setNews(data);
  };
  useEffect(() => {
    getNew();
  }, []);

  return (
    <div className="grid md:grid-cols-4  items-center gap-6 ">
      {news?.items?.map((items) => (
        <NewsCard news={items} />
      ))}
    </div>
  );
};
