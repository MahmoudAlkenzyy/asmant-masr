"use client";
import React from "react";
import { NewsCard } from "../Home/NewsCard";

export const Content = () => {
  const items = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    label: `${i + 1}`,
  }));

  return (
    <>
      <h2 className="text-4xl font-bold mb-8 text-center pt-14">منتدى اسمنت مصر</h2>

      <div className="flex flex-col gap-10 mt-10 pt-10 containerr">
        {/* 🟩 الصف الأول */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.slice(0, 4).map((item) => (
            <NewsCard key={item.id} ispodcast={true} />
          ))}
        </div>

        {/* 🟦 الصف الثاني — يحتوي كارت كبير + باقي الكروت */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* الكارت الكبير */}
          <NewsCard key={items[4].id} className="lg:col-span-2 lg:row-span-2 sm:col-span-2" ispodcast={true} />
          {/* باقي الكروت */}
          {items.slice(5, 8).map((item) => (
            <NewsCard key={item.id} ispodcast={true} />
          ))}
        </div>

        {/* 🟧 الصف الثالث */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.slice(8, 12).map((item) => (
            <NewsCard key={item.id} ispodcast={true} />
          ))}
        </div>

        {/* 🟥 الصف الرابع */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.slice(12, 16).map((item) => (
            <NewsCard key={item.id} ispodcast={true} />
          ))}
        </div>

        {/* 🟪 الصف الخامس */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.slice(16, 20).map((item) => (
            <NewsCard key={item.id} ispodcast={true} />
          ))}
        </div>

        {/* 🟨 الصف السادس */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.slice(20, 24).map((item) => (
            <NewsCard key={item.id} ispodcast={true} />
          ))}
        </div>
      </div>
    </>
  );
};
